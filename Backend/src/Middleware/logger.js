export const requestLogger = (logRequests) => {
  return (req, res, next) => {
    if (logRequests) {
      const clientIp =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      console.log(
        `[LOG] IP: ${clientIp} - URL: ${req.originalUrl} - Method: ${req.method}`,
      );
    }
    next();
  };
};
