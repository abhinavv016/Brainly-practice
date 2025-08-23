import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent(){
    const [contents, setContents] = useState([]);
    
    async function refresh(){
        const token = localStorage.getItem("token")

        if (!token) {
            console.log("No token found, stopping content fetch.");
            return;
        }
        await axios.get(`${BACKEND_URL}/api/v1/content` ,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
        })
        .then ((response) => {
            setContents((response.data as any).content)
        })
        .catch((error) => {
            console.log("Error in fetching the content", error)
        })
    }
    useEffect(() => {
        const interval = setInterval(()=>{
            refresh()
        },3*1000)
        return ()=>{
            clearInterval(interval);
        }
    }, []);

    return {contents, refresh};
}