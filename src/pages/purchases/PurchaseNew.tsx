import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { format } from "date-fns"
import PurchaseSelectItem from "@/components/purchaseSelectItem";
import { addPurchase } from "@/services/purchases";
import { Check, ChevronsUpDown, Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"



const vendors = [
    {
        id: "2202781c-3218-4de9-ac91-62028c793746",
        organization_id: "798a614e-a164-4a2d-bb3f-d347ae3bfffe",
        name: "Crazy Meds",
        email: "ayay@crazymeds.com",
        phone: "1234567890",
        address: "damb road, kolkata",
        created_at: "2025-07-02T02:39:44.396711"
    },
    {
        id: "a0e8db87-56bb-4600-a4a1-09d57113121d",
        organization_id: "798a614e-a164-4a2d-bb3f-d347ae3bfffe",
        name: "example",
        email: "example@lmao.com",
        phone: "1245673456",
        address: "good one road",
        created_at: "2025-07-02T02:47:38.22359"
    }
]

function PurchaseNew() {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const [date, setDate] = useState<Date>()

    const handleCreate = async () => {
        // await addPurchase({ name:name, desc:desc, bu:bsun, iu:inun, unpp, nrco });
    
    }

    return (
        <div className="w-screen h-screen grid place-items-center">
            <div className="w-9/10">

                <h1 className="text-3xl font-bold mb-10">New Purchase Order</h1>

                <div className="my-4 grid grid-cols-[2fr_1fr] gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Vendor</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {value
                                        ? vendors.find((vendor) => vendor.id === value)?.name
                                        : "Select vendor..."}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search vendor..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No vendor found.</CommandEmpty>
                                        <CommandGroup>
                                            {vendors.map((vendor) => (
                                                <CommandItem
                                                    key={vendor.name}
                                                    value={`${vendor.name}|||${vendor.id}`}

                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue.split('|||')[1] === value ? "" : currentValue.split('|||')[1])
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {vendor.name}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            value === vendor.id ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Label>Order Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    data-empty={!date}
                                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="my-6 gap-2 flex flex-col">
                    <div className="grid gap-3 grid-cols-[2fr_1fr_1fr_1fr_0.5fr_0.5fr_0.5fr_0.65fr_1fr_1fr]">
                        <Label className="pl-1.5">Product Name</Label>
                        <Label className="pl-1.5">Batch ID</Label>
                        <Label className="pl-1.5">HSN</Label>
                        <Label className="pl-1.5">Expiry Date</Label>
                        <Label className="pl-1.5">Quantity</Label>
                        <Label className="pl-1.5">SGST</Label>
                        <Label className="pl-1.5">CGST</Label>
                        <Label className="pl-1.5">Discount</Label>
                        <Label className="pl-1.5">MRP</Label>
                        <Label className="pl-1.5">Amount</Label>
                    </div>
                    <div className="flex flex-col gap-3">
                        <PurchaseSelectItem />
                        <PurchaseSelectItem />

                        <PurchaseSelectItem />

                        <PurchaseSelectItem />

                    </div>
                </div>
                
                <div className="h-[75px] w-full grid mb-6 place-items-center border-dotted border-2 rounded-2xl">
                    <Button variant='secondary' className="w-min px-10">Add Item</Button>
                </div>

                <Button onClick={handleCreate}>Create Purchase Order</Button>

            </div>
        </div>
    )

}

export default PurchaseNew;
