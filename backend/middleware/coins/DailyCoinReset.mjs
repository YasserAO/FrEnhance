import CoinConfig from '../../Config/CoinsConfig.json' with {type:'json'}
import { UserModel } from '../../Schema/mongoose/userModele.mjs'
export const DailyCoinReset = async (req,res,next)=>{
    
    const DailyInterval = CoinConfig.ResetInterval*1000*3600
    const DefaultValue = CoinConfig.defaultValue
    const userID = req.user.id
    let User
try {
    User = await UserModel.findById(userID)
}
catch (err){
    console.error(err.message)
}

if(User.coins == undefined) {
    
    console.log('coins is undefined')
    User.coins = {
        quantity:DefaultValue,
        lastReset:new Date()
    }

    try {
        await User.save()
        
        
    }
    catch(err){
        console.error(err.message)
    }
    finally{
        
        next()
    }
}
const TheQuantity = User.coins.quantity
const TheReset = User.coins.lastReset
const now = new Date()

if(TheQuantity==undefined || (now - TheReset)>= DailyInterval){
    

    User.coins = {
        quantity:DefaultValue,
        lastReset: new Date()
    }
    try{
        await User.save()
        
    }
    catch(err){
        console.error(err.message)
    }
    finally{
        next()
    }
}


if(TheQuantity == DefaultValue && TheReset== undefined) {
    
    User.coins.lastReset = new Date()
    try{
        await User.save()
        
    }
    catch(err){
        console.error(err.message)
    }
    finally{
        next()
    }
    
}
next()










}