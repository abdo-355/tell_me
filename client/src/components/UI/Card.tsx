import { FC, ReactNode } from "react";

const Card: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="relative flex-auto max-w-xl w-auto h-auto -mt-10 xsm:mt-10 xsm:mb-10 overflow-visible shadow-gray-800 shadow-md rounded-xl bg-green-100">{children}</div>
}

export default Card;