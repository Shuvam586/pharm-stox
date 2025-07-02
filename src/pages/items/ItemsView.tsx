import { fetchItems } from "@/services/items";
import { useEffect, useState } from "react";

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

function ItemsView() {

    const [data, setData] = useState<itemInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setData((await fetchItems()) ?? [])
        }

        fetchData();
    }, [])

    if (data) {
        return (
            <div>
                {
                    data.map((d) => (
                        <div className="my-5">
                            <p>{d.name}</p>
                            <p>{d.description}</p>
                            <p>{d.narcotic? "Narcotic" : "Not Narcotic"}</p>
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return (
            <p>trolled?</p>
        )
    }

}

export default ItemsView;