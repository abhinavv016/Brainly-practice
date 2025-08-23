import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { ContentMapping } from "../components/ContentMapping";

interface allContent {
    _id: string,
    title: string,
    type: string,
    link: string
}
export function RedditPage(){
    const [contents, setContents] = useState<allContent[]>([]);

    const fetchContent = async () => {
        const res = await axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        const data = Array.isArray(res.data) ? res.data : (res.data as any).content
        const reddit = data.filter((c: allContent)=> c.type?.toLowerCase() === "reddit");
        setContents(reddit);
    }
    useEffect(() => {
        fetchContent()
    }, [])
    return <div>
        <Sidebar/>
        <ContentMapping contents={contents} refresh={fetchContent}/>
    </div>
}