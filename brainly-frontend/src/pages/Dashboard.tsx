import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModel } from "../components/CreateContentModel"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useParams } from "react-router-dom"


export function Dashboard() {
  const { shareId } = useParams();
  const [modelOpen, setModelOpen] = useState(false);
  const { refresh, contents } = useContent();

  
  useEffect(()=>{ refresh() },[modelOpen])

  return <div>
    <div>
      <Sidebar/>
    </div> 
    <div className="ms-72 p-4 min-h-screen bg-gray-200 ">
      <CreateContentModel open={modelOpen} 
      onClose = { () => {setModelOpen(false)
      }}/>
      <div className="flex justify-end items-center gap-3">
      <Button onClick={async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
          share: "true"
        },{
          headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`  
            }
        });
        const shareUrl = `{FRONTEND_URL}/share/${(response.data as any).hash}`;
        navigator.clipboard.writeText(shareUrl)
        alert("!!Link Generated")
      }} variant="secondary" text="Share brain" startIcon={<ShareIcon/>}></Button>
      <Button onClick={()=>{setModelOpen(true)
      }} variant="primary" text="Add Content" startIcon={< PlusIcon />}></Button>
      </div>
      <br />
      <div className="flex flex-wrap items-center gap-4"> 
        {contents.map(({title, type, link, _id}) =><Card 
        _id={_id}
        title={title} 
        link={link} 
        type={type}
        />
        )}
      </div>
    </div>
  </div>
}
