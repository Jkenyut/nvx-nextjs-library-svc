export const errorHandler = (error, res) => {
  if (error.errors) {
    console.log("value error sistem ");
    error.data = { data: error.errors || "error system" };
    return res.status(error.httpStatusCode || 500).json({ message: error.data });
  } else {
    console.log("value error ditambah");
    error.data = [{ message: error.message || "error service" }];
    console.log(error.httpStatusCode);
    return res.status(error.httpStatusCode || 500).json({ message: error });
  }
};
