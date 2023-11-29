import React from "react";
import "../assets/Home.css";
import Album from "../components/Album";
import About from "../components/About";
import Contact from "../components/Contact";

function Home() {
  return (
    <div>
      <div className="home d-flex align-items-center justify-content-center">
        <h1 className="text-center">
          Capture the Moment,
          <br />
          Share the Magic.
        </h1>
      </div>
      <Album />
      <About />
      <Contact />
    </div>
  );
}

export default Home;
