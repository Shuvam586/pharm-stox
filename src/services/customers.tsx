import { supabase } from "@/lib/supabaseClient";
import { orgFetcher } from "./auth";

type customerInfo = {
    name: string,
    email: string,
    phone: string,
    address: string
}

export async function addCustomer({ name, email, phone, address }: customerInfo) {

    const { data, error } = await supabase
        .from('customers')
        .insert({
            organization_id: await orgFetcher(),
            name: name,
            email: email,
            phone: phone,
            address: address
        })

    if (error) {
        console.log(error);
        return error;
    } else {
        console.log(data);
    }

}

export async function fetchCustomers() {
    const { data, error } = await supabase
        .from('customers')
        .select('*')

    if (error) {
        console.log(error);
    } else {
        console.log(data[0]);
        return data;
    }
}