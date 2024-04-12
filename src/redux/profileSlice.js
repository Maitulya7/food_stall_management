import { createSlice  , nanoid } from "@reduxjs/toolkit";


const initialState  = {
    vendor:{
        
    }
}

export const profileSlice = createSlice({
    name:'profile',
    initialState
})