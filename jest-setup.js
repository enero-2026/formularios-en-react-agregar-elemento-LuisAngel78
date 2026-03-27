import '@testing-library/jest-native/extend-expect';

// Simple mocks for expo vector icons to keep tests fast and avoid native module issues.
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('@expo/vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
