require("dotenv").config();
const contactSchema = require('../models/Contact');

const Card = require('../models/ContactCard')

const contactUser =  async (req,res)=>{

    const {name,email,mobile,message} = req.body;
    console.log(req.body);
    try {
        if(!name||!email||!mobile||!message){
            console.log("something is missing");
            
        }
        const newMessage = await contactSchema.create({name,email,mobile,message})
        
        res.status(200).json(
            {
                message:"it is working",
                user: { id: newMessage._id, name: newMessage.name, email: newMessage.email,mobile:newMessage.mobile,message:newMessage.message },
            },
        )
        
    } catch (error) {

        console.error("Contact error:", error);
    res.status(500).json({ message: "Server error" });
        
    }

}

const contactCard = async (req, res) => {
    try {
      const cards = await Card.find();
  
      res.status(200).json({
        message: "message working successfully",
        cards: cards
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact cards" });
    }
  };
module.exports = {contactUser,contactCard};