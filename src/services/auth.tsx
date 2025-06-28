import { supabase } from "@/lib/supabaseClient";

type userInfo = {
    uid: string,
    uname: string,
    uemail: string,
    uoid: string
}

export async function insertNewUser({ uid, uname, uemail, uoid } : userInfo) {
    const { error } = await supabase
        .from('users')
        .insert({
            id: uid,
            organization_id: uoid,
            name: uname,
            email: uemail,
            role: 'staff',
        })

    if (error) {
        console.log(error);
    }
} 

export async function orgCheck({ oid } : { oid: string }) {
    const { data, error } = await supabase
        .from('organizations')
        .select('id')
        .eq('id', oid)
        // .single()
        .maybeSingle()
    
    console.log('data oid ', data);
    console.log('error oid ', error);

    if (error) {
        console.log(error);
        return false;
    } else if (data) {
        return true;
    } else {
        return false;
    }
}