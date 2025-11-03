import { ReactComponent as FacebookLogo } from "../../../assets/facebook_icon.svg"

const FacebookButton: React.FC<{ mode: "Log in" | "Sign up" }> = ({ mode }) => {
    return <a href={process.env.REACT_APP_BACKEND + "/api/auth/facebook"} className={`${mode === "Sign up" ? "w-full md:w-5/12" : "w-full"} relative flex justify-end xsm:justify-center items-center py-3 my-3 bg-fb-blue hover:bg-fb-blue-darker shadow-md hover:shadow-lg focus:outline-none focus:shadow-outline-gray transition-all active:scale-95 rounded-2xl`}>
        <FacebookLogo className={`${mode === "Sign up" ? "inline-block md:relative md:left-0 absolute left-4" : "absolute left-4"} w-9 h-9 -my-5 mr-2`} />
        <span className="inline-block relative text-white font-semibold right-2 xsm:right-0">{mode} with Facebook</span>
    </a>
}

export default FacebookButton;