#!/bin/bash

# Default project name.
# Modify it and commit the file if you don't want to pass the project name as an argument
# each time.
project_name='GeneratedRNTraining'

# Display help.
usage() {
  echo "Usage: $0 <options>"
  echo "Options:"
  echo "    -v <version number> : optional, if not specified version will not be updated."
  echo "    -b <build number> : optional, if not specified build number will not be updated. "
  echo "    -p : optional, if omitted package.json will not be updated. "
  echo "    -n <project name> : optional, ios project name. Required to update Info.plist. If not specified a default value will be used, but it has to be set directly in the script file."
  exit 1;
}

cmd_exists() {
  command -v "$1" >/dev/null
}

is_macos() {
  cmd_exists plutil
}

# Get options.
while getopts ":v:b:n:p" o; do
  case "${o}" in
    v)
      version=${OPTARG}
      ;;
    b)
      build=${OPTARG}
      ;;
    n)
      project_name=${OPTARG}
      ;;
    p)
      update_package_json=true
      ;;
    *)
      usage
      ;;
  esac
done

shift $((OPTIND-1))

project_root=$( cd "$( dirname "${BASH_SOURCE[0]}" )"/.. >/dev/null 2>&1 && pwd )
echo "Project root is ${project_root}"
echo "iOS project name is ${project_name}"

plist_file="${project_root}/ios/${project_name}/Info.plist"
gradle_file="${project_root}/android/app/build.gradle"

if [ -n "${version}" ]; then
  echo "Set app version to: ${version}"

  # Update package.json
  if [ -n "${update_package_json}" ]; then
    sed -ie "s/\(\"version\": \"\)[0-9.]*\(\",\)/\1${version}\2/" "${project_root}/package.json"
    echo "package.json updated"
  fi

  # Update Android code
  sed -ie "s/\(versionName \"\)[0-9.]*\(\"\)/\1${version}\2/" "${gradle_file}"
  echo "app/build.gradle updated"

  # Update ios code
  if is_macos; then
    plutil -replace CFBundleShortVersionString -string "${version}" "${plist_file}"
  else
    # Special case for linux systems.
    key_line=$(grep -n '<key>CFBundleShortVersionString</key>' "${plist_file}" | cut -d: -f 1)
    line_to_replace=$((key_line + 1))
    sed -ie "${line_to_replace}s/\(<string>\)[0-9.]*\(<\/string>\)/\1${version}\2/" "${plist_file}"
  fi
  echo "Info.plist updated"
fi

if [ -n "${build}" ]; then
  echo "Set build number to: ${build}"

  # Update Android code
  sed -ie "s/\(versionCode \)[0-9]*/\1${build}/" "${gradle_file}"
  echo "app/build.gradle updated"

  # Update ios code
  if is_macos; then
    plutil -replace CFBundleVersion -string "${build}" "${plist_file}"
  else
    # Special case for linux systems.
    key_line=$(grep -n '<key>CFBundleVersion</key>' "${plist_file}" | cut -d: -f 1)
    line_to_replace=$((key_line + 1))
    sed -ie "${line_to_replace}s/\(<string>\)[0-9]*\(<\/string>\)/\1${build}\2/" "${plist_file}"
  fi
  echo "Info.plist updated"
fi
