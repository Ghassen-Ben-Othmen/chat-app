const validationSignUp = newUser => {
  const errors = {};
  if (isEmpty(newUser.handle)) errors.handle = "handle is required";
  if (isEmpty(newUser.email)) errors.email = "email is required";
  else {
    if (!isValidEmail(newUser.email)) errors.email = "invalid email";
  }
  if (isEmpty(newUser.password)) errors.password = "password is required";
  if (!matchPassword(newUser.password, newUser.confirmPassword))
    errors.confirmPassword = "password must match";
  if (isEmpty(newUser.avatar)) errors.avatar = "avatar is required";

  return { errors, valid: Object.keys(errors).length === 0 };
};

const validationSignIn = user => {
  const errors = {};
  if (isEmpty(user.email)) errors.email = "email is required";
  else {
    if (!isValidEmail(user.email)) errors.email = "invalid email";
  }
  if (isEmpty(user.password)) errors.password = "password is required";

  return { errors, valid: Object.keys(errors).length === 0 };
};

const isValidEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const match = email.match(regex);
  return match;
};

const isEmpty = field => {
  return field.trim() === "";
};

const matchPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

module.exports = { validationSignUp, validationSignIn };
