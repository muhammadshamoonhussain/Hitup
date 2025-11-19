const mongoose = require("mongoose");
const express = require('express');
const cors = require("cors");
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/fitness_tracker',{
 useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => { 	
  console.log('MongoDB connected successfully!');
})
.catch((err) => {
  console.log('MongoDB connection error:', err);
})

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));  



app.use('/api/auth',require('./Routes/Auth'))
app.use('/api/workout',require('./Routes/Workoutroutes')) 
app.use('/api/nutrition',require('./Routes/NutritionRoutes')) 
app.use('/api/notification',require('./Routes/NotificationRoute')) 
app.use('/api/contact',require('./Routes/ContactRoute')) 
// app.use('/api/submitassignment',require('./Routes/SubmitAssi')) 
// app.use('/api/notice',require('./Routes/NoticeRoute')) 
// app.use('/api/rolepermission',require('./Routes/Permission')) ;
// // app.use('/api/scraping',require('./scrape')) 


app.use('/upload', express.static('upload'));


















app.listen(5000, () => {
    console.log("App is running on port 5000");
});