const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { v2: cloudinary } = require("cloudinary");

const authRoutes = require("./routes/auth.route.js")
const userRoutes = require("./routes/user.route.js");
const postRoutes = require("./routes/post.route.js");
const notificationRoutes = require("./routes/notification.route.js");
const {connectMongoDB} = require("./db/connectMongoDB.js");

// dotenv.config();
// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: '', 
//         api_key: '', 
//         api_secret: '' // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();

const uploadRoutes = require("./routes/upload.route.js");



const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/upload", uploadRoutes);
// Middleware
app.use(express.json({ limit: "5mb" })); // Parse JSON body (limit prevents DOS attacks)
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Serve frontend in production mode
// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "frontend", "dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// 	});
// }
console.log(authRoutes);
// Start Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});

