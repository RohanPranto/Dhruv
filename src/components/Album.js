import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import '../assets/Album.css';
import { Link } from 'react-router-dom';

function Album() {
  const [photosData, setPhotosData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 15;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosCollection = collection(firestore, 'photos');
        const photosSnapshot = await getDocs(photosCollection);
    
        const photosData = photosSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.timestamp - a.timestamp);
    
        setPhotosData(photosData);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photosData.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const renderCards = () => {
    return currentPhotos.map((photo) => (
      <div key={photo.id} className="col-md-3 mb-6 col-lg-4 mb-4">
        <Link to={`/photos/${photo.id}`}>
          <div className="card">
            <img src={photo.imageURL} className="card-img-top" alt={photo.caption} />
            <div className="card-body">
              {/* Additional details if needed */}
            </div>
          </div>
        </Link>
      </div>
    ));
  };
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(photosData.length / photosPerPage); i++) {
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
            <Link onClick={() => paginate(number)} to="#" className="page-link">
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Album;
