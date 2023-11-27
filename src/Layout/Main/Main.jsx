import { Outlet } from "react-router-dom";
import Navbar from "../../Shered/Navbar/Navbar";
import Footer from "../../Shered/Footer/Footer";
import footerbg from "../../assets/footer-bg.png"
import Container from "../../Component/Container/Container";


const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <div style={{ backgroundImage: `url(${footerbg})` }} className="bg-no-repeat bg-center bg-cover py-10">
                <Container>
                    <Footer></Footer>
                </Container>
            </div>
        </div>
    );
};

export default Main;