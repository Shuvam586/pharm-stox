import { supabase } from "@/lib/supabaseClient";
import { orgFetcher } from "./auth";

type purchaseInfo = {
    vendor: string,
    od: string,
    amt: string,
}

export async function addPurchase({ vendor, od, amt }: purchaseInfo) {

    const { data, error } = await supabase
        .from('items')
        .insert({
            organization_id: await orgFetcher(),
            vendor_id: vendor,
            user_id: (await supabase.auth.getUser()).data.user?.id,
            order_date: od,
            total_amount: amt
        })

    if (error) {
        console.log(error);
        return error;
    } else {
        console.log(data);
    }

}

export async function fetchPurchases() {
    const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')

    if (error) {
        console.log(error);
    } else {
        console.log(data[0]);
        return data;
    }
}