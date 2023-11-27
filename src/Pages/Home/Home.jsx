
import Container from "../../Component/Container/Container";
import Banner from "./Banner/Banner";
import Categorytab from "./CategoryTab/Categorytab";
import Exprence from "./Expreance/Exprence";
import exp_bg from "../../assets/Process-bg.png"
const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <div style={{ backgroundImage: `url(${"https://i.ibb.co/PMtJbXx/ctgbg.jpg"})` }} className="bg-no-repeat py-16 bg-fixed bg-center bg-cover">
                <Container>
                    <Categorytab></Categorytab>
                </Container>
            </div>
            <div style={{ backgroundImage: `url(${exp_bg})` }} className="bg-no-repeat bg-center bg-cover">
                <Container>
                    <Exprence></Exprence>
                </Container>
            </div>
        </div>
    );
};

export default Home;