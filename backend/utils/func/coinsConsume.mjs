import configFile from '../../Config/CoinsConfig.json' with {type: 'json'}
import { UserModel } from '../../Schema/mongoose/userModele.mjs'


export const coinsConsume = async (id,type=3) =>{
    const findUser = async (id) =>{
        try{
            const user = await UserModel.findById(id)
            return user
        }
        catch(err){
            console.error(err.message)
            return false
        }
    }
    const User = await findUser(id)
    if(User == false){
        return false
    }


    const GenCost = configFile.GenerateText
    const ExpCost = configFile.Explain
    let consume
    if(type==0) {
        consume = GenCost.basic
    }else if(type==1){
        consume = GenCost.medium
    }else if(type==2){
        consume = GenCost.Advanced
    }else if(type=3){
        consume = ExpCost
    }

    if(consume > User.coins.quantity){
        return false
    }
    User.coins.quantity -=consume
    try{
        await User.save()
        return true
    }catch(err){
        console.error('error Saving the consume', err.message)
        return false
    }

}