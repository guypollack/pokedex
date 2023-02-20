import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  warning: "",
  successMessage: "",
  currentUser: "",
  loginUsername: "",
  loginPassword: "",
  createAccountUsername: "",
  createAccountPassword: "",
  createAccountPassword2: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state) => {
      if (state.createAccountUsername === "" || state.createAccountPassword === "" || state.createAccountPassword2 === "") {
        state.warning = "Do not leave any fields blank";
      } else {
        if (state.createAccountPassword === state.createAccountPassword2) {
          if (!state.users.map(user => user["username"]).includes(state.createAccountUsername)) {
            state.users.push({"username": state.createAccountUsername, "password": state.createAccountPassword});
            state.createAccountUsername = "";
            state.createAccountPassword = "";
            state.createAccountPassword2 = "";
            state.warning = "";
            state.successMessage = "Account created and logged in";
          } else {
            state.warning = "Username already exists";
          }
        } else {
          state.warning = "Passwords don't match";
        }
      }
    },
    setCreateAccountUsername: (state, action) => {
      state.createAccountUsername = action.payload;
      state.warning = "";
    },
    setCreateAccountPassword: (state, action) => {
      state.createAccountPassword = action.payload;
      state.warning = "";
    },
    setCreateAccountPassword2: (state, action) => {
      state.createAccountPassword2 = action.payload;
      state.warning = "";
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { addUser, setCurrentUser, setCreateAccountUsername, setCreateAccountPassword, setCreateAccountPassword2, setSuccessMessage } = usersSlice.actions;

export const selectUsers = (state) => state.users.users;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectCreateAccountUsername = (state) => state.users.createAccountUsername;
export const selectCreateAccountPassword = (state) => state.users.createAccountPassword;
export const selectCreateAccountPassword2 = (state) => state.users.createAccountPassword2;
export const selectWarning = (state) => state.users.warning;
export const selectSuccessMessage = (state) => state.users.successMessage;

export default usersSlice.reducer;