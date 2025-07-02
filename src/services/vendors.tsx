import { supabase } from "@/lib/supabaseClient";
import { orgFetcher } from "./auth";

type vendorInfo = {
    name: string,
    email: string,
    phone: string,
    address: string
}

export async function addVendor({ name, email, phone, address }: vendorInfo) {

    const { data, error } = await supabase
        .from('vendors')
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

export async function fetchVendors() {
    const { data, error } = await supabase
        .from('vendors')
        .select('*')

    if (error) {
        console.log(error);
    } else {
        console.log(data[0]);
        return data;
    }
}