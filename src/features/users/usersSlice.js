import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: "",
  loginUsername: "",
  loginPassword: "",
  loginWarning: "",
  loginSuccessMessage: "",
  createAccountUsername: "",
  createAccountPassword: "",
  createAccountPassword2: "",
  createAccountWarning: "",
  createAccountSuccessMessage: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoginUsername: (state, action) => {
      state.loginUsername = action.payload;
      state.loginWarning = "";
    },
    setLoginPassword: (state, action) => {
      state.loginPassword = action.payload;
      state.loginWarning = "";
    },
    setLoginSuccessMessage: (state, action) => {
      state.loginSuccessMessage = action.payload;
    },
    loginUser: (state) => {
      if (state.loginUsername === "" || state.loginPassword === "") {
        state.loginWarning = "Do not leave any fields blank"
      } else {
        if (state.users.map(user => user["username"]).includes(state.loginUsername)) {
          if (state.users[state.users.map(user => user["username"]).indexOf(state.loginUsername)]["password"] === state.loginPassword) {
              state.loginSuccessMessage = "Login successful";
              state.loginWarning = "";
          } else {
            state.loginWarning = "Username and password do not match";
          }
        } else {
          state.loginWarning = "Username does not exist";
        }
      }
    },
    setCreateAccountUsername: (state, action) => {
      state.createAccountUsername = action.payload;
      state.createAccountWarning = "";
    },
    setCreateAccountPassword: (state, action) => {
      state.createAccountPassword = action.payload;
      state.createAccountWarning = "";
    },
    setCreateAccountPassword2: (state, action) => {
      state.createAccountPassword2 = action.payload;
      state.createAccountWarning = "";
    },
    setCreateAccountSuccessMessage: (state, action) => {
      state.createAccountSuccessMessage = action.payload;
    },
    addUser: (state) => {
      if (state.createAccountUsername === "" || state.createAccountPassword === "" || state.createAccountPassword2 === "") {
        state.createAccountWarning = "Do not leave any fields blank";
      } else {
        if (state.createAccountPassword === state.createAccountPassword2) {
          if (!state.users.map(user => user["username"]).includes(state.createAccountUsername)) {
            state.users.push({"username": state.createAccountUsername, "password": state.createAccountPassword});
            state.createAccountSuccessMessage = "Account created and logged in";
            state.createAccountWarning = "";
          } else {
            state.createAccountWarning = "Username already exists";
          }
        } else {
          state.createAccountWarning = "Passwords don't match";
        }
      }
    }
  }
});

export const { loginUser, addUser, setCurrentUser, setLoginUsername, setLoginPassword, setLoginSuccessMessage, setCreateAccountUsername, setCreateAccountPassword, setCreateAccountPassword2, setCreateAccountSuccessMessage } = usersSlice.actions;

export const selectUsers = (state) => state.users.users;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectLoginUsername = (state) => state.users.loginUsername;
export const selectLoginPassword = (state) => state.users.loginPassword;
export const selectLoginWarning = (state) => state.users.loginWarning;
export const selectLoginSuccessMessage = (state) => state.users.loginSuccessMessage;
export const selectCreateAccountUsername = (state) => state.users.createAccountUsername;
export const selectCreateAccountPassword = (state) => state.users.createAccountPassword;
export const selectCreateAccountPassword2 = (state) => state.users.createAccountPassword2;
export const selectCreateAccountWarning = (state) => state.users.createAccountWarning;
export const selectCreateAccountSuccessMessage = (state) => state.users.createAccountSuccessMessage;

export default usersSlice.reducer;