import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    appBarText: '#ffffff',
    appBackground: '#e1e4e8',
    repositoryItemBackground: '#ffffff',
    repositoryLanguageText: '#ffffff',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    appBarText: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
