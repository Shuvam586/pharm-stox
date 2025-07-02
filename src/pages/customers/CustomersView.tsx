import { fetchCustomers } from "@/services/customers";
import { useEffect, useState } from "react";

type customerInfo = {
    id: string,
    organization_id: string,
    name: string,
    email: string,
    phone: string,
    address: string
}

function CustomersView() {

    const [data, setData] = useState<customerInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setData((await fetchCustomers()) ?? [])
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

export default CustomersView;