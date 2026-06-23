import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});


export const uploadFile = async(file : any) => {
    return await cloudinary.uploader.upload(file , 
        {
            resource_type : 'auto',
            use_filename: true, 
            unique_filename: true,
            folder: "Medidecode/Reports"
        }
    )
}

export const deleteFile = async (
    publicId: string,
    resourceType: string = "auth"
) => {

    return await cloudinary.uploader.destroy(
        publicId,
        {
            resource_type: resourceType
        }
    );
};