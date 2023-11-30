// import bgimg from "../../assets/banner1.jpg"
import Container from "../../../Component/Container/Container";
import bgimg2 from "../../../assets/banner2.jpg"

const Banner = () => {
    return (
        <div style={{ backgroundImage: `url(${bgimg2})` }} className="relative lg:min-h-[90vh] bg-cover bg-no-repeat	bg-center items-center flex justify-between w-ful mx-auto">
            {/* <div className="absolute hero-overlay bg-opacity-40 z-0"></div> */}
            <Container>
                <div className="flex flex-col items-center text-white  space-y-5 font-normal md:py-24 bg-black bg-opacity-50 z-40">
                    <h1 className="text-5xl font-bold">UniFoodHubs Fresh Culinary Perspectives</h1>
                    <p className="md:max-w-4xl text-center">Redefining dining with Fresh Culinary Perspectives, blending global influences, seasonal surprises, and locally sourced ingredients for an innovative and trendsetting experience.</p>

                    <form className="w-1/3">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm outline-none rounded-lg bg-slate-300 bg-opacity-80 " placeholder="Search Mockups, Logos..." required/>
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>

                </div>
            </Container>
        </div>
    );
};

export default Banner;