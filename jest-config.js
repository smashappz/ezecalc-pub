module.exports = {
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: 'react-native',
  setupFilesAfterEnv: [
    'jest-extended',
    '@testing-library/jest-native/extend-expect',
    './src/setupTests.ts',
  ],
  testPathIgnorePatterns: ['e2e', 'node_modules'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-iphone-x-helper|react-native-responsive-screen|react-native-vector-icons/Ionicons|react-native-vector-icons/MaterialCommunityIcons|react-native-modal)/)',
  ],
};
