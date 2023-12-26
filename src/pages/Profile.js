import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        if (isAuthenticated) {
          const photosCollection = collection(firestore, 'photos');
          const userPhotosQuery = query(photosCollection, where('userId', '==', user.sub));
          const userPhotosSnapshot = await getDocs(userPhotosQuery);

          const photosData = userPhotosSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUserPhotos(photosData);
        }
      } catch (error) {
        console.error('Error fetching user photos:', error);
      }
    };

    fetchUserPhotos();
  }, [user, isAuthenticated]);

  const handleDelete = async (photoId) => {
    try {
      // Remove the image document from Firestore
      await deleteDoc(doc(firestore, 'photos', photoId));

      // Remove the image from the state
      setUserPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));

      console.log('Photo deleted successfully');
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <div className="container mt-4">
      {isAuthenticated ? (
        <div>
          <h2 className="mb-4">Profile</h2>
          <img
            src={user.picture}
            alt={user.name}
            className="rounded-circle"
            width="100"
            height="100"
          />
          <h3 className="mt-3">{user.name}</h3>
          <p className="text-muted">{user.email}</p>

          {/* Display user's artworks */}
          <div className="row">
            <h4 className="mt-4">My Artworks</h4>
            {userPhotos.map((photo) => (
              <div key={photo.id} className="col-md-3 mb-4">
                
                  <div className="card">
                    <img src={photo.imageURL} alt={photo.caption} className="card-img-top" />
                    <div className="card-body">
                      {user.email === photo.userEmail && (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(photo.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;
