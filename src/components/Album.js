import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import '../assets/Album.css';
function Album() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 15; // Adjust the number of photos per page as needed

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosCollection = collection(firestore, 'photos');
        const photosSnapshot = await getDocs(photosCollection);
        const photosData = photosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const renderCards = () => {
    return currentPhotos.map((photo) => (
      <div key={photo.id} className="col-md-3 mb-6 col-lg-4 mb-4">
        <div className="card">
          <img src={photo.imageURL} className="card-img-top" alt={photo.caption} />
          <div className="card-body">
            {/* <h5 className="card-title">{photo.author}</h5> */}
            {/* <p className="card-text">{photo.caption}</p> */}
            {/* <a href="#" className="btn btn-primary">
              Go somewhere
            </a> */}
            {/* MODAL GOES HERE */}
          </div>
        </div>
      </div>
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(photos.length / photosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container album-container mt-5 ">
        <h1 className='album-h1'>Your shared Shots!</h1>
        <hr />
      <div className="row">
        {renderCards()}
      </div>
      <ul className="pagination mb-4" >
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Album;
