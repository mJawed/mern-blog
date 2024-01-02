import express from 'express';

const router = express.Router();



router.get('/testffff',(req,res)=>{
//res.json({message:"Api Working"})
res.json({message:"This is test message"});

}
);


export default router;