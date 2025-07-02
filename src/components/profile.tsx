import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { userInfo } from "@/services/auth";

// TODO: complete this as a widget 

function Profile() {

    // const [data, setData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const { data : { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.log(error, "gnaar mereche");
            } else {
                await userInfo({ uid: (user!.id) })
                // console.log(user);
            }
        }

        fetchData();
    }, [])

    return (
        <div>
            <p>lmaolmao</p>
        </div>
    )
}

export default Profile;