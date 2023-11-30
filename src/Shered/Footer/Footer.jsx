import { Link } from "react-router-dom";
import logo from "../../assets/unifoodhub-high-resolution-logo-transparent.png"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import card1 from "../../assets/Visa.png"
import card2 from "../../assets/Mastercard.png"
import card3 from "../../assets/GooglePay.png"


const Footer = () => {
    return (
        <div className="md:flex space-y-5">
            <div className="md:w-1/3 space-y-4">
                <img className="w-40" src={logo} alt="" />
                <p className="text-white max-w-[360px]">At ReservQ, we invite you to embark on a journey of taste and delight.Our tables are more than just places.</p>
                <div className=" flex gap-4">
                    <FaFacebook className="text-4xl text-white hover:text-[#f01543] cursor-pointer"/>
                    <FaTwitter className="text-4xl text-white hover:text-[#f01543] cursor-pointer"/>
                    <FaInstagram className="text-4xl text-white hover:text-[#f01543] cursor-pointer"/>
                    <FaYoutube className="text-4xl text-white hover:text-[#f01543] cursor-pointer"/>
                </div>
            </div>
            <div className="md:w-1/3 ">
                <h3 className="text-2xl font-bold text-white">Quick Link</h3>
                <div className="flex flex-col ">
                    <Link to="/home" className="text-white font-semibold hover:text-[#f01543]">Home</Link>
                    <Link to="/meals" className="text-white font-semibold hover:text-[#f01543]">All Meals</Link>
                    <Link to="/cooming" className="text-white font-semibold hover:text-[#f01543]">UpCooming</Link>
                    <Link to="/deshbord" className="text-white font-semibold hover:text-[#f01543]">Dashbord</Link>
                </div>
            </div>
            <div className="md:w-1/3 space-y-5">
                <h3 className="text-2xl font-bold text-white ">We accept Payment methods:</h3>
                <div className="flex items-center gap-4">
                    <img src={card1} alt="" />
                    <img src={card2} alt="" />
                    <img src={card3} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Footer;