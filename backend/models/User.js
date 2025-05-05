
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,
        
     },
     password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
      },
    bio: {type: String,default: ""},
    image: {
        type: String, // ✅ Sahi!
        default: "https://your-default-image-url.com", // optional
      }
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePass = async function (candidatePassword) {

    try {
        
        return await bcrypt.compare(candidatePassword, this.password);
       
    } catch (error) {
        console.error("Password comparison error:", error);
        return false;
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
