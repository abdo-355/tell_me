import { ReactComponent as GoogleLogo } from "../../../assets/google_icon.svg"

const GoogleButton: React.FC<{ mode: "Log in" | "Sign up" }> = ({ mode }) => {
    return <a href={process.env.REACT_APP_BACKEND + "/auth/google"} className={`${mode === "Sign up" ? "w-full md:w-5/12" : "w-full"} relative flex justify-end xsm:justify-center items-center py-3 px-2 bg-white hover:bg-gray-100 shadow-md hover:shadow-lg focus:outline-none focus:shadow-outline-gray transition-all active:scale-95 rounded-2xl`}>
        <GoogleLogo className={`${mode === "Sign up" ? "inline-block md:relative md:left-0 absolute left-4" : "absolute left-4"} w-10 h-10 -my-5`} />
        <span className="inline-block relative text-gray-700 font-semibold right-2 xsm:right-0">{mode} with Google</span>
    </a>
}

export default GoogleButton;