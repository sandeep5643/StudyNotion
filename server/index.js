// const express = require('express');
// const app = express();
// const path = require("path");

// // require route
// const userRoute = require("./routes/userRoute");
// const profileRoutes = require('./routes/profileRoute');
// const paymentRoutes = require('./routes/paymentsRoute');
// const courseRoutes = require('./routes/courseRoute');
// const contactUsRoutes = require('./routes/contactRoute');

// // database connection
// const database = require('./config/database');
// database.DBConnect();


// // cloudinary connection
// const {cloudinaryConnect} = require('./config/cloudinary');
// cloudinaryConnect();


// // require dot env
// require('dotenv').config();
// const port = process.env.PORT || 4000;

// app.use(express.static(path.join(__dirname, "/dist")));


// // middleware
// // require cookieParser and use 
// const cookieParser = require("cookie-parser")
// app.use(cookieParser());

// app.use(express.json());

// const cors = require("cors")
// app.use(cors(
    
// ))

// const fileupload = require("express-fileupload")
// app.use(fileupload({
//     useTempFiles: true,
//     tempFileDir: "/tmp"
// }));


// // route mount
// app.use("/api/v1/auth", userRoute);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/reach", contactUsRoutes);



// // default route
// app.get("/", (req, res) => {
//     return res.json({
//         success:true,
//         message:"Your server is up and running....."
//     });
// });

// // server start/listen on 3000 port
// app.listen(port, () => {
//     console.log(`Server start on port no ${port}`);
// })


// // Catch-all route for handling React Router paths
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/dist", "index.html"));
//   });





const express = require('express');
const app = express();
const path = require("path");

// require route
const userRoute = require("./routes/userRoute");
const profileRoutes = require('./routes/profileRoute');
const paymentRoutes = require('./routes/paymentsRoute');
const courseRoutes = require('./routes/courseRoute');
const contactUsRoutes = require('./routes/contactRoute');

// database connection
const database = require('./config/database');
database.DBConnect();

// cloudinary connection
const {cloudinaryConnect} = require('./config/cloudinary');
cloudinaryConnect();

// require dot env
require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "/dist")));

// middleware
// require cookieParser and use 
const cookieParser = require("cookie-parser")
app.use(cookieParser());

app.use(express.json());

const cors = require("cors");
app.use(cors({
    // origin: "http://localhost:3000/api/v1", // Replace with your frontend URL
    // methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    // credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));

// route mount
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/reach", contactUsRoutes);

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running....."
    });
});

// server start/listen on port specified in .env
app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port no ${port}`);
});

// Catch-all route for handling React Router paths
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/dist", "index.html"));
});
