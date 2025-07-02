import { fetchVendors } from "@/services/vendors";
import { useEffect, useState } from "react";

type vendorInfo = {
    id: string,
    organization_id: string,
    name: string,
    email: string,
    phone: string,
    address: string
}

function VendorsView() {

    const [data, setData] = useState<vendorInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setData((await fetchVendors()) ?? [])
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
                            <p>{d.address}</p>
                            <p>{d.phone}</p>
                            <p>{d.email}</p>
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

export default VendorsView;