const express = require("express");
const router = express.Router();
const {totalArticle,totalUsers,totalComments,recentActivities,adminData,adminUpdate,CreateNews,ShowNews,deleteNews,UserInfo,deleteUser,adminRegister,adminLogin} = require('../controllers/adminController')



const uploadNews = require('../middlewares/uploadAddNewsMiddleware');

// get the data for dash board

router.get('/dashboard/totalArticle',totalArticle);
router.get('/dashboard/totalUsers',totalUsers);
router.get('/dashboard/totalComments',totalComments);

// activity fetch ke liye

router.get('/dashboard/recentActivities', recentActivities);

  

//Add article to the website
router.post('/addNews',uploadNews.single('image'),CreateNews);

//View all news articles
router.get('/showNews',ShowNews);
router.delete('/deleteNews/:id', deleteNews);

//Manage users
router.get('/userInfo',UserInfo);
router.delete('/deleteUser/:id', deleteUser);

//admin login info

router.get('/adminData', adminData);
router.post('/adminUpdate',adminUpdate);


//admin login
router.post('/adminRegister',adminRegister);
router.post('/adminLogin', adminLogin);


module.exports = router;