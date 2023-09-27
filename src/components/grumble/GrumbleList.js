import Grumble from "./Grumble";
import "./GrumbleList.css";
import React, { useState, useEffect } from "react";
import ProfilePic from "../../icons/ProfilePic";

const GrumbleList = ({ grumbles, authToken, username, userProfile }) => {
  const [noOfMessages, setNoOfMessages] = useState(5);
  const [sortBy, setSortBy] = useState("all");

  useEffect(() => {
    setNoOfMessages(5);
  }, [sortBy]);

  const grumbleFilter = (arr, sortBy) => {
    if (sortBy === "all") {
      return arr;
    } else {
      const result = arr.filter((el) => el.approval === sortBy);
      return result;
    }
  };

  const grumbleNodes = (arr, num) => {
    const grumbles = [];
    const filterGrumbles = grumbleFilter(arr, sortBy);
    for (let grumble of filterGrumbles) {
      const item = (
        <Grumble
          grumble={grumble}
          authToken={authToken}
          username={username}
          key={grumble.id}
          userProfile={userProfile}
        />
      );
      grumbles.unshift(item);
    }
    const feed = grumbles.slice(0, num);
    return feed;
  };

  const handleClick = () => {
    setNoOfMessages((prev) => prev + 5);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <div className="grumble-filter-dropdown">
        <div className="grumble-filter">
            <hr />
            <label htmlFor="sortBy">Sort By:</label>
            <select
            id="sortBy"
            name="sortBy"
            value={sortBy}
            onChange={handleSortByChange}
            >
            <option value="all">All</option>
            <option value="Pending Approval">Pending</option>
            <option value="Valid">Valid</option>
            <option value="Invalid">Invalid</option>
            </select>
        </div>
      </div>
      <div className="grumble-list-container">
        {grumbleNodes(grumbles, noOfMessages)}
      </div>
      <div className="show-more-button">
        <button onClick={handleClick}>Show More!</button>
      </div>
    </>
  );
};

export default GrumbleList;
