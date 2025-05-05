require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Comment = require("../models/Contact")
const Admin = require("../models/Admin");  
const Article = require("../models/Article");




const totalArticle = async (req, res) => {  
    try {
        const totalArticles = await Article.countDocuments();
        res.status(200).json({ message: "Fetched total articles successfully", totalArticles });
    } catch (error) {
        console.error("Error fetching total articles:", error);
        res.status(500).json({ message: "Error fetching total articles", error });      
    }
  }
const totalUsers = async (req, res) => {

   try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ message: "Fetched total users successfully", totalUsers });
    } 
    catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ message: "Error fetching total users", error });
    
   }
   
  }

const totalComments = async (req,res)=>{

  try {
    const totalComments = await Comment.countDocuments();
    res.status(200).json({ message: "Fetched total users successfully", totalComments });
    
  } catch (error) {

    console.error("Error fetching total comments:", error);
    res.status(500).json({ message: "Error fetching total comments", error });
    
  }

}
  
const recentActivities = async (req, res) => {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1); // 24 hours ago

    const recentActivities = await Comment.find({ createdAt: { $gte: oneDayAgo } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: 'userId',
        select: 'name email',
        strictPopulate: false
      });

    res.status(200).json({
      message: "Fetched recent activities successfully",
      data: recentActivities
    });

  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({ message: "Error fetching recent activities", error });
  }
};





const CreateNews = async (req, res) => {

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'news_images' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });
  
    const news = new Article({ ...req.body, image: result.secure_url });
    const savedNews = await news.save();
    return res.status(201).json(savedNews);
    
  } catch (error) {
    console.error('Error creating news:', error);
    return res.status(500).json({ message: 'Error creating news', error });
  }
  


}


const ShowNews = async (req, res) => {
    try {
        const news = await Article.find({});
        
        res.status(200).json({message:"Fetched news successfully", news});  
        
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Error fetching news", error });
    }
       
}
const deleteNews = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedNews = await Article.findByIdAndDelete(id);
  
      if (!deletedNews) {
        return res.status(404).json({ message: "News article not found" });
      }
  
      res.status(200).json({ message: "News article deleted successfully", deletedNews });
    } catch (error) {
      console.error("Error deleting news article:", error);
      res.status(500).json({ message: "Error deleting news article", error });
    }
  };

const UserInfo = async (req, res) => {  
    try {
        const users = await User.find({});
        res.status(200).json({ message: "Fetched users successfully", users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user", error });
    }
  };

  const adminData = async (req, res) => {  
    try {
      
      const admin = await Admin.findOne();

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      res.status(200).json({ message: "Login successful", admin });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

  // admin update data of their profile
  const adminUpdate = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      
      const admin = await Admin.findOne();
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Update the admin's data
      admin.username = username || admin.username;
      admin.email = email || admin.email;
      admin.password = password || admin.password; 
  
      await admin.save();
  
      res.status(200).json({ message: "Admin data updated successfully", admin });
    } catch (error) {
      console.error("Error updating admin data:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }

  // 
  const adminRegister = async (req, res) => {

    const { username, email, password } = req.body;
  
    try {
      
      const existingAdmin = await Admin.findOne({ email });
  
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }
  
      const newAdmin = await Admin.create({ username, email, password});  
  
      res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });

    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
      

  const adminLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await admin.comparePass(password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // On successful login
      res.status(200).json({
        success: true,
        message: "Login successful",
        admin: {
          _id: admin._id,
          username: admin.username,
          email: admin.email,
        },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };
  
  

  

module.exports = {totalUsers,totalArticle,totalComments,recentActivities,CreateNews,ShowNews,deleteNews,UserInfo,deleteUser,adminData,adminUpdate,adminRegister,adminLogin };
