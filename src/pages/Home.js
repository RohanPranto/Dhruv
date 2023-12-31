import React, { useEffect, useState } from "react";
import "../assets/Home.css";
import Album from "../components/Album";
import About from "../components/About";
import Contact from "../components/Contact";
import home from "../assets/home.jpg";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

function Home() {
  const [currentImage, setCurrentImage] = useState(null); // State for image source
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const photoCollection = collection(firestore, "photos");
        const photosSnapshot = await getDocs(photoCollection);
        const randomPhoto =
          photosSnapshot.docs[
            Math.floor(Math.random() * photosSnapshot.size)
          ];
        const photoData = randomPhoto.data();

        // Trigger fade-out effect
        setFadeIn(false);

        // Wait for the fade-out transition to complete
        setTimeout(() => {
          // Set the new image and trigger fade-in effect
          setCurrentImage(photoData.imageURL);
          setFadeIn(true);
        }, 500); // Adjust the delay based on your transition duration
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    // Fetch a random image initially
    fetchRandomImage();

    // Set interval to fetch a new random image every 5 seconds
    const intervalId = setInterval(() => fetchRandomImage(), 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="container home">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center">
            <div>
              <h1 className="text-left">
                Loved by{" "}
                <span
                  style={{
                    color: "#0157b4",
                    border: "2px solid #0157b4",
                    padding: "3px",
                    borderRadius: 8,
                  }}
                >
                  Photographers
                </span>
                <br />
                Built for{" "}
                <span
                  style={{
                    color: "#0157b4",
                    border: "2px solid #0157b4",
                    padding: "3px",
                    borderRadius: 8,
                  }}
                >
                  Photographers
                </span>
              </h1>
              <p className="pt-3">
                Immerse yourself in a community loved by shutterbugs, designed
                exclusively for photo enthusiasts. Explore, share, and elevate
                your visual storytelling journey – where every shot finds its
                spotlight.
              </p>
              <div className="d-flex">
                <button>
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/upload"
                  >
                    Upload Photo
                  </Link>
                </button>
                <a style={{ textDecoration: "none" }} href="#aboout">
                  <p
                    style={{ marginBottom: 0, paddingTop: 7, fontSize: "1.2em" }}
                  >
                    learn more<i className="bx bx-right-arrow-alt"></i>
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className={`image-container ${fadeIn ? "fade-in" : "fade-out"}`}
              style={{
                padding: 14,
                border: "2px solid #0157b4",
                borderRadius: "10px",
              }}
            >
              <img
                className="img-fluid"
                style={{
                  borderRadius: "8px",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                }}
                src={currentImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <Album /> <br />
      <section id="aboout">
        <About />
      </section>
      <Contact />
    </div>
  );
} 

export default Home;
