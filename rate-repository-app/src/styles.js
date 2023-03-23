import { Platform } from 'react-native';

const selectFontFamily = () => {
  switch (Platform.OS) {
    case 'android':
      return 'Roboto';
    case 'ios':
      return 'Arial';
    default:
      return 'System';
  }
};

const styles = {
  colors: {
    appBarBackground: '#24292e',
    primary: '#0366d6',
    danger: '#d73a4a'
  },
  fonts: {
    main: selectFontFamily(),
  },
};

export default styles;