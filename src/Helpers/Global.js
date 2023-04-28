// Get array of months
import moment from 'moment';

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

export const userArray = (data) => {
  const list = [];
  data.map(({ employee, email }) => {
    if (employee !== '' && employee !== ' ') {
      list.push({ value: employee, label: employee });
    } else {
      list.push({ value: email, label: email });
    }
  });
  list.push({ value: '', label: 'All' });
  list.sort((a, b) => a.value.localeCompare(b.value));
  const index = list.findIndex((obj) => obj.value === '' && obj.label === 'All');
  if (index !== -1) {
    const obj = list.splice(index, 1)[0];
    list.unshift(obj);
  }
  return list;
};

export const rolesArray = (data, isAll = false) => {
  const list = [];
  data.map(({ name, id }) => {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    list.push({ value: name, label: name, id });
  });
  list.sort((a, b) => a.value.localeCompare(b.value));
  if (isAll) {
    list.push({ value: '', label: 'All' });
    list.sort((a, b) => a.value.localeCompare(b.value));
    const index = list.findIndex((obj) => obj.value === '' && obj.label === 'All');
    if (index !== -1) {
      const obj = list.splice(index, 1)[0];
      list.unshift(obj);
    }
  }
  return list;
};

const permissions = {
  r: { name: 'view', title: 'View', value: 'view' },
  d: { name: 'delete', title: 'Delete', value: 'delete' },
  u: { name: 'edit', title: 'Edit', value: 'edit' }
};

export const userPermission = (data) => {
  const list = [];
  for (const [key, value] of Object.entries(data)) {
    const permission = permissions[key];
    if (permission && value) {
      list.push({ ...permission });
    }
  }
  return list;
};

export const CreateViewData = (data, excludeKey) => {
  const labels = [];
  const values = [];

  const viewData = Object.keys(data)
    .filter((key) => !excludeKey.includes(key))
    .reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

  Object.keys(viewData).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  Object.values(viewData).forEach((el) => {
    values.push(el);
  });

  return { viewData, labels, values };
};

export const dateInputProps = (minLimit = 50, maxLimit = 50) => ({
  min: moment().subtract(minLimit, 'Y').format('YYYY-MM-DD'),
  max: moment().add(maxLimit, 'Y').format('YYYY-MM-DD')
});
