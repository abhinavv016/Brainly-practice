import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import toast,{ Toaster } from "react-hot-toast";

export function Signin(){

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
            })
            const jwt = (response.data as any).token
            localStorage.setItem("token", jwt);
            toast.success((response.data as any).message)
            setTimeout(() => navigate("/dashboard"), 3000); 
        }catch(err: any){
            if(err.response){
                toast.error(err.response.data.message)
            }
            else{
                toast.error("Something went wrong. Please try again.")
            }
        }
    }
    return <div className="h-screen w-screen flex justify-center bg-gray-200 items-center">
        <Toaster position="top-center" />
            <div className="bg-white rounded-md border min-w-48 p-8">
                <Input ref={usernameRef} placeholder="Username"/>
                <Input ref={passwordRef} placeholder="Password"/>
                <div className="flex font-bold justify-center cursor-pointer" onClick={() => navigate("/signup")}>
                    Didn't have an account?
                </div>
                <div className="flex justify-center pt-4">
                    <Button onClick={signin} variant="primary" text="Signin"/>
                </div>
            </div>
        </div>
}