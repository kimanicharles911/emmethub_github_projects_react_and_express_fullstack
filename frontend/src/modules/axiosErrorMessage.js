exports.axiosErrorMessage = (err) => {
  console.error(`Something went wrong!`, err);
  console.error(`Error Message`, err.response);
};