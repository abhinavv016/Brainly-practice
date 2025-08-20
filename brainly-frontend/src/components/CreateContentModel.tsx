import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

type CreateContentModelProps = {
  open: boolean;
  onClose: () => void;
};

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Reddit = "reddit"
}

export function CreateContentModel({open, onClose}: CreateContentModelProps){
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent(){
        const title = titleRef.current?.value
        const link = linkRef.current?.value

        if (!title || !link) {
        alert("Title and link are required");
        return;
        }
        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type
        }, {
            headers:{
                "Authorization": localStorage.getItem("token") 
            }
        })
        onClose();

        } catch (error) {
            console.error("Failed to add content:", error);
            alert("Failed to add content");
        }
    }
    return <div>
        {open && <div>
            <div className="w-screen h-screen top-0 left-0 fixed bg-gray-500 opacity-60 ">
            </div>
            <div className="w-screen h-screen top-0 left-0 fixed flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white p-4 rounded">
                        <div className="flex justify-end ">
                            <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                            </div>
                        </div>
                        <div className="mx-9 mb-2 ">
                            <Input ref={titleRef} placeholder={"Title"}/>
                            <Input ref={linkRef} placeholder={"Link"}/>
                        </div>
                        <div className="flex justify-center gap-2 mb-2">
                            <Button variant={type === ContentType.Youtube ? "primary" : "secondary"} text={"Youtube"} onClick={() =>{
                                setType(ContentType.Youtube)
                            }} />
                            <Button variant={type === ContentType.Twitter ? "primary" : "secondary"} text={"Twitter"} onClick={() =>{
                                setType(ContentType.Twitter)
                            }}/>
                            <Button variant={type === ContentType.Reddit ? "primary" : "secondary"} text={"Reddit"} onClick={() =>{
                                setType(ContentType.Reddit)
                            }}/>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit"/>
                        </div>
                    </span>
                </div>
            </div> 
        </div>}
    </div>
}

