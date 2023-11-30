import exp from "../../../assets/extra-img.png"
import { MdPinDrop } from "react-icons/md";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { MdPayments } from "react-icons/md";


const Exprence = () => {
    return (
        <div className="md:flex items-center gap-8 p-4">
            <div className="md:w-1/2 p-10">
                <img src={exp} alt="" />
            </div>
            <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white">The Process of Crafting your Dining Experience</h2>
                <div className="md:w-9/12 space-y-6">
                    <div className="flex items-center gap-4 bg-[#0d1634] p-3 rounded-xl">
                        <p className="text-4xl p-4 text-white bg-[#262e49] rounded-xl"><MdPinDrop /></p>
                        <div className="">
                            <h3 className="text-xl text-white font-bold">Set your location</h3>
                            <p className="text-[#73798a]">A high quality solution beautifully food for customers</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#0d1634] p-3 rounded-xl">
                        <p className="text-4xl p-4 text-white bg-[#262e49] rounded-xl"><BiSolidSelectMultiple /></p>
                        <div className="">
                            <h3 className="text-xl text-white font-bold">Select Food</h3>
                            <p className="text-[#73798a]">Allowing customers to easily book tables through</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#0d1634] p-3 rounded-xl">
                        <p className="text-4xl p-4 text-white bg-[#262e49] rounded-xl"><MdPayments /></p>
                        <div className="">
                            <h3 className="text-xl text-white font-bold">Pay Cash or Online</h3>
                            <p className="text-[#73798a]">Providing an upscale and elegant ambiance for ...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exprence;