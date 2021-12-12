exports.moduleFunc = (res) => {
  console.log(`Status:`, res.status);
  console.log(`Data`, res.data);
};

// I created an axios success message module function that returns the status and data properties of the response.