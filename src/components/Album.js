import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import "../assets/Album.css";
import { Link } from "react-router-dom";

function Album() {
  const [photosData, setPhotosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 15;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosCollection = collection(firestore, "photos");
        const photosSnapshot = await getDocs(photosCollection);

        const photosData = photosSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.timestamp - a.timestamp);

        setPhotosData(photosData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchPhotos();
  }, []);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photosData.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const renderCards = () => {
    return currentPhotos.map((item) => (
      <div key={item.id} className="col-md-3 col-lg-4 mb-4">
        <Link to={`/PhotoDetails/${item.id}`}>
          <div className="card">
            <img
              src={item.imageURL}
              className="card-img-top"
              alt={item.caption}
            />
            <div className="card-body">
              {/* <p style={{color:"black"}}>{item.caption}</p> */}
            </div>
          </div>
        </Link>
        {/* <div className="like-icon">
          <i className="bx bxs-like"></i>
        </div> */}
      </div>
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(photosData.length / photosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container album-container">
      <div
        style={{ border: "2px solid #0157b4", padding: 18, borderRadius: 12 }}
      >
        <h1
          className="album-h1"
          style={{
            color: "#fff",
            border: "2px solid #00254d",
            padding: "3px",
            borderRadius: 8,
            textAlign: "center",
            marginBottom: 0,
            backgroundColor: "#00254d",
          }}
        >
          Your shared Shots!
        </h1>
        {loading ? (
          <div className="text-center mt-4">
            <i className="bx bx-loader bx-spin" />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="row" style={{ marginTop: 20 }}>
              {renderCards()}
            </div>
            <ul className="pagination mb-1">
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <Link
                    onClick={() => paginate(number)}
                    to="#"
                    className="page-link"
                  >
                    {number}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Album;
