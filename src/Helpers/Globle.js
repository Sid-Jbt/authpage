// Get array of months
export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// Get array of years
const rangeOfYears = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((year, index) => year + index);

export const Years = rangeOfYears(new Date('Jan 1 2020').getFullYear(), new Date().getFullYear());
