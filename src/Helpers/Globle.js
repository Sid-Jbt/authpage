// Get array of months
export const Months = [
  { value: 'january', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' }
];

// Get array of years
const rangeOfYears = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((year, index) => year + index);

export const Years = rangeOfYears(new Date('Jan 1 2020').getFullYear(), new Date().getFullYear());

export const Roles = [
  { value: 'all', label: 'All' },
  { value: 'superAdmin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'developer', label: 'Developer' },
  { value: 'tester', label: 'Tester' },
  { value: 'hr', label: 'HR' },
  { value: 'qa', label: 'QA' }
];
