import PropTypes from 'prop-types'

// eslint-disable-next-line import/prefer-default-export
export const getNavigationPropTypes = () => ({
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
})
