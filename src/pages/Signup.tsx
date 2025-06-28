import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertNewUser, orgCheck } from "@/services/auth";
import { supabase } from "@/lib/supabaseClient";

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [oid, setOid] = useState('');

    const [errText, setErrtext] = useState('');

    const navigate = useNavigate();

    const handleSignup = async () => {
        if (await orgCheck({ oid })) {
            await supabase.auth.signOut();
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setErrtext(error.message);
                setTimeout(() => {
                    setErrtext('')
                }, 5000);
                setEmail('');
                setPassword('');
                setName('');
                setOid('');
            } else {
                insertNewUser({ uid:data.user!.id, uname: name, uemail: email, uoid: oid })
                navigate('/dashboard');
            }
        } else {
                setErrtext('Invalid Organization ID');
                setTimeout(() => {
                    setErrtext('')
                }, 5000);
                setEmail('');
                setPassword('');
                setName('');
                setOid('');
        }

    }

    return (

        <div className="w-screen h-screen grid place-items-center">
            <div className="p-3 flex flex-col w-1/6 gap-2">
                <div className="my-1 flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input placeholder="John Doe" type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="my-1 flex flex-col gap-2">
                    <Label>Organization ID</Label>
                    <Input placeholder="org id" type="text" onChange={(e) => setOid(e.target.value)} value={oid} />
                </div>
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
                    <Button onClick={handleSignup}>Sign Up</Button>
                </div>
            </div>
        </div>

    )
}

export default Signup;