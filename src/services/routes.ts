export type APIS =
  | '/auth/signIn'
  | '/auth/signUp'
  | '/auth/forgetPassword'
  | '/auth/resetPassword'

export const LIVE_URL =  'http://192.168.1.9:8000'
export const LOGIN = '/auth/signIn';
export const SIGNUP = '/auth/signUp';
export const SEND_OTP = '/auth/forgetPassword';
export const VERIFY_OTP = '/auth/resetPassword';
