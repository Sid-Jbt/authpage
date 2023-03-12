import {
  getOrganisationSignup,
  getLogin,
  getForgotPassword,
  getResetPassword,
  getProfileUpdate,
  getDashboard,
  getOrganisationProfileUpdate
} from 'APIs/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  Loading: state.loader.loading,
  UserData: state.login
});

const mapDispatchToProps = (dispatch) => ({
  GetLogin: (data, resolve, reject) => dispatch(getLogin(data, resolve, reject)),
  GetForgotPassword: (data, resolve, reject) => dispatch(getForgotPassword(data, resolve, reject)),
  GetResetPassword: (data, resolve, reject) => dispatch(getResetPassword(data, resolve, reject)),
  GetOrganistationSignup: (data, resolve, reject) =>
    dispatch(getOrganisationSignup(data, resolve, reject)),
  GetProfileUpdate: (data, resolve, reject) => dispatch(getProfileUpdate(data, resolve, reject)),
  GetOrganisationProfileUpdate: (data, resolve, reject) =>
    dispatch(getOrganisationProfileUpdate(data, resolve, reject)),
  GetDashboard: (data, resolve, reject) => dispatch(getDashboard(data, resolve, reject))
});

export default connect(mapStateToProps, mapDispatchToProps);
