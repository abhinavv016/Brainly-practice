import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function SidebarItems({icon, text}: {
    icon: ReactElement;
    text: String;
    onClick?: () => void; 
})
{
    const navigate = useNavigate();

    const route = "/" + String(text).trim().toLowerCase().replace(/\s+/g, '')
    function handleClick(){
        navigate(route);
    }
    return <div className="flex items-center py-2 pl-4 cursor-pointer hover:bg-gray-200 rounded max-w-48" onClick={handleClick}>
        <div className="pr-2">
            {icon}
        </div>
        <div className="text-gray-700">
            {text}
        </div>
    </div>
}