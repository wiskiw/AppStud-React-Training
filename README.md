# Yablonski's Training Project

> react-native project

## Technical stack

- react-native
- react-navigation
- i18n-js
- react-native-localize
- react-native-config
- axios

## Dev environment

### Requirements

- node 10.13.x or latest LTS
- avoid using `npm` – use `yarn`.

### Quick project setup

```bash
# Install dependencies
$ yarn install

# Run manual install steps for react-native-config
# Follow instructions at https://github.com/luggit/react-native-config

# Configure app
$ cp .env.example .env
# Then configure the API_URL and other variables in the .env file

# Serve
$ yarn start --reset-cache

# Run the app
$ react-native run-ios
```

## Available yarn scripts

- **yarn start**: starts the react-native metro server
- **yarn test**: runs the tests
- **yarn eslint**: shows eslint errors for all source files
- **yarn lint-check**: shows output of prettier-eslint for all source files
- **yarn lint**: runs prettier-eslint on all source files and update them
- **yarn version**: runs a script that manage version of the app. See [Versioning](#versioning)

## Available custom components from the starter
### AppImage
Wraps the React Native Image component. Allows to specify the height or width of the image, then
the other dimension will be computed to keep the ratio. This is sometimes easier to use than the stock
component.

### AppText
Wraps the React Native Text component. Because of a [bug](https://github.com/archriss/react-native-render-html/issues/223)
Android fails to display a custom font in italic or bold and reverts to the default one.  
To make italic and bold text works on all devices we created this component. You will have to
edit it and map all your font styles to the right font file variation.

## Code style

This project uses [prettier](https://github.com/prettier/prettier) and [eslint](https://github.com/eslint/eslint) to format the code.
The two linters are linked by [prettier-eslint](https://github.com/prettier/prettier-eslint).

All code pushed to the repository must respect the coding standards enforced by prettier and eslint.

A pre-commit hook will auto-run prettier-eslint at each commit and format the code automatically
then include the resulting code in the commit.
This hook is not magic nor meant to replace good coding practices, so code wisely :)

## Structuring React code

All application code must be located in `./src` folder.
Try to organize components by functionality. Each functionality should be a "module" and should be located
in the modules directory.
Common code should be either in "common" directory (components and assets) or in they own directory
at the root of src/ for important stuff such as api abstraction or navigation.

Basic folder structure to follow:

- **src/**
  - **api/**: Code related to the communication with external services
  - **commons/**: source code and assets used by two or more modules of the app
  - **i18n/**: languages and translation strings available in the app
  - **navigation**/: code related to react-navigation
  - **themes**/: common variables related to graphic elements like colors, rounded corners radiuses, ...
  - **modules**/: modules (functionalities) of the application

A module should have the following structure:

- **/assets** : contains all static assets specific to this module (images, fonts, ...)
- **/components** : contains "dumb" components (presentational components) used in the module
- **/containers** : contains smart components managing complex states and using dumb components
- **/duck** : contains redux state management code, explanation later on
- **/scenes** : contains components (dumb or smart) that match to a page of the app

**_There are README files in the mentioned folders and comments in the template files if you need
more explanation, please read them._**

Use functional components and hooks whenever possible. Do not use the class syntax.

Styles should be in the same file as the component they are related to. Avoid creating separate "styles.js"
files as it adds to the cognitive charge of having several files to be aware of during development
for the same component and several files with the exact same name in the IDE.

For the same reason, always prefer naming your files with the name of the component and avoid naming
everything index.js. Use an index.js file only if you want to hide some implementation or bundle
several files as one logical component (like for ducks).

### Redux

If you use Redux, follow the following "duck" pattern.
Create a "duck" folder in your module like the provided example.
This pattern is inspired from [this article](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be).

### i18n

We use [react-native-localize](https://github.com/react-native-community/react-native-localize) for i18n.
As we are working in a multi-language environment, every project should have strings in English version,
_even if the end product will only be in French_. This ensure people from everywhere can work on the
project.

### Forms

For forms management use Formik instead of Redux-Forms, which is almost always overkill.

## Versioning

We have a small utility to bump the version and the build number without manually editing all
the required files.  
To update the values run `yarn versioning -v[new semver version] -b[build number] -p` and commit the 
files.

## Testing

We use `jest` and `react-native-testing-library` for unit testing.

You can run `yarn test` to launch the tests.
To see code coverage run `yarn test --coverage`.

**WARNING**
If the tests fails make sure you have the same major / minor versions for `react` and `react-test-renderer`.
For example if your version of react is 16.8.2 and your version of react-test-renderer is 16.9.0
all the tests will fail miserably.

### Code coverage

The percentage of code coverage must be discussed at the beginning of a project, but 70% is
a good goal.

### Mocks

Always on mocks should be written in the `__mocks__` folder. If a module provides its own jest
config, add it in `jest,config.js`.
One-time mocks should be located directly in the test files.

There are some test utilities in `__tests__/testutils/`, and tests for the components provided by
the starter are also present, have a look.
(Note that these tests may have to be modified when you modify the default components.)

## Troubleshooting

This section should cover every cryptic error and weird behaviour of the app that one can encounter
during development, so that the next person don't waste half a day like you just did :)

##### \<Cryptic error message when doing action x\>

> \<Explanation on how to fix the error\>

##### \<Weird stuff happening when using component y\>

> <Explanation on why it's doing that because the mock api or whatever>
