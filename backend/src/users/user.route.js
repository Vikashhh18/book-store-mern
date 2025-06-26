// import express from 'express';
// import { User } from './user.model.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// const userRoute = express.Router();


// userRoute.post('/admin', async (req, res) => {
//   const {username, password} = req.body;
//     try {
//         const admin =  await User.findOne({username});
//         if(!admin) {
//             res.status(404).send({message: "Admin not found!"})
//         }
//         if(admin.password !== password) {
//             res.status(401).send({message: "Invalid password!"})
//         }
        
//         const token =  jwt.sign(
//             {id: admin._id, username: admin.username, role: admin.role}, 
//             process.env.JWT_SECRET,
//             {expiresIn: "1h"}
//         )

//         return res.status(200).json({
//             message: "Authentication successful",
//             token: token,
//             user: {
//                 username: admin.username,
//                 role: admin.role
//             }
//         })
        
//     } catch (error) {
//        console.error("Failed to login as admin", error)
//        res.status(401).send({message: "Failed to login as admin"}) 
//     }
// });

// userRoute.post('/register-admin', async (req, res) => {
//   const { username, password } = req.body;

//   const existing = await User.findOne({ username });
//   if (existing) {
//     return res.status(409).json({ message: "Admin already exists" });
//   }
//   console.log("🧾 Storing admin:", username, password);

//   const newAdmin = await User.create({
//     username,
//     password,
//     role: "admin"
//   });

//    await newAdmin.save();

//   res.status(201).json({ message: "Admin registered successfully" });
// });





// export default userRoute;


import express from 'express';
import { User } from './user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRoute = express.Router();

userRoute.post('/admin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication successful",
      token,
      user: {
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Failed to login as admin", error);
    return res.status(500).send({ message: "Failed to login as admin" });
  }
});

userRoute.post('/register-admin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    console.log("🧾 Storing admin:", username, password);

    // const hashedPassword = await bcrypt.hash(password, 10); // hashing password

    const newAdmin = await User.create({
      username,
      password,
      role: "admin"
    });

    await newAdmin.save();

    return res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    console.error("Failed to register admin:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
});

export  default userRoute;