export const requestLogger = (logRequests: any) => {
  return (req: any, res: any, next: any) => {
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
