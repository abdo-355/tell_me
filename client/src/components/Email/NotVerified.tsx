import { useContext } from "react";

import authContext from "../../context/auth-context";
import useAxios from "../../hooks/use-axios";
import LoadingSpinner from "../UI/LoadingSpinner";

const NotVerified = () => {
    const { token } = useContext(authContext)
    const { request, loading } = useAxios(`${process.env.REACT_APP_BACKEND}/auth/resend-email`, "post", { token })

    const handleClick = () => {
        request()
    }

    return <div className="mx-0 sm:mx-5 my-7 flex flex-col justify-center items-center">
        <h2 className="font-roboto text-4xl uppercase font-bold tracking-wider text-green-900 mb-10">Email not verified</h2>
        <button onClick={handleClick} className="bg-green-800 text-white w-40 sm:w-80 h-7 sm:h-10 mx-5 text-lg sm:text-xl rounded-full">{loading ? <LoadingSpinner /> : "Re-send verification email"}</button>
    </div>
}

export default NotVerified;