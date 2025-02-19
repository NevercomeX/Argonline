// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  zeny: number;
  // Puedes agregar otros campos de usuario si es necesario
}

const initialState: UserState = {
  zeny: 10000, // Valor inicial (puede provenir de la API)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateZeny: (
      state,
      action: PayloadAction<number | ((prevZeny: number) => number)>
    ) => {
      if (typeof action.payload === "function") {
        state.zeny = action.payload(state.zeny);
      } else {
        state.zeny = action.payload;
      }
    },
    // Aquí podrías agregar más reducers según tus necesidades
  },
});

export const { updateZeny } = userSlice.actions;
export default userSlice.reducer;
