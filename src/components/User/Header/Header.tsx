import NavigationBar from "./NavigationBar";
import Logo from "../../../assets/images/logo.png"
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="px-6 flex gap-6 justify-between items-center mx-4 md:mx-auto pt-6 ">
            {/* Logo */}
            <div>
                <Link to="/home">
                    <img className="w-40 rounded-lg" src={Logo} />
                </Link>
            </div>
            <div className="grow flex justify-end">
            {/* Navigation Bar */}
                <NavigationBar />
            </div>
        </div>
    )
}