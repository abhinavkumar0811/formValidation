const mongoose = require('mongoose');

const dbConnectionFn = () => {
  mongoose
    .connect('mongodb+srv://abhinavkashyap702:P6ObdhgPW6GVaBAL@formvalidation1.tggxhax.mongodb.net/')
    .then(() => {
      console.log('✅ Congratulations! Your DB connected successfully');
    })
    .catch((error) => {
      console.error('❌ Your DB connection failed:', error.message);
    });
};

module.exports = {
  dbConnectionFn
};
