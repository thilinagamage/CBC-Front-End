import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabase = createClient(
  "https://ytescfohaeiuvowdmcpz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0ZXNjZm9oYWVpdXZvd2RtY3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDU4NTYsImV4cCI6MjA2NDQyMTg1Nn0.PGzG-q-AsPOTmrhBDe9Se7KTUhqJHRJxlanYNoo8Pu8"

);

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected");
      return;
    }

    const timestamp = new Date().getTime();
    const newFileName = `${timestamp}-${file.name}`;

    supabase.storage
      .from("product--images")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(({ error }) => {
        if (error) {
          reject("File upload failed");
        } else {
          const { publicUrl } = supabase.storage
            .from("product--images")
            .getPublicUrl(newFileName).data;

          toast.success("File uploaded successfully");
          resolve(publicUrl);
          
        }
      })
      .catch(() => {
        reject("File upload failed");
      });
  });
}
