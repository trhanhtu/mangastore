import backgroundPictures from '../../assets/images/background.jpg';
import { ENDPOINTS } from "../../constrants/webInfo";
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";

const LoginPage = () => {
    const handleGoogleLogin = () => {
        window.location.href = ENDPOINTS.GOOGLE_AUTH_ENPOINT;
    };

    return (
        <DefaultLayoutUser>
            <div
                className="text-white h-[100vh] flex justify-center items-center bg-cover"
                style={{ backgroundImage: `url(${backgroundPictures})` }}
            >
                <div className="w-[400px] bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-xl rounded-2xl p-10 shadow-2xl shadow-black text-center">
                    <h1 className="text-4xl font-semibold mb-8">Đăng nhập</h1>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full h-[50px] bg-white text-gray-800 font-bold rounded-full shadow-lg hover:bg-gray-200 flex items-center justify-center transition-all duration-300 ease-in-out"
                    >
                        <i className="fa-brands fa-google mr-3 text-xl text-[#db0000]" ></i>
                        <span>Đăng nhập với Google</span>
                    </button>
                </div>
            </div>
        </DefaultLayoutUser>
    );
}

export default LoginPage;
