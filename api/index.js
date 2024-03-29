import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';




const app = express()

app.use(express.json());

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
  app.use('/api/auth', authRoutes);

  //Middleware

  app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
      success : false,
      statusCode,
      message
    })

  })