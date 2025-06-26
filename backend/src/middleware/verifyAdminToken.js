               
// import jwt from 'jsonwebtoken';
// const JWT_SECRET = process.env.JWT_SECRET

// export const verifyAdminToken =  (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied. No token provided' });
//     }
//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid credientials' });
//         }
//         req.user = user;
//         next();
//     })

// }

// module.exports = verifyAdminToken;
import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("AUTH HEADER:", authHeader);

  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    req.user = user;
    next();
  });
};
