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

const yearsArray = rangeOfYears(new Date('Jan 1 2020').getFullYear(), new Date().getFullYear());
const setYears = (item) => {
  const year = { value: item, label: item };
  return year;
};
export const Years = yearsArray.map(setYears);

export const Roles = [
  { value: 'all', label: 'All' },
  { value: 'superAdmin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'developer', label: 'Developer' },
  { value: 'tester', label: 'Tester' },
  { value: 'hr', label: 'HR' },
  { value: 'qa', label: 'QA' }
];

export const leaveTypes = [
  { value: 'sickLeave', label: 'Sick Leave' },
  { value: 'medicalLeave', label: 'Medical Leave' },
  { value: 'hospitalisation', label: 'Hospitalisation' },
  { value: 'maternityLeave', label: 'Maternity Leave' },
  { value: 'casualLeave', label: 'Casual Leave' },
  { value: 'paternityLeave', label: 'Paternity Leave' },
  { value: 'lossOfPayLeave', label: 'Loss Of Pay Leave' },
  { value: 'earnedLeave', label: 'Earned Leave' }
];

export const Status = [
  { value: 'all', label: 'All' },
  { value: 'present', label: 'Present' },
  { value: 'absent', label: 'Absent' },
  { value: 'late', label: 'Late' },
  { value: 'overtime', label: 'Overtime' }
];

export const Gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

export const Days = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
  { value: 13, label: 13 },
  { value: 14, label: 14 },
  { value: 15, label: 15 },
  { value: 16, label: 16 },
  { value: 17, label: 17 },
  { value: 18, label: 18 },
  { value: 19, label: 19 },
  { value: 20, label: 20 },
  { value: 21, label: 21 },
  { value: 22, label: 22 },
  { value: 23, label: 23 },
  { value: 24, label: 24 },
  { value: 25, label: 25 },
  { value: 26, label: 26 },
  { value: 27, label: 27 },
  { value: 28, label: 28 },
  { value: 29, label: 29 },
  { value: 30, label: 30 },
  { value: 31, label: 31 }
];