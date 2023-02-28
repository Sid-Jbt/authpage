import * as yup from 'yup';

const passwordRegx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const numberRegx = /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
const holderNameRegx = /^[a-zA-Z0-9\s]*$/g;
const accNumberRegx = /^\d{9,18}$/;
const ifscCodeRegx = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

export const leaveFormSchema = yup.object().shape({
  fromDate: yup.string().required('From date is required'),
  toDate: yup.string().required('To date is required'),
  noOfDays: yup.string().required('No of days is required')
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required')
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  resetPassword: yup
    .string()
    .when('password', {
      is: (val) => !!(val && val.length > 0),
      then: yup
        .string()
        .matches(
          passwordRegx,
          'One special characters, One upper character, Min 8 characters, One number'
        )
        .min(8, 'Password should be of minimum 8 characters length')
        .oneOf([yup.ref('password')], 'New password and Confirmed password should be the same')
    })
    .required('Confirm Password is required')
});

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  department: yup
    .string()
    .required('Department is required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid department name'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
  fatherName: yup
    .string()
    .required('Father name is required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid father name'),
  designation: yup
    .string()
    .required('Designation is required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid designation'),
  phoneNumber: yup
    .string()
    .matches(numberRegx, 'Phone number is not valid')
    .required('Phone number is required'),
  alternatePhone: yup
    .string()
    .matches(numberRegx, 'Alternative number is not valid')
    .required('Alternative number is required'),
  permanentAddress: yup.string().required('Permanent Address is required'),
  presentAddress: yup.string().required('Present Address is required')
});

export const bankAccountSchema = yup.object().shape({
  bankName: yup.string().required('Bank name is required'),
  branchName: yup.string().required('Branch name is required'),
  accountName: yup.string().matches(holderNameRegx, '').required('Account name is required'),
  accountNumber: yup.string().matches(accNumberRegx, '').required('Account number is required'),
  ifscCode: yup.string().matches(ifscCodeRegx, '').required('IFSC code is required'),
  panNumber: yup.string().required('PAN number required')
});

export const BasicInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
  email: yup.string().email('Must be a valid email address').required('Email is required'),
  confirmationEmail: yup
    .string()
    .oneOf([yup.ref('email'), null], 'Email and Confirmation Email should be the same')
    .required('Confirmation Email is required'),
  phoneNumber: yup
    .string()
    .matches(numberRegx, 'Phone number is not valid')
    .required('Phone number is required'),
  pAdd: yup.string().required('Permanent Address is required')
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  newPassword: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmNewPassword: yup
    .string()
    .when('newPassword', {
      is: (val) => !!(val && val.length > 0),
      then: yup
        .string()
        .matches(
          passwordRegx,
          'One special characters, One upper character, Min 8 characters, One number'
        )
        .min(8, 'Password should be of minimum 8 characters length')
        .oneOf([yup.ref('newPassword')], 'New password and Confirmed password should be the same')
    })
    .required('Confirm Password is required')
});

export const holidayFormSchema = yup.object().shape({
  title: yup.string().required('Holiday name is required'),
  holidayDate: yup.string().required('Holiday date is required')
});

export const expenseFormSchema = yup.object().shape({
  itemName: yup
    .string()
    .required('Item name is required')
    .min(2, 'Too Short!')
    .max(20, 'Too Long!'),
  purchaseFrom: yup.string().required('Purchase from is required'),
  purchaseDate: yup.string().required('Purchase date is required'),
  amount: yup.string().required('Amount is required')
});

export const bankFormSchema = yup.object().shape({
  bankName: yup.string().required('Bank name is required'),
  branchName: yup.string().required('Branch name is required'),
  accountName: yup.string().matches(holderNameRegx, '').required('Account name is required'),
  accountNumber: yup.string().matches(accNumberRegx, '').required('Account number is required'),
  ifscCode: yup.string().matches(ifscCodeRegx, '').required('IFSC code is required'),
  panNumber: yup.string().required('PAN number required')
});

export const supportTicketFormSchema = yup.object().shape({
  subject: yup.string().required('Subject is required')
});

export const noticeEventSchema = yup.object().shape({
  title: yup.string().required('Event title is required'),
  start: yup.string().required('Start date is required'),
  end: yup.string().required('End date is required')
});

export const basicSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
});

export const organisationSchema = yup.object().shape({
  permanentAdd: yup.string().required('Permanent Address is required')
});

export const organisationSignupSchema = yup.object().shape({
  organisationName: yup.string().required('Organisation name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

export const addEmployeeSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  employeeCode: yup.string().required('Employee code is required'),
  dateOfJoin: yup.string().required('Date of join is required')
});
