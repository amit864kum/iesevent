/**
 * Email Service
 * Deprecated: Email sending moved to frontend using EmailJS
 */

const sendAutoReplyEmail = async (userEmail, userName) => {
  console.log('Email service moved to frontend (EmailJS)');
  return true;
};

const sendNotificationEmail = async (contactData) => {
  console.log('Email service moved to frontend (EmailJS)');
  return true;
};

module.exports = {
  sendAutoReplyEmail,
  sendNotificationEmail,
};
