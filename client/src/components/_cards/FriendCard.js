import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import UserCard from "./UserCard";
// import '../../styles/usercard.css';

// React Component
const FriendCard = (props) => {
  const token = window.localStorage.getItem("auth_token");

  // State
  const [friend, setFriend] = useState({});

  // Listen

  // Function
  useEffect(() => {
    const getFriend = async () => {
      const res = await fetch(`${BASE_URL}/api/users/${props.user}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        // -- TODO -- Handling
        console.log("getUser res failure");
      } else {
        const json = await res.json();
        setFriend(json.profile);
      }
    };
    getFriend();
  }, []);

  // ---- Component Render ---- //

  // Render
  return (
    <div className="friendCard-root--container">
      <UserCard user={friend} />
    </div>
  );
};
export default FriendCard;
