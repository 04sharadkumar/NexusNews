// utils/logActivity.js
const Activity = require('../models/Activity');

const logActivity = async (userId, action) => {
  try {
    await Activity.create({ userId, action });
  } catch (error) {
    console.error('Activity log error:', error.message);
  }
};

module.exports = logActivity;
