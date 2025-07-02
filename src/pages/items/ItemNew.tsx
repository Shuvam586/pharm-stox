import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";

import { addItem } from "@/services/items";

function ItemNew() {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [bsun, setBsun] = useState('Unit');
    const [inun, setInun] = useState('Pack');
    const [unpp, setUnpp] = useState(10);
    const [nrco, setNrco] = useState(false);

    const handleCreate = async () => {
        await addItem({ name:name, desc:desc, bu:bsun, iu:inun, unpp, nrco });
        setName('');
        setDesc('');
    }

    return (
        <div className="w-screen h-screen grid place-items-center">
            <div className="w-1/6">

                <h1 className="text-3xl font-bold mb-10">Add Item</h1>

                <div className="my-4 flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Calpol 650" type="text" required />
                </div>

                <div className="my-4 flex flex-col gap-2">
                    <Label>Description</Label>
                    <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="very common analgesic" type="text" />
                </div>

                <div className="flex my-4 gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Base Unit</Label>
                        <Input value={bsun} onChange={(e) => setBsun(e.target.value)} placeholder="Unit" type="text" required />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Label>Inventory Unit</Label>
                        <Input value={inun} onChange={(e) => setInun(e.target.value)} placeholder="Pack" type="text" required />
                    </div>
                </div>

                <div className="flex my-4 gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Units per Pack</Label>
                        <Input value={unpp} onChange={(e) => setUnpp(Number(e.target.value))} placeholder="10" type="number" required />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Label>Narcotic</Label>
                        {/* <Select value={selectedType} onValueChange={setSelectedType}> */}
                        <Select value={String(nrco)} onValueChange={(e) => {setNrco(e==="true")}}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">True</SelectItem>
                                <SelectItem value="false">False</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button onClick={handleCreate}>Create Item</Button>

            </div>
        </div>
    )
}

export default ItemNew;