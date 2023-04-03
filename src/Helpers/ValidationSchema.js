import * as yup from 'yup';
import { validationMessage } from './Global';

const passwordRegx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const numberRegx = /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
const holderNameRegx = /^[a-zA-Z0-9\s]*$/g;
const accNumberRegx = /^\d{9,18}$/;
const ifscCodeRegx = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
const organisationName = /^[a-zA-Z0-9\s]{1,80}$/;
const domainRegx = /^[a-z]+$/;
const bankName = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required(validationMessage),
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required(validationMessage)
});

export const leaveFormSchema = yup.object().shape({
  fromDate: yup.string().required('From date is required'),
  toDate: yup.string().required('To date is required')
  // leaveReason: yup.string().required('Leave reason is required')
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required(validationMessage)
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required(validationMessage),
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
    .required(validationMessage)
});

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(validationMessage)
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  department: yup
    .string()
    .required(validationMessage)
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid department name'),
  lastName: yup
    .string()
    .required(validationMessage)
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
  fatherName: yup
    .string()
    .required(validationMessage)
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid father name'),
  designation: yup
    .string()
    .required(validationMessage)
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid designation'),
  phoneNumber: yup
    .string()
    .matches(numberRegx, 'Phone number is not valid')
    .required(validationMessage),
  alternatePhone: yup
    .string()
    .matches(numberRegx, 'Alternative number is not valid')
    .required(validationMessage),
  permanentAddress: yup.string().required(validationMessage),
  presentAddress: yup.string().required(validationMessage)
});

export const bankAccountSchema = yup.object().shape({
  bankName: yup.string().required(validationMessage).matches(bankName, 'Only alphabet allow'),
  branchName: yup.string().required(validationMessage),
  accountName: yup.string().matches(holderNameRegx, '').required(validationMessage),
  accountNumber: yup.string().matches(accNumberRegx, '').required(validationMessage),
  ifscCode: yup.string().matches(ifscCodeRegx, '').required(validationMessage),
  panNumber: yup.string().required(validationMessage)
});

export const BasicInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(validationMessage)
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  lastName: yup
    .string()
    .required(validationMessage)
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
  phoneNumber: yup
    .string()
    .matches(numberRegx, 'Phone number is not valid')
    .required(validationMessage),
  permanentAddress: yup.string().required(validationMessage)
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required(validationMessage),
  newPassword: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .required(validationMessage),
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
    .required(validationMessage)
});

export const holidayFormSchema = yup.object().shape({
  title: yup.string().required(validationMessage),
  holidayDate: yup.string().required(validationMessage)
});

export const expenseFormSchema = yup.object().shape({
  itemName: yup
    .string()
    .required(validationMessage)
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid item name'),
  purchaseFrom: yup.string().required(validationMessage),
  purchaseDate: yup.string().required(validationMessage),
  amount: yup.string().required(validationMessage)
});

export const bankFormSchema = yup.object().shape({
  bankName: yup.string().required(validationMessage).matches(bankName, 'Only alphabet allow'),
  branchName: yup.string().required(validationMessage),
  accountName: yup.string().matches(holderNameRegx, '').required(validationMessage),
  accountNumber: yup.string().matches(accNumberRegx, '').required(validationMessage),
  ifscCode: yup.string().matches(ifscCodeRegx, '').required(validationMessage),
  panNumber: yup.string().required(validationMessage)
});

export const supportTicketFormSchema = yup.object().shape({
  subject: yup.string().required('Subject is required')
});

export const noticeEventSchema = yup.object().shape({
  title: yup.string().required(validationMessage),
  start: yup.string().required(validationMessage),
  end: yup.string().required(validationMessage)
});

export const userSchema = [
  yup.object().shape({
    firstName: yup
      .string()
      .required(validationMessage)
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
    lastName: yup
      .string()
      .required(validationMessage)
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
  }),
  yup.object().shape({}),
  yup.object().shape({})
];

export const organisationSchema = [
  yup.object().shape({
    location: yup.string().required(validationMessage)
  }),
  yup.object().shape({
    firstName: yup.string().required(validationMessage),
    lastName: yup.string().required(validationMessage)
  }),
  yup.object().shape({})
];

export const userProfileSchema = [
  yup.object().shape({
    firstName: yup
      .string()
      .required(validationMessage)
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
    lastName: yup
      .string()
      .required(validationMessage)
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
    fatherName: yup
      .string()
      .required(validationMessage)
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid father name'),
    designation: yup
      .string()
      .required(validationMessage)
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid designation'),
    phoneNumber: yup
      .string()
      .matches(numberRegx, 'Phone number is not valid')
      .required(validationMessage),
    alternatePhone: yup
      .string()
      .matches(numberRegx, 'Alternative number is not valid')
      .required(validationMessage),
    permanentAddress: yup.string().required(validationMessage),
    presentAddress: yup.string().required(validationMessage)
  }),
  yup.object().shape({
    bankName: yup.string().required(validationMessage).matches(bankName, 'Only alphabet allow'),
    branchName: yup.string().required(validationMessage),
    accountName: yup.string().matches(holderNameRegx, '').required(validationMessage),
    accountNumber: yup.string().matches(accNumberRegx, '').required(validationMessage),
    ifscCode: yup.string().matches(ifscCodeRegx, '').required(validationMessage),
    panNumber: yup.string().required(validationMessage)
  }),
  yup.object().shape({})
];

export const organisationProfileSchema = [
  yup.object().shape({
    firstName: yup
      .string()
      .required(validationMessage)
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
    lastName: yup
      .string()
      .required(validationMessage)
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
    phoneNumber: yup
      .string()
      .matches(numberRegx, 'Phone number is not valid')
      .required(validationMessage),
    alternatePhone: yup
      .string()
      .matches(numberRegx, 'Alternative number is not valid')
      .required(validationMessage),
    permanentAddress: yup.string().required(validationMessage),
    presentAddress: yup.string().required(validationMessage)
  }),
  yup.object().shape({
    organisationName: yup.string().required(validationMessage),
    location: yup.string().required(validationMessage)
  })
];

export const organisationSignupSchema = yup.object().shape({
  organisationName: yup
    .string()
    .required(validationMessage)
    .min(1, 'Too Short!')
    .max(80, 'Too Long!')
    .matches(organisationName, 'Allow only alphanumeric and one special char @ '),
  domain: yup
    .string()
    .required(validationMessage)
    .min(1, 'Too Short!')
    .max(80, 'Too Long!')
    .matches(domainRegx, 'Only allow alphabets'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required(validationMessage)
    .min(1, 'Too Short!')
    .max(80, 'Too Long!'),
  password: yup
    .string()
    .matches(
      passwordRegx,
      'One special characters, One upper character, Min 8 characters, One number'
    )
    .min(8, 'Password should be of minimum 8 characters length')
    .max(50, 'Too Long!')
    .required(validationMessage)
});

export const addEmployeeSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required(validationMessage),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required(validationMessage),
  // employeeCode: yup.string().required('Employee code is required'),
  dateOfJoin: yup.string().required(validationMessage)
});
