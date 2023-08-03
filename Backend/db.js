const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://Gofood:Pen*1234@cluster0.k3ix8e1.mongodb.net/Gofood';

const MongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });
    console.log("Connected to Mongo");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const foodCategory = await mongoose.connection.db.collection("food_category");
    try {
      const data = await fetched_data.find().toArray()
      const catdata =  await foodCategory.find().toArray()
      global.food_items = data; 
      global.food_category = catdata;
    }
    catch (err) {
      console.log("Error connecting to Mongo:", err.message)
    }
  }
  catch (error) {
    console.error("Error connecting to Mongo:", error.message);
  }
};
module.exports = MongoDB;
