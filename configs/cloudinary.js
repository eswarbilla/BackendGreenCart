import {v2 as cloudinary} from 'cloudinary'

const connectClodinary = async()=>{
    cloudinary.config({
        cloud_name:process.env.CLODINARY_CLOUD_NAME,
        api_key:process.env.CLODINARY_API_KEY,
        api_secret:process.env.CLODINARY_API_SECRET
    })

}

export default connectClodinary;