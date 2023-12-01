import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you use React Router for navigation

function Preview({ photos }) {
  const { photoId } = useParams();
  const selectedPhoto = photos.find((photo) => photo.id === photoId);

  if (!selectedPhoto) {
    // Handle the case when the photo is not found
    return <div>Photo not found</div>;
  }

  const {
    imageURL,
    author,
    caption,
    camera,
    settings,
  } = selectedPhoto;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <img src={imageURL} className="img-fluid" alt={caption} />
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{author}</h5>
              <p className="card-text">
                <strong>Caption:</strong> {caption}
              </p>
              <p className="card-text">
                <strong>Camera:</strong> {camera}
              </p>
              <p className="card-text">
                <strong>Settings:</strong> {settings}
              </p>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
