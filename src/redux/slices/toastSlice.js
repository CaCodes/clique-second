import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: '',
    title: '',
    message: ''
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
      showToast: (state, {payload}) => {
        state.status = payload.status;
        state.message = payload.message;
      },
      hideToast: (state) => {
        state.status = '';
        state.message = '';
      },
    }
  })

  export const {showToast, hideToast} = toastSlice.actions
  export default toastSlice.reducer