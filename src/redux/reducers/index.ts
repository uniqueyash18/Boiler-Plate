import { Action, combineReducers } from 'redux';
import appSetting, { settingInterface } from './appSetting';
import auth, { AuthState } from './auth';
export interface RootState {
    auth: AuthState; 
    appSetting:settingInterface
}
const appReducer = combineReducers({
    auth,
    appSetting
    
});
const rootReducer = (state:  RootState | undefined, action: Action<any>) => {
    return appReducer(state, action)
}
export default rootReducer;