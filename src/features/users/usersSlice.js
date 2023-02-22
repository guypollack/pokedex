import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: "guest",
  loginUsername: "",
  loginPassword: "",
  loginWarning: "",
  loginSuccessMessage: "",
  createAccountUsername: "",
  createAccountPassword: "",
  createAccountPassword2: "",
  createAccountWarning: "",
  createAccountSuccessMessage: "",
  changePasswordCurrentPassword: "",
  changePasswordNewPassword1: "",
  changePasswordNewPassword2: "",
  changePasswordWarning: "",
  changePasswordSuccessMessage: "",
  renameUsername: "",
  renamePassword: "",
  renameWarning: "",
  renameSuccessMessage: ""
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
    addUser: (state, action) => {
      let areAnyFieldsBlank;
      let doPasswordsMatchEachOther;
      let doesUsernameExist;
      let isPasswordCorrect;

      if (action.payload.type === "newUser") {
        areAnyFieldsBlank = state.createAccountUsername === "" || state.createAccountPassword === "" || state.createAccountPassword2 === "";
        doPasswordsMatchEachOther = state.createAccountPassword === state.createAccountPassword2;
        doesUsernameExist = state.users.map(user => user["username"]).includes(state.createAccountUsername);
      }

      if (action.payload.type === "renameUser") {
        areAnyFieldsBlank = state.renameUsername === "" || state.renamePassword === "";
        doesUsernameExist = state.users.map(user => user["username"]).includes(state.renameUsername);
        isPasswordCorrect = state.users[state.users.map(user => user["username"]).indexOf(state.currentUser)]["password"] === state.renamePassword;
      }

      if (areAnyFieldsBlank) {
        state.createAccountWarning = "Do not leave any fields blank";
        state.renameWarning = "Do not leave any fields blank";
      } else {
        if (action.payload.type === "newUser") {
          if (doPasswordsMatchEachOther) {
            if (!doesUsernameExist) {
              state.users.push({"username": state.createAccountUsername, "password": state.createAccountPassword});
              state.createAccountSuccessMessage = "Account created and logged in";
              state.createAccountWarning = "";
            } else {
              state.createAccountWarning = "Username already exists";
            }
          } else {
            state.createAccountWarning = "Passwords don't match";
          }
        } else if (action.payload.type === "renameUser") {
          if (!doesUsernameExist) {
            if (isPasswordCorrect) {
              state.users.push({"username": state.renameUsername, "password": state.renamePassword});
              state.renameSuccessMessage = `Username changed to ${state.renameUsername}`;
              state.renameWarning = "";
            } else {
              state.renameWarning = "Username and password do not match";
            }
          } else {
            state.renameWarning = "Username already exists"
          }
        }
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.username !== action.payload);
    },
    setChangePasswordCurrentPassword: (state, action) => {
      state.changePasswordCurrentPassword = action.payload;
      state.changePasswordWarning = "";
    },
    setChangePasswordNewPassword1: (state, action) => {
      state.changePasswordNewPassword1 = action.payload;
      state.changePasswordWarning = "";
    },
    setChangePasswordNewPassword2: (state, action) => {
      state.changePasswordNewPassword2 = action.payload;
      state.changePasswordWarning = "";
    },
    setChangePasswordWarning: (state, action) => {
      state.changePasswordWarning = action.payload;
    },
    setChangePasswordSuccessMessage: (state, action) => {
      state.changePasswordSuccessMessage = action.payload;
    },
    changePassword: (state) => {
      const areAnyFieldsBlank = state.changePasswordCurrentPassword === "" || state.changePasswordNewPassword1 === "" || state.changePasswordNewPassword2 === "";
      const isPasswordCorrect = state.users[state.users.map(user => user["username"]).indexOf(state.currentUser)]["password"] === state.changePasswordCurrentPassword;
      const doPasswordsMatchEachOther = state.changePasswordNewPassword1 === state.changePasswordNewPassword2;
      const isPasswordSameAsPrevious = state.changePasswordNewPassword1 === state.changePasswordCurrentPassword;

      if (areAnyFieldsBlank) {
        state.changePasswordWarning = "Do not leave any fields blank";
      } else {
        if (isPasswordCorrect) {
          if (doPasswordsMatchEachOther) {
            if (!isPasswordSameAsPrevious) {
              state.users[state.users.map(user => user["username"]).indexOf(state.currentUser)]["password"] = state.changePasswordNewPassword1;
              state.changePasswordCurrentPassword = "";
              state.changePasswordNewPassword1 = "";
              state.changePasswordNewPassword2 = "";
              state.changePasswordWarning = "";
              state.changePasswordSuccessMessage = "Password updated";
            } else {
              state.changePasswordWarning = "New password cannot be the same as current password";
            }
          } else {
            state.changePasswordWarning = "Passwords don't match";
          }
        } else {
          state.changePasswordWarning = "Username and password do not match";
        }
      }

    },
    setRenameUsername: (state, action) => {
      state.renameUsername = action.payload;
      state.renameWarning = "";
    },
    setRenamePassword: (state, action) => {
      state.renamePassword = action.payload;
      state.renameWarning = "";
    },
    setRenameSuccessMessage: (state, action) => {
      state.renameSuccessMessage = action.payload;
    },
  }
});

export const { loginUser, addUser, removeUser, setCurrentUser, setLoginUsername, setLoginPassword, setLoginSuccessMessage, setCreateAccountUsername, setCreateAccountPassword, setCreateAccountPassword2, setCreateAccountSuccessMessage, setChangePasswordCurrentPassword, setChangePasswordNewPassword1, setChangePasswordNewPassword2, setChangePasswordWarning, setChangePasswordSuccessMessage, changePassword, setRenameUsername, setRenamePassword, setRenameSuccessMessage } = usersSlice.actions;

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
export const selectChangePasswordCurrentPassword = (state) => state.users.changePasswordCurrentPassword;
export const selectChangePasswordNewPassword1 = (state) => state.users.changePasswordNewPassword1;
export const selectChangePasswordNewPassword2 = (state) => state.users.changePasswordNewPassword2;
export const selectChangePasswordWarning = (state) => state.users.changePasswordWarning;
export const selectChangePasswordSuccessMessage = (state) => state.users.changePasswordSuccessMessage;
export const selectRenameUsername = (state) => state.users.renameUsername;
export const selectRenamePassword = (state) => state.users.renamePassword;
export const selectRenameWarning = (state) => state.users.renameWarning;
export const selectRenameSuccessMessage = (state) => state.users.renameSuccessMessage;

export default usersSlice.reducer;