import * as yup from 'yup';

const numberRegx = /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
const holderNameRegx = /^[a-zA-Z0-9\s]*$/g;
const accNumberRegx = /^\d{9,18}$/;
const ifscCodeRegx = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const validationSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .when('password', {
      is: (val) => !!(val && val.length > 0),
      then: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .oneOf([yup.ref('password')], 'new password and confirmed password should be the same')
    })
    .required('Confirm Password is required'),
  firstName: yup.string().required('First name is required'),
  department: yup.string().required('Department is required'),
  lastName: yup.string().required('Last name is required'),
  fatherName: yup.string().required('Father name is required'),
  designation: yup.string().required('Designation is required'),
  // empCode: yup.string().required('Required'),
  phoneNumber: yup
    .string()
    .matches(numberRegx, 'Phone number is not valid')
    .required('Phone number is required'),
  alternativeNumber: yup
    .string()
    .matches(numberRegx, 'Alternative number is not valid')
    .required('Alternative number is required'),
  pAdd: yup.string().required('Permanent Address is required'),
  bankName: yup.string().required('Bank name is required'),
  branchName: yup.string().required('Branch name is required'),
  accountName: yup.string().matches(holderNameRegx, '').required('Account name is required'),
  accountNumber: yup.string().matches(accNumberRegx, '').required('Account number is required'),
  ifscCode: yup.string().matches(ifscCodeRegx, '').required('IFSC code is required'),
  panNumber: yup.string().required('PAN number required')
});

export default validationSchema;
