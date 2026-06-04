import "./App.css";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Brands from "./Brands";
import Collections from "./Collections";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
function App() {
  return (
    <>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <Navbar />
      <Hero />
      <Brands />
      <Collections />
      <Testimonials />
      <Footer />
    </>
  );
}

export default App;