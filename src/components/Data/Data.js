const Data = {
  login: {
    input: [
      {
        type: "text",
        name: "Username",
        errorMessage: "could not find user",
        focus: true,
      },
      {
        type: "password",
        name: "Password",
        errorMessage: "Wrong Password",
      },
    ],
  },
  signup: {
    input: [
      {
        type: "text",
        name: "Username",
        pattern: "^[A-Za-z0-9]{3,16}$",
        errorMessage: "Username have less than 3 characters",
        errorExistsMessage: "Username already exists",
      },
      {
        type: "email",
        name: "Email",
        pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
        errorExistsMessage: "Email already exists",
      },
      {
        type: "password",
        name: "Password",
        pattern: "[A-Za-z0-9]{5,16}$",
        errorMessage: "Password must have at least 5 characters",
      },
    ],
  },
  changePassword: {
    input: [
      {
        type: "password",
        name: "newPassword",
        placeholder: "New Password",
        pattern: "[A-Za-z0-9]{5,16}$",
        errorMessage: "Password must have at least 5 characters",
      },
      {
        type: "password",
        name: "confirmPassword",
        placeholder: "Confirm Password",
        errorMessage: "Confirm password does not match",
      },
    ],
  },
};

export default Data;
