import { useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { updateProfile } from "../context/profileSlice.js";

import "./UserGreeting.css";

function UserGreeting() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);

  const handleEditClick = () => {
    setIsEditing((prev) => true);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSaveClick = async () => {
    const updatedProfile = {
      firstName: firstName,
      lastName: lastName,
    };

    try {
      await dispatch(updateProfile(updatedProfile)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      // setIsEditing(false);
      // setFirstName(profile.firstName);
      // setLastName(profile.lastName);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        {!isEditing && (
          <>
            <br />'{profile.firstName} {profile.lastName}!'
          </>
        )}
      </h1>
      {!isEditing && (
        <button onClick={handleEditClick} className="edit-button">
          Edit Name
        </button>
      )}
      {isEditing && (
        <div className="edit-user">
          <input
            onChange={handleFirstNameChange}
            className="first-input"
            type="text"
            value={firstName}
            placeholder="First name"
          />
          <input
            onChange={handleLastNameChange}
            className="last-input"
            type="text"
            value={lastName}
            placeholder="Last name"
          />
          <button onClick={handleSaveClick} className="save-button">
            Save
          </button>
          <button onClick={handleCancelClick} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default UserGreeting;
