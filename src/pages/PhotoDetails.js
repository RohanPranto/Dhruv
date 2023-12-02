// PhotoDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

function PhotoDetails() {
  const { documentId } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const photoDoc = doc(firestore, 'photos', documentId);
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
  }, [documentId]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Photo Details</h2>
      <div>
        <img className='img-fluid' src={photo.imageURL} alt={photo.caption} />
        <p>Author: {photo.author}</p>
        <p>Camera: {photo.camera}</p>
        <p>Settings: {photo.settings}</p>
        <p>Caption: {photo.caption}</p>
      </div>
    </div>
  );
}

export default PhotoDetails;
