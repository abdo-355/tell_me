import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import styles from "./styles.module.css";

const NotFound = () => {
    return <div className="flex h-screen bg-white bg-opacity-40 items-center justify-center">
        <div className={`absolute inset-0 -z-10 ${styles.background} h-screen flex justify-center items-center`}></div>
        <div className="flex flex-col items-center justify-center mx-5">
            <span className="text-9xl xsm:text-[12rem] font-roboto text-green-800 leading-none">404</span>
            <span className="block text-2xl xsm:text-3xl sm:text-4xl font-roboto font-semibold text-gray-600 pb-3 mt-5">Page not found</span>
            <span className="block text-base xsm:text-lg font-semibold font-roboto text-gray-800 text-center">Oops! The page you are looking for does not exist. It might have been moved or deleted.</span>
            <Link to="/" className="mt-12 bg-gray-900 hover:bg-gray-700 transition-all text-white p-4 text-lg xsm:text-1xl rounded-lg">
                Back to home <ArrowUpRightIcon className="inline w-[1.2rem]" />
            </Link>
        </div>
    </div>
}

export default NotFound;