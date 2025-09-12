import mongoose from "mongoose"

//func to cnct mongo dbs
export const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>console.log('Database connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-circuit`)
    } catch(error){
        console.log(error)
    }
}