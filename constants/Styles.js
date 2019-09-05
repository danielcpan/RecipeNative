import { createShorthand } from '../utils/style.utils';

export default {
  primaryColor: '#b4a584',
  secondaryColor: '#858585',
  primaryBackgroundColor: '#d7d2b5',
  secondaryBackgroundColor: '#f1f0f6',
  fontSizeXs: 12,
  fontSizeSm: 18,
  fontSizeMd: 24,
  fontSizeLg: 32,
  fontSizeXl: 40,
  fontWeightLight: '200',
  fontWeightMedium: '500',
  fontWeightHeavy: '700',
  spacingXs: 2,
  spacingSm: 5,
  spacingMd: 10,
  spacingLg: 15,
  spacingXl: 20,
  padding: (...values) => createShorthand('padding', ...values),
  margin: (...values) => createShorthand('margin', ...values)
};
