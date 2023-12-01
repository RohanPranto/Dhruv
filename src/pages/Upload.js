import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth0 } from '@auth0/auth0-react';

function Upload() {
  const { isAuthenticated } = useAuth0();
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [camera, setCamera] = useState('');
  const [settings, setSettings] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadImage = async () => {
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    if (!isAuthenticated) {
      alert('You must be logged in to upload a photo');
      return;
    }
    e.preventDefault();

    setLoading(true);

    // Upload the image to Firebase Storage and get the download URL
    const imageURL = await uploadImage();

    // Create a unique ID for the document
    const photoId = new Date().getTime().toString();

    try {
      // Add data to Firestore
      await addDoc(collection(firestore, 'photos'), {
        id: photoId,
        author,
        camera,
        settings,
        caption,
        timestamp: new Date(),
        imageURL,
      });

      console.log('Document written with ID: ', photoId);

      // Reset form after successful submission
      setImage(null);
      setAuthor('');
      setCamera('');
      setSettings('');
      setCaption('');

      // Show alert after successful submission
      alert('Photo uploaded successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Upload Photo</h2>
     {isAuthenticated ? (
       <form onSubmit={handleSubmit}>
       <div className="mb-3">
         <label htmlFor="image" className="form-label">Image Upload:</label>
         <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} />
       </div>
       <div className="mb-3">
         <label htmlFor="author" className="form-label">Author:</label>
         <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
       </div>
       <div className="mb-3">
         <label htmlFor="camera" className="form-label">Camera:</label>
         <input type="text" className="form-control" id="camera" value={camera} onChange={(e) => setCamera(e.target.value)} />
       </div>
       <div className="mb-3">
         <label htmlFor="settings" className="form-label">Camera Settings:</label>
         <input type="text" className="form-control" id="settings" value={settings} onChange={(e) => setSettings(e.target.value)} />
       </div>
       <div className="mb-3">
         <label htmlFor="caption" className="form-label">Caption/Description:</label>
         <textarea className="form-control" id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
       </div>
       <button type="submit" className="btn btn-primary" disabled={loading}>
         {loading ? 'Loading...' : 'Upload Photo'}
       </button>
     </form>
     ) : (
        <h3 style={{color:"black"}}>Please login to upload a photo</h3>
     )}


    </div>
  );
}

export default Upload;
