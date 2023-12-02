import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

function PhotoDetails() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const photoDoc = doc(firestore, 'photos', photoId);
        const photoSnapshot = await getDoc(photoDoc);

        if (photoSnapshot.exists()) {
          setPhoto({ id: photoSnapshot.id, ...photoSnapshot.data() });
        } else {
          console.error('Photo not found');
        }
      } catch (error) {
        console.error('Error fetching photo details:', error);
      }
    };

    fetchPhotoDetails();
  }, [photoId]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <img src={photo.imageURL} className="img-fluid" style={{borderRadius:"5px"}} alt={photo.caption} />
        </div>
        <div className="col-lg-6">
      <h2 className="mb-4 mt-3">Photo Details</h2>
      <div>
        <div className="alert alert-dark" >
        <p style={{color:"black"}}>Author: {photo.author}</p>
        <p style={{color:"black"}}>Camera: {photo.camera}</p>
        <p style={{color:"black"}}>Settings: {photo.settings}</p>
        <p style={{color:"black"}}>Caption: {photo.caption}</p>
        </div>
        {/* Add more properties as needed */}
      </div>
      </div>
      </div>
    </div>
  );
}

export default PhotoDetails;
