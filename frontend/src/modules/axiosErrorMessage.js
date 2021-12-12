exports.moduleFunc = (err) => {
  console.error(`Something went wrong!`, err);
  console.error(`Error Message`, err.response);
};

// I created an axios error message module function that returns the error and error response.