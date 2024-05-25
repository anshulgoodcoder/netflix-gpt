export const checkValidate = (email, password, name) => {
  const isvalidName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
  const isvalidEmail = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);
  const isValidPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (name && !isvalidName) {
    return "Name is not valid!!";
  }
  if (!isvalidEmail) {
    return "Email Address is not valid!!";
  }

  if (!isValidPassword) {
    return "Password is not valid!!";
  }
  return null;
};
