import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup.string().when('password', {
    is: (val) => !!(val && val.length > 0),
    then: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .oneOf([yup.ref('password')], 'new password and confirmed password should be the same')
  })
});

export default validationSchema;
