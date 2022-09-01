const notFoundMiddleware = (req, res) =>
  res.status(404).send("Route does not exsist");

export default notFoundMiddleware;
