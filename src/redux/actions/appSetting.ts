import { useDispatch } from "react-redux"
import { setItem } from "../../services/apiService"
import { setLanguage } from "../reducers/appSetting"
import store from "../store";
const {dispatch} = store;
export const changeAppLanguage = (lang:string)=>{
    setItem('appLanguage',lang)
    dispatch(setLanguage(lang))
}