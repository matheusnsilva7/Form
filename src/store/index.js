import { configureStore, createSlice } from '@reduxjs/toolkit';

const formFunction = createSlice({
  name: 'form',
  initialState: {
    users: [],
  },
  reducers: {
    AddUser(state, action) {
      state.users.push({
        id: action.payload.id,
        Username: action.payload.Username,
        Email: action.payload.Email,
        Password: action.payload.Password,
      });
    },
    changePassword: (state, action) => {
      const index = state.users.findIndex((element) => element.Email === action.payload.Email)
      state.users[index] = { ...state.users[index], Password: action.payload.Password }
    },
  }
});

export const { AddUser, changePassword } = formFunction.actions;

const store = configureStore({
  reducer: { form: formFunction.reducer },
});

export default store;