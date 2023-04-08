// Get array of months
export const Months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
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

export const Years = yearsArray.map(setYears).reverse();

export const Roles = [
  { value: '', label: 'All' },
  { value: 'admin', label: 'Admin' },
  { value: 'employee', label: 'Employee' }
];

export const leaveDayType = [
  { value: 'full', label: 'Full Day' },
  { value: 'half', label: 'Half Day' }
];

export const leave = [
  { value: 'sickLeave', label: 'Sick Leave' },
  { value: 'medicalLeave', label: 'Medical Leave' },
  { value: 'hospitalisation', label: 'Hospitalisation' },
  { value: 'maternityLeave', label: 'Maternity Leave' },
  { value: 'casualLeave', label: 'Casual Leave' },
  { value: 'paternityLeave', label: 'Paternity Leave' },
  { value: 'lossOfPayLeave', label: 'Loss Of Pay Leave' },
  { value: 'earnedLeave', label: 'Earned Leave' }
];

export const attendanceStatus = [
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

export const WorkingHours = [];
for (let i = 1; i <= 12; i++) {
  WorkingHours.push({ value: `${i.toString()}`, label: `${i.toString()}:00` });
}

export const Priority = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

export const Department = [
  { value: 'hr', label: 'HR' },
  { value: 'manager', label: 'Manager' },
  { value: 'teamLeader', label: 'Team Leader' }
];

export const EventsType = [
  { value: 'notice', label: 'Notice' },
  { value: 'event', label: 'Event' }
];

export const EmployeeRoleList = [
  'dashboard',
  'profilesetup',
  'profile',
  'privacy',
  'expense',
  'leave',
  'settings',
  'payslip',
  'attendance',
  'profile',
  'supportTicket',
  'holiday',
  'report',
  'allreport',
  'timeactivity',
  'weeklylimit'
];

export const AdminRoleList = [
  'dashboard',
  'profilesetup',
  'employee',
  'profile',
  'privacy',
  'employeeDetails',
  'expense',
  'leave',
  'settings',
  'payslip',
  'attendance',
  'profile',
  'role',
  'supportTicket',
  'report',
  'allreport',
  'timeactivity',
  'weeklylimit',
  'holiday',
  'notice'
];

export const buildFormData = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }
};

export const actionStatus = [
  { value: 'approved', label: 'Approved' },
  { value: 'reject', label: 'Rejected' },
  { value: 'pending', label: 'Pending' }
];

export const badgePriorityColor = {
  medium: 'warning',
  high: 'error',
  low: 'info'
};

export const badgeStatusColor = {
  pending: 'warning',
  declined: 'error',
  approved: 'success',
  reject: 'error'
};

export const validationMessage = 'Required';
export const keyDownValidation = [
  '&',
  '^',
  '-',
  '+',
  '*',
  '(',
  ')',
  '=',
  '[',
  ']',
  '{',
  '}',
  '!',
  '#',
  '$',
  '%',
  '@',
  '/',
  '|',
  '?'
];

export const keyDownTypeNumber = [
  '&',
  '^',
  '-',
  '+',
  '*',
  '(',
  ')',
  '=',
  '[',
  ']',
  '{',
  '}',
  '!',
  '#',
  '$',
  '%',
  '@',
  '/',
  '|',
  '?',
  'e',
  'E'
];
