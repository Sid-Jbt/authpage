import * as yup from 'yup';

const passwordRegx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const numberRegx = /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
const holderNameRegx = /^[a-zA-Z0-9\s]*$/g;
const accNumberRegx = /^\d{9,18}$/;
const ifscCodeRegx = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Required'),
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required')
});

export const leaveFormSchema = yup.object().shape({
  fromDate: yup.string().required('From date is required'),
  toDate: yup.string().required('To date is required')
  // leaveReason: yup.string().required('Leave reason is required')
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Required')
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
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
    .required('Required')
});

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  department: yup
    .string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid department name'),
  lastName: yup
    .string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
  fatherName: yup
    .string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid father name'),
  designation: yup
    .string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid designation'),
  phoneNumber: yup.string().matches(numberRegx, 'Phone number is not valid').required('Required'),
  alternatePhone: yup
    .string()
    .matches(numberRegx, 'Alternative number is not valid')
    .required('Required'),
  permanentAddress: yup.string().required('Required'),
  presentAddress: yup.string().required('Required')
});

export const bankAccountSchema = yup.object().shape({
  bankName: yup.string().required('Required'),
  branchName: yup.string().required('Required'),
  accountName: yup.string().matches(holderNameRegx, '').required('Required'),
  accountNumber: yup.string().matches(accNumberRegx, '').required('Required'),
  ifscCode: yup.string().matches(ifscCodeRegx, '').required('Required'),
  panNumber: yup.string().required('Required')
});

export const BasicInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  lastName: yup
    .string()
    .required('Required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
  email: yup.string().email('Must be a valid email address').required('Required'),
  confirmationEmail: yup
    .string()
    .oneOf([yup.ref('email'), null], 'Email and Confirmation Email should be the same')
    .required('Required'),
  phoneNumber: yup.string().matches(numberRegx, 'Phone number is not valid').required('Required'),
  pAdd: yup.string().required('Required')
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
  newPassword: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
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
    .required('Required')
});

export const holidayFormSchema = yup.object().shape({
  title: yup.string().required('Required'),
  holidayDate: yup.string().required('Required')
});

export const expenseFormSchema = yup.object().shape({
  itemName: yup
    .string()
    .required('Required')
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid item name'),
  purchaseFrom: yup.string().required('Required'),
  purchaseDate: yup.string().required('Required'),
  amount: yup.string().required('Required')
});

export const bankFormSchema = yup.object().shape({
  bankName: yup.string().required('Required'),
  branchName: yup.string().required('Required'),
  accountName: yup.string().matches(holderNameRegx, '').required('Required'),
  accountNumber: yup.string().matches(accNumberRegx, '').required('Required'),
  ifscCode: yup.string().matches(ifscCodeRegx, '').required('Required'),
  panNumber: yup.string().required('Required')
});

export const supportTicketFormSchema = yup.object().shape({
  subject: yup.string().required('Subject is required')
});

export const noticeEventSchema = yup.object().shape({
  title: yup.string().required('Required'),
  start: yup.string().required('Required'),
  end: yup.string().required('Required')
});

export const userSchema = [
  yup.object().shape({
    firstName: yup
      .string()
      .required('Required')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
    lastName: yup
      .string()
      .required('Required')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
  }),
  yup.object().shape({}),
  yup.object().shape({})
];

export const organisationSchema = [
  yup.object().shape({
    organizationAddress: yup.string().required('Required')
  }),
  yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required')
  }),
  yup.object().shape({})
];

export const organisationSignupSchema = yup.object().shape({
  organisationName: yup.string().required('Required'),
  email: yup.string().email('Enter a valid email').required('Required'),
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required')
});

export const organisationProfileSchema = yup.object().shape({
  organisationName: yup.string().required('Required'),
  organizationAddress: yup.string().required('Required')
});

export const addEmployeeSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
  // employeeCode: yup.string().required('Employee code is required'),
  dateOfJoin: yup.string().required('Required')
});
