import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errText, setErrtext] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        await supabase.auth.signOut();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setErrtext(error.message);
            setTimeout(() => {
                setErrtext('')
            }, 5000);
            setEmail('');
            setPassword('');
        } else {
            navigate('/dashboard');
        }
    }

    return (

        <div className="w-screen h-screen grid place-items-center">
            <div className="p-3 flex flex-col w-1/6 gap-2">
                <div className="my-1 flex flex-col gap-2">
                    <Label>E-Mail</Label>
                    <Input placeholder="person@example.com" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="my-1 flex flex-col gap-2">
                    <Label>Password</Label>
                    <Input placeholder="thisisapassword" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>

                <Label className="text-sm text-red-400">
                    {errText}
                </Label>

                <div className="buttons-div grid w-full grid-cols-3 gap-2 mt-1">
                    <Button onClick={handleLogin}>Login</Button>
                </div>
            </div>
        </div>

    )
}

export default Login;