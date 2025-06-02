import { createClient } from "@supabase/supabase-js"


const supabase = createClient(
    "https://ytescfohaeiuvowdmcpz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0ZXNjZm9oYWVpdXZvd2RtY3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDU4NTYsImV4cCI6MjA2NDQyMTg1Nn0.PGzG-q-AsPOTmrhBDe9Se7KTUhqJHRJxlanYNoo8Pu8"
);

export default function mediaUpload(file){
    const promise = new Promise(
        (resolve,reject) =>{
            if(file == null){
                reject("No file Selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp + file

            supabase.storage.from("product-images").upload(newFileName.file,{
                cacheControl: "3600",
                upsert: false
            }).then(
                () => {
                    const url = supabase.storage.from("product-images").getPublicUrl(newFileName).data.publicUrl
                }
            ).catch(
                (error) => {
                    reject("File upload failed")
                }
            )
          
            
        } 
    )

    return Promise
}