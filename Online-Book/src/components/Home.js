import AboutUs from "./AboutUs";
import Homepage from "./HomePage";
import Footer from "./Footer";
import BookList from "./BooksList";
import Feedback from "./Feedback";

function Home() {
    return (
        <>
            <Homepage />
            <BookList/>
            <AboutUs />
            <Feedback/>
            <Footer />
        </>
    );
}
export default Home;