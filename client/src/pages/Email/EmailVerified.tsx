import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/UI/Card";
import styles from "../styles.module.css"

const Verified = () => {
    const navigate = useNavigate()
    return <>
        <Navbar />
        <div className={`${styles.background} h-screen relative flex justify-center items-center`}>
            <Card>
                <div className="mx-0 sm:mx-5 my-7 flex flex-col justify-center items-center ">
                    <h2 className="font-roboto text-3xl uppercase font-bold tracking-wider text-green-900 mb-8 text-center">Email Verified successfully</h2>
                    <button onClick={() => navigate("/")} className="bg-green-800 text-white w-32 sm:w-52 h-7 sm:h-10 mx-5 text-lg sm:text-xl rounded-full uppercase">continue</button>
                </div>
            </Card>
        </div>
    </>
}

export default Verified;