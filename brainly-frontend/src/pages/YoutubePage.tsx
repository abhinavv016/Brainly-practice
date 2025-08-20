import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { ContentMapping } from "../components/ContentMapping";
import { useContent } from "../hooks/useContent";

interface allContent {
    _id: string,
    title: string,
    type: string,
    link: string
}
export function YoutubePage(){
    const [contents, setContents] = useState<allContent[]>([]);
    const { refresh } = useContent();

    useEffect(() => {
        async function fetchContent(){
            refresh();
            const res = await axios.get(`${BACKEND_URL}/api/v1/content`,{
                headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
            })
            const data = Array.isArray(res.data) ? res.data : (res.data as any).content
            const youtube = data.filter((c: allContent)=> c.type?.toLowerCase() === "youtube");
            setContents(youtube);
        }
        fetchContent()
    },[]);
    return <div>
        <Sidebar/>
        <ContentMapping contents={contents}/>
    </div>
}