import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import i18n from '../../../i18n/i18n'
import DefaultTheme from '../../../themes/default'

/**
 * Component for displaying infinity progress.
 */
const ProgressPanel = () => (
  <View style={styles.container}>
    <Text style={styles.progressText}>
      {i18n.t('components.progressPanel.progressLoading')}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    backgroundColor: DefaultTheme.color.background,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
  },
  progressText: {
    fontSize: DefaultTheme.text.size.large,
    color: DefaultTheme.text.color.primary,
    padding: DefaultTheme.padding.normal,
  },
})

export default ProgressPanel
