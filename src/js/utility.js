export const generateAgesList = (from, before) => {
  const resArr = [];
  for (let i = from; i <= before; i += 1) {
    resArr.push(i);
  }
  return resArr;
};

export const validateEmail = (email) => {
  const emailRegexp =
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

  return emailRegexp.test(email);
};
