import * as yup from 'yup';

const numberRegx = /^[0-9\b]+$/;
const holderNameRegx = /^[a-zA-Z0-9\s]*$/g;
const accNumberRegx = /^\d{9,18}$/;
const ifscCodeRegx = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const validationSchema = yup.object().shape({
  email: yup.string('Enter your email').email('Enter a valid email').required('Required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
  firstName: yup.string().required('Required'),
  department: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  fatherName: yup.string().required('Required'),
  designation: yup.string().required('Required'),
  empCode: yup.string().required('Required'),
  phoneNumber: yup.string().matches(numberRegx, 'Phone number is not valid').required('Required'),
  alternativeNumber: yup
    .string()
    .matches(numberRegx, 'Phone number is not valid')
    .required('Required'),
  pAdd: yup.string().required('Required'),
  bankName: yup.string().required('Required'),
  branchName: yup.string().required('Required'),
  accountName: yup.string().matches(holderNameRegx, '').required('Required'),
  accountNumber: yup.string().matches(accNumberRegx, '').required('Required'),
  ifscCode: yup.string().matches(ifscCodeRegx, '').required('Required'),
  panNumber: yup.string().required('Required')
});

export default validationSchema;
