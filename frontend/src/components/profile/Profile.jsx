import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import { useAuth } from "../../context/User";
const Profile = () => {
  const [user, setUser] = useState(null);
  console.log("userasdas", user);
  const { user: authUser } = useAuth();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/employee/${authUser.user.email}`)
      .then((res) => setUser(res.data[0]));
  }, []);

  return (
    <div className="profile">
      <div className="profile-box shadow">
        <h1>Profile</h1>
        <div className="profile-body">
          <p>
            <label>Name:</label>
            <span>
              {user?.firstname} {user?.lastname}
            </span>
          </p>
          <p>
            <label>Email:</label>
            <span>{user?.email}</span>
          </p>

          <p>
            <label>Contact:</label>
            <span>{user?.phoneno}</span>
          </p>
          <p>
            <label>Gender:</label>
            <span>{user?.gender}</span>
          </p>
          <p>
            <label>Address:</label>
            <span>{user?.address}</span>
          </p>
          <p>
            <label>DOB:</label>
            <span>{user?.dob}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
