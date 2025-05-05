const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure the email is unique
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  this.password = await bcrypt.hash(this.password, 10); // Hash with 10 rounds of salt
  next();
});

// Method to compare passwords
adminSchema.methods.comparePass = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password); // Compare the candidate password with the stored hash
  } catch (error) {
    console.error("Password comparison error:", error);
    return false; // If error occurs during comparison
  }
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
