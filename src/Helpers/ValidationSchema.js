import * as yup from 'yup';

const numberRegx = /^[0-9\b]+$/;

const validationSchema = yup.object().shape({
  email: yup.string('Enter your email').email('Enter a valid email').required('Required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
  firstname: yup.string().required('Required'),
  department: yup.string().required('Required'),
  lastname: yup.string().required('Required'),
  fathername: yup.string().required('Required'),
  designation: yup.string().required('Required'),
  empCode: yup.string().required('Required'),
  phoneNumber: yup.string().matches(numberRegx, 'Phone number is not valid').required('Required'),
  alternativeNumber: yup
    .string()
    .matches(numberRegx, 'Phone number is not valid')
    .required('Required'),
  pAdd: yup.string().required('Required')
});

export default validationSchema;
