import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface settingInterface {
language:string
}

const initialState: settingInterface = {
    language: 'en',
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLanguage:(state,data: PayloadAction<string>)=>{
        state.language = data?.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLanguage} = settingSlice.actions

export default settingSlice.reducer