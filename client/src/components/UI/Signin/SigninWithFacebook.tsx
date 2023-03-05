import { ReactComponent as FacebookLogo } from "../../../assets/facebook_icon.svg"

const SigninWithFacebook = () => {
    return <a href={process.env.REACT_APP_BACKEND + "/auth/facebook"} className="flex justify-center items-center w-2/5 py-3 bg-fb-blue hover:bg-fb-blue-darker shadow-md hover:shadow-lg focus:outline-none focus:shadow-outline-gray transition-all active:scale-95 rounded-2xl">
        <FacebookLogo className="inline-block w-9 h-9 -my-5 mr-2" />
        <span className="inline-block text-white font-semibold">Signin with Facebook</span>
    </a>
}

export default SigninWithFacebook;