
require("dotenv").config();

const axios = require("axios");


const globalNews = async (req,res)=>{

   
    const { query } = req.query;
        
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`);

            res.json(response.data);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Could not fetch news data.' });
        }

}

  

module.exports = {globalNews};