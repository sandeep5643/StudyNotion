const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoutes = require("./routes/Contact")

const database = require("./config/database");
const {cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// database connection
database.connect();

//cloudinary connection
cloudinaryConnect();

// //middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
	  origin: ["http://localhost:3000", "https://study-notion-u9jz-iota.vercel.app"],
	  credentials: true,
	})
  );
  

app.use(
	fileUpload({
		useTempFiles:true, // Temporarily file ko store karega
		tempFileDir:"/tmp", // Yeh batata hai ki temporary files kaha store hongi
	})
)

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoutes);


//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

// Server Start Karna
app.listen(PORT, () => {
	console.info(`App is running at ${PORT}`)
})