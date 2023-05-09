import { Check, CloseSharp } from '@mui/icons-material';
import axios from 'axios';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { useContext, useMemo } from 'react';
import { setLoaderStart } from './actions';
import { BASE_URL } from './api.config';
import { store } from './store';

export const instance = axios.create({
  baseURI: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    AccessControlAllowMethods: 'GET, POST, PUT, DELETE, OPTIONS',
    'Cache-Control': 'no-cache',
    'X-Requested-With': 'XMLHttpRequest' // IMPORTANT!!
  },
  withCredentials: false,
  crossdomain: true
});

instance.interceptors.request.use(
  (reqConfig) => {
    const token = store.getState().login.token;
    if (token) {
      reqConfig.headers.Authorization = `Bearer ${token}`;
    }
    return reqConfig;
  },
  (error) => Promise.reject(error)
);

const Interceptor = ({ children, onTokenExpire }) => {
  const { setSnack } = useContext(SnackbarContext);
  useMemo(() => {
    instance.interceptors.response.use(
      (response) => {
        setLoaderStart(true);
        if (response && !response.config.url.split('/').includes('domain')) {
          if (response.data) {
            if (response.data.status) {
              if (response.data.message) {
                setSnack({
                  title: 'Success',
                  message: response.data.message,
                  time: false,
                  icon: <Check color="white" />,
                  color: 'success',
                  open: true
                });
              }
            } else {
              setSnack({
                autoHide: 3000,
                title: 'Error',
                message: response.data.message,
                time: false,
                icon: <CloseSharp color="white" />,
                color: 'error',
                open: true
              });
              if (response.data.unauthorized) {
                onTokenExpire();
              }
            }
          }
        }
        return response;
      },
      (err) => {
        setSnack({
          title: 'Error',
          message: err.message,
          time: false,
          icon: <Check color="white" />,
          color: 'error',
          open: true
        });
        Promise.reject(err);
      }
    );
  }, [setSnack]);
  return <>{children}</>;
};

export default Interceptor;
