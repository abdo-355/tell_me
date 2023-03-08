import { ReactComponent as GoogleLogo } from "../../../assets/google_icon.svg"

const GoogleButton: React.FC<{ mode: "Log in" | "Sign up" }> = ({ mode }) => {
    return <a href={process.env.REACT_APP_BACKEND + "/auth/google"} className="relative flex justify-center items-center w-full py-3 px-2 bg-white hover:bg-gray-100 shadow-md hover:shadow-lg focus:outline-none focus:shadow-outline-gray transition-all active:scale-95 rounded-2xl">
        <GoogleLogo className="absolute left-4 w-10 h-10 -my-5" />
        <span className="inline-block text-gray-700 font-semibold">{mode} with Google</span>
    </a>
}

export default GoogleButton;