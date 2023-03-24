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
  { value: 'fullDay', label: 'Full Day' },
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

export const WorkingHours = [
  { value: '01:00', label: '01:00' },
  { value: '02:00', label: '02:00' },
  { value: '03:00', label: '03:00' },
  { value: '04:00', label: '04:00' },
  { value: '05:00', label: '05:00' },
  { value: '06:00', label: '06:00' },
  { value: '07:00', label: '07:00' },
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' }
];

export const Priority = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

export const Department = [
  { value: 'HR', label: 'HR' },
  { value: 'manager', label: 'Manager' },
  { value: 'team leader', label: 'Team Leader' }
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

export const SupportTicketStatus = [
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
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
  rejected: 'error'
};

export const validationMessage = 'Required';
export const orgNameKeyPress = [
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
