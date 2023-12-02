import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated } = useAuth0();

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
        </div>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;
