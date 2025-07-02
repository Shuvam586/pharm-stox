import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { addVendor } from "@/services/vendors";

function VendorNew() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phon, setPhon] = useState('');
    const [adrs, setAdrs] = useState('');

    const handleCreate = async () => {
        await addVendor({ name:name, email:email, phone:phon, address:adrs });
        setName('');
        setEmail('');
        setPhon('');
        setAdrs('');
    }

    return (
        <div className="w-screen h-screen grid place-items-center">
            <div className="w-1/6">

                <h1 className="text-3xl font-bold mb-10">Add Vendor</h1>

                <div className="my-4 flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Vendor Pharma" type="text" required />
                </div>

                <div className="my-4 flex flex-col gap-2">
                    <Label>E-mail</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vendor@company.com" type="text" />
                </div>

                <div className="my-4 flex flex-col gap-2">
                    <Label>Phone</Label>
                    <Input value={phon} onChange={(e) => setPhon(e.target.value)} placeholder="Phone" type="text" />
                </div>

                <div className="my-4 flex flex-col gap-2">
                    <Label>Address</Label>
                    <Input value={adrs} onChange={(e) => setAdrs(e.target.value)} placeholder="Address" type="text" />
                </div>


                <Button onClick={handleCreate}>Create Item</Button>

            </div>
        </div>
    )
}

export default VendorNew;