import { ReactComponent as FacebookLogo } from "../../../assets/facebook_icon.svg"

const FacebookButton: React.FC<{ mode: "Log in" | "Sign up" }> = ({ mode }) => {
    return <a href={process.env.REACT_APP_BACKEND + "/auth/facebook"} className="relative flex justify-center items-center w-full py-3 my-3 bg-fb-blue hover:bg-fb-blue-darker shadow-md hover:shadow-lg focus:outline-none focus:shadow-outline-gray transition-all active:scale-95 rounded-2xl">
        <FacebookLogo className="absolute left-4 w-9 h-9 -my-5 mr-2" />
        <span className="inline-block text-white font-semibold">{mode} with Facebook</span>
    </a>
}

export default FacebookButton;