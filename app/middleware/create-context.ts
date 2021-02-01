const createContext = (req, res, next) => {
  req.context = {
    sessionId: req.cookies['_apollo-web_session'],
    subject: 'server',
  };

  next();
};

export default createContext;
