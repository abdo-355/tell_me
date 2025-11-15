import { useSignIn, useSignUp } from "@clerk/clerk-react";

const FacebookButton: React.FC<{ mode: "Log in" | "Sign up" }> = ({ mode }) => {
    const { signIn } = useSignIn();

    const handleClick = () => {
        signIn?.authenticateWithRedirect({
            strategy: 'oauth_facebook',
            redirectUrl: '/auth/login',
            redirectUrlComplete: mode === "Log in" ? '/messages' : '/',
        });
    };

    return <button onClick={handleClick} className="w-full h-11 sm:h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-gray-50 active:bg-gray-100">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">{mode} with Facebook</span>
        <span className="text-sm font-medium text-gray-700 sm:hidden">{mode}</span>
    </button>
}

export default FacebookButton;