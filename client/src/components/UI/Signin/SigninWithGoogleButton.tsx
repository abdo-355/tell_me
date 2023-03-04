import { ReactComponent as GoogleLogo } from "../../../assets/google_icon.svg"

const SigninWithGoogleButton = () => {
    return <a href={process.env.REACT_APP_BACKEND + "/auth/google"} className="flex justify-center items-center w-fit p-5 bg-white shadow-md hover:shadow-lg focus:outline-none focus:shadow-outline-gray transition-all active:scale-95 rounded-2xl">
        <GoogleLogo className="inline-block w-12 h-12 -my-5" />
        <span className="inline-block text-gray-700 font-semibold text-lg">Continue with Google</span>
    </a>
}

export default SigninWithGoogleButton;