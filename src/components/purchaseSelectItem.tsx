import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "./ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"
import { fetchItems } from "@/services/items";
import { Input } from "./ui/input";

type itemInfo = {
    id: string,
    organization_id: string,
    name: string,
    description: string,
    base_unit: string,
    inventory_unit: string,
    units_per_inventory: number,
    created_at: string,
    narcotic: boolean
}

function PurchaseSelectItem() {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const [medList, setMedList] = useState<itemInfo[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setMedList((await fetchItems()) ?? [])
        }
        fetchData();
    }, [])

    return (
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_0.5fr_0.5fr_0.5fr_0.65fr_1fr_1fr] gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? medList.find((med) => med.id === value)?.name
                            : "Select item..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search item..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No items found.</CommandEmpty>
                            <CommandGroup>
                                {medList.map((med) => (
                                    <CommandItem
                                        key={med.name}
                                        value={`${med.name}|||${med.id}`}

                                        onSelect={(currentValue) => {
                                            setValue(currentValue.split('|||')[1] === value ? "" : currentValue.split('|||')[1])
                                            setOpen(false)
                                        }}
                                    >
                                        {med.name}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === med.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Input type="text" placeholder="Batch ID" />
            <Input type="text" placeholder="HSN" />
            <Input type="text" placeholder="Expiry MM/YY"/>
            <Input type="text" placeholder="Qty" />
            <Input type="text" placeholder="SGST %" />
            <Input type="text" placeholder="CGST %" />
            <Input type="text" placeholder="Discount%" />
            <Input type="text" placeholder="MRP" />
            <Input disabled type="text" placeholder="Amount" />
        </div>
    );
}

export default PurchaseSelectItem;