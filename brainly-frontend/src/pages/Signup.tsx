
import { useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            username,
            password
        })
        alert("You've Signedup")
        navigate("/signin");
    }
    return <div className="h-screen w-screen flex justify-center bg-gray-200 items-center">
            <div className="bg-white rounded-md border min-w-48 p-8">
                <Input ref={usernameRef} placeholder="Username"/>
                <Input ref={passwordRef} placeholder="Password"/>
                <div className="flex font-bold justify-center cursor-pointer" onClick={() => navigate("/signin")}>
                    Already Signedup?
                </div>
                <div className="flex justify-center pt-4">
                    <Button onClick={signup} variant="primary" text="Signup"/>
                </div>
            </div>
        </div>
}