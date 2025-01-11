const authMiddleware = () => {
  return async (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({
              success: false,
              message: 'Unauthorized!',
          });
      }

      const accessToken = authHeader.split(' ')[1];

      if (!accessToken) {
          return res.json({
              success: false,
              message: 'Unauthorized!',
          });
      }

      // Verify the accessToken
      jwt.verify(accessToken, SECRET, (err, decoded) => {
          if (!err && decoded) {
              req.user = {
                  id: decoded.id,
                  email: decoded.email,
              };

              next();
          } else {
              return res.json({
                  success: false,
                  message: 'Unauthorized!',
              });
          }
      });
  };
};

export default authMiddleware;