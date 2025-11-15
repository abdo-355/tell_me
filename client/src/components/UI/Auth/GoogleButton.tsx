import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { ReactComponent as GoogleLogo } from "../../../assets/google_icon.svg"

const GoogleButton: React.FC<{ mode: "Log in" | "Sign up" }> = ({ mode }) => {
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();

    const handleClick = () => {
        const auth = mode === "Log in" ? signIn : signUp;
        auth?.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/messages',
            redirectUrlComplete: '/messages',
        });
    };

    return <button onClick={handleClick} className="w-full h-11 sm:h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-gray-50 active:bg-gray-100">
        <GoogleLogo className="w-5 h-5 filter brightness-0" />
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">{mode} with Google</span>
        <span className="text-sm font-medium text-gray-700 sm:hidden">{mode}</span>
    </button>
}

export default GoogleButton;