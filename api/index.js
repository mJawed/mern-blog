import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';




const app = express()

app.listen(3000, ()=>{
console.log('server is running on port 3000!!')
});

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });


  app.get('/test',(req,res)=>{
    //res.json({message:"Api Working"})
    res.send("hello");
    console.log(req.body)
    
    }
    );

  app.use('/api/user', userRoutes);