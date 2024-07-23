import React from 'react';
import './Follow.css';

const Profile = ({ alluser = [] }) => {
  return (
    <div className="profile">
      {alluser.length > 0 ? (
        alluser.map(user => (
          <form action="/users/fol" method="post" key={user.username}>
            <div className="username-container">
              <div className="profile-container">
                <div className="profile-img">
                  <img src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" alt="Profile" />
                </div>
                <div className="profile-description">
                  <p className="user-title">{user.fullname}</p>
                  <p className="username">@{user.username}</p>
                </div>
              </div>
              <div className="menu-bar">
                <input type="hidden" name="username" value={user.username} />
                <button type="submit">Follow</button>
              </div>
            </div>
          </form>
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default Profile;
