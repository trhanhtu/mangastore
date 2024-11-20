import React from "react";
import { PiDotsThreeCircleVertical } from "react-icons/pi";

const Title = ({ children }: {children:any}) => {
    return (
        <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">{children}</h2>
            <PiDotsThreeCircleVertical className="cursor-pointer rounded-full p-1 text-4xl duration-300 hover:bg-gray-200 hover:dark:text-slate-600 " />
        </div>
    );
};

export default Title;
