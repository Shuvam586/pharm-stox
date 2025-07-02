import { supabase } from "@/lib/supabaseClient";

type userInfo = {
    uid: string,
    uname: string,
    uemail: string,
    uoid: string
}

export async function insertNewUser({ uid, uname, uemail, uoid }: userInfo) {
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

export async function orgCheck({ oid }: { oid: string }) {
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

export async function userInfo({ uid }: { uid: string }) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uid)
        // .single()
        .maybeSingle()

    // console.log('data uid ', data);
    // console.log('error uid ', error);

    if (error) {
        console.log(error);
    } else if (data) {
        console.log(data);
        return true;
    } else {
        console.log(data, error, "kelo koreche")
        return false;
    }
}

export async function orgFetcher() {
    const { data, error } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', ((await supabase.auth.getUser()).data.user?.id)!)
        .maybeSingle()

    if (error) {
        return error;
    } else {
        return data?.organization_id;
    }
}