// Get array of months
import { getLoginPattern } from '../Routes/routeConfig';

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

export const Years = yearsArray.map(setYears).reverse();

export const Roles = [
  { value: 'all', label: 'All' },
  { value: 'admin', label: 'Admin' },
  { value: 'employee', label: 'Employee' }
];

export const leaveTypes = [
  { value: 'fullDay', label: 'Full Day' },
  { value: 'halfDay', label: 'Half Day' }
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

export const WorkingHours = [
  { value: '07:00', label: '07:00' },
  { value: '07:30', label: '07:30' },
  { value: '08:00', label: '08:00' },
  { value: '08:30', label: '08:30' },
  { value: '09:00', label: '09:00' },
  { value: '09:30', label: '09:30' },
  { value: '10:00', label: '10:00' },
  { value: '10:30', label: '10:30' },
  { value: '11:00', label: '11:00' },
  { value: '11:30', label: '11:30' },
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

export const convertFormData = async (data) => {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};

// CONVERT OBJECT TO QUERY STRING
export const queryString = (obj) => {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  return str.join('&');
};

export const SupportTicketStatus = [
  { value: 'approved', label: 'Approved' },
  { value: 'declined', label: 'Declined' },
  { value: 'pending', label: 'Pending' }
];

export const isTokenExpire = async (response) => {
  console.log('response', response);
  let apiResponse = null;
  if (response.statusText === 'OK') {
    try {
      apiResponse = await response.data;
    } catch (e) {
      apiResponse = null;
    }
  } else if (response.status === 401) {
    getLoginPattern();
  } else {
    apiResponse = await response.data;
  }
  return apiResponse;
};

export const handleNetworkError = async (responseError) => {
  if (responseError.name !== 'AbortError') {
    console.log('Network request error. Please try again.');
  }
};

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
