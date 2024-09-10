/** @format */

export const validateEmail = (email: string): string | undefined => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.length || !validRegex.test(email)) {
    return "Please enter a valid email address";
  }
};

export const validatePassword = (password: string): string | undefined => {
  if (password.length < 8) {
    return "Please enter a password that is at least 8 characters long";
  }
};

export const validatePasswordConfirmation = (
  password: string,
  passwordCopy: string
): string | undefined => {
  if (password != passwordCopy) {
    return "Please confirm that both passwords entered are the same";
  }
};

export const validateName = (username: string): string | undefined => {
  if (!username.length) return `Please enter a value`;
};
