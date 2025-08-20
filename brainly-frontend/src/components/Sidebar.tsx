import { BrainIcon } from "../icons/BrainIcon";
import { RedditIcon } from "../icons/RedditIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { UniverseIcon } from "../icons/UniverseIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { Button } from "./Button";
import { SidebarItems } from "./SidebarItems";
import { LogoutIcon } from "../icons/LogoutIcon"
import { useNavigate } from "react-router-dom";

export function Sidebar(){
    const navigate = useNavigate();;
    return <div className="h-screen bg-white w-72 top-0 left-0 border-r fixed">
        <div className="flex items-center font-bold text-2xl pt-8 pl-6 ">
            <div className="text-purple-600">
                <BrainIcon size={30}/>
            </div> 
            <div className="pl-5">
                 Brainly
            </div>
        </div>
        <div>
            <div className="pl-6 pt-6">
            
            <SidebarItems icon={<UniverseIcon/>} text={"Universe"}/>
            <SidebarItems icon={<YouTubeIcon/>} text={"Youtube"} />
            <SidebarItems icon={<RedditIcon/>} text={"Reddit"}/>
            <SidebarItems icon={<TwitterIcon/>} text={"Twitter"}/>
            
            </div>
            <div className="flex align-bottom justify-center absolute bottom-6 w-72">
                <Button onClick={
                    () => {
                        localStorage.clear();
                        navigate("/signin");
                        alert("You're logged out")
                    }
                } 
                variant="primary" 
                text="Logout" 
                startIcon={<LogoutIcon/>}/>
            </div>
        </div>
        
    </div>
}