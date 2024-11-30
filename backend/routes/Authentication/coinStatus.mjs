import express from "express";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { DailyCoinReset } from "../../middleware/coins/DailyCoinReset.mjs";
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
import configFile from "../../Config/CoinsConfig.json" with {type:'json'}
import { msToTimerObject } from "../../utils/func/msToTimerObject.mjs";


const delay = configFile.ResetInterval*3600*1000
const router = express.Router();

router.get(
  "/api/user/auth/coins",
  isLoggedIn,
  DailyCoinReset,
  async (request, response) => {
    const User = request.user;
    let coins = false
    
    try{
        const user = await UserModel.findById(User.id)
        coins = user.coins
        return response.status(200).send({
          status:200,
          msg:"Coins Details",
          coins
      })
          

    } catch(err){
        console.error('Error Finding and setting up Coins',err.message)
        return response.status(200).send({
          status:400,
          msg:'Error Fetching coins'
          
      })
        }
        
    }
    
   

 
);

export default router;
