import { supabase } from "@/lib/supabaseClient";
import { orgFetcher } from "./auth";

type itemInfo = {
    name: string,
    desc: string,
    bu: string,
    iu: string,
    unpp: number,
    nrco: boolean
}

export async function addItem({ name, desc, bu, iu, unpp, nrco }: itemInfo) {

    const { data, error } = await supabase
        .from('items')
        .insert({
            organization_id: await orgFetcher(),
            name: name,
            description: desc,
            base_unit: bu,
            inventory_unit: iu,
            units_per_inventory: unpp,
            narcotic: nrco
        })

    if (error) {
        console.log(error);
        return error;
    } else {
        console.log(data);
    }

}

export async function fetchItems() {
    const { data, error } = await supabase
        .from('items')
        .select('*')

    if (error) {
        console.log(error);
    } else {
        console.log(data[0]);
        return data;
    }
}