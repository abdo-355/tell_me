import { Routes, Route } from "react-router-dom";

import NotVerified from "../components/Email/NotVerified";
import Card from "../components/UI/Card";
import styles from "./styles.module.css"

const Email = () => {
    return <div className={`${styles.background} h-screen relative flex justify-center items-center`}>
        <Card>
            <Routes>
                <Route path="/not-verified" element={<NotVerified />} />
            </Routes>
        </Card>
    </div>
}

export default Email;