export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateName = (name) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(name.trim());
};

export const validatePrice = (price) => {
  const num = parseFloat(price);
  return !isNaN(num) && num > 0;
};

export const isRequired = (value) => {
  return value !== undefined && value !== null && value.toString().trim() !== "";
};
