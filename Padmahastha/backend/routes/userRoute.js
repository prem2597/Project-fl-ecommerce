import express from 'express';

const router = express.Router();

router.get("/createadmin", async(req,res)=>{
    try{

        const user= new user({
            name:'Manideep Netha',
            email: 'manideepnetha24@gmail.com',
            password:'1234',
            isAAdmin:true
        });
    
        const newUser = await user.save();
        res.send(user);
    }
    catch(error){
      res.send({msg:error.message});

    }

   
});
export default router;