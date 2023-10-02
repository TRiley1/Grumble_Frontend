import React, { useState, useEffect } from "react";
import "./Grumble.css";
import ProfilePic from "../../icons/ProfilePic";
import JudgementBar from "../judgementBar/JudgementBar";


const Grumble = ({ grumble, authToken, username, userProfile }) => {

  // console.log(grumble.id)

  const [likesCount, setLikesCount] = useState(grumble.likingUsers.length);
  const [dislikesCount, setDislikesCount] = useState(grumble.dislikingUsers.length);

  const totalVotes = likesCount + dislikesCount;
  const likesPercentage = totalVotes > 0 ? (likesCount / totalVotes) * 100 : 0;
  const dislikesPercentage = totalVotes > 0 ? (dislikesCount / totalVotes) * 100 : 0;
  const grumbleThreshold = 3;
  
  // console.log(grumble)
  useEffect(() => {

    if (totalVotes >= grumbleThreshold && grumble.approval === "Pending Approval") {
      if (likesPercentage >= 65) {
        handleVerdict("Valid", grumble);
      } else if (dislikesPercentage >= 65) {
        handleVerdict("Invalid", grumble);
      }
    }
  }, [likesCount, dislikesCount, grumble]);


  const grumbleUser = grumble.user.userProfile.avatarConfig
  

  const grumbleProfilePic = () => {
    return (
      <div className="profile-pic-container">
        <ProfilePic
      avatarStyle={grumbleUser.avatarStyle}
      topType={grumbleUser.topType}
      accessoriesType={grumbleUser.accessoriesType}
      hairColor={grumbleUser.hairColor}
      facialHairType={grumbleUser.facialHairType}
      facialHairColor={grumbleUser.facialHairColor}
      clotheType={grumbleUser.clotheType}
      clotheColor={grumbleUser.clotheColor}
      eyeType={grumbleUser.eyeType}
      eyebrowType={grumbleUser.eyebrowType}
      mouthType={grumbleUser.mouthType}
      skinColor={grumbleUser.skinColor}
      size = "50px"
        />
      </div>
    )
}

  const handleVerdict = (approvalStatus, grumble) => {
    const verdictAPI = "http://localhost:8080/grumbles/verdict";
    const verdictBody = { grumbleID: grumble.id, verdict: approvalStatus };
    
    // console.log(verdictBody)
    fetch(verdictAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(verdictBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Verdict submitted successfully:", data);
      })
      .catch((error) => {
        console.error("Error submitting verdict:", error);
      });
  };

  const handleClick = (likeType) => {
    if (grumble.approval === "Pending Approval") {
      const body = {
        id: grumble.id,
        username: username,
      };

      console.log(body)

      const apiUrl =
        likeType === "like"
          ? "http://localhost:8080/grumbles/like"
          : "http://localhost:8080/grumbles/dislike";

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(
            `${
              likeType.charAt(0).toUpperCase() + likeType.slice(1)
            }d successfully:`,
            data
          );

          // Update likes and dislikes count based on the backend response
          if (likeType === "like") {
            setLikesCount(prev => prev + 1);
          } else {
            setDislikesCount(prev => prev + 1);
          }
          
        })
        .catch((error) => {
          console.error(`Error ${likeType}ing grumble:`, error);
        });
    }
  };

  const approvalImageRenderer = (grumble) => {
    if(grumble.approval === "Pending Approval"){
      return <img className = "stamp-image" src="/images/pending.png" alt="pending pass stamp" />
    }
    else if (grumble.approval === "Valid") {
      return <img className = "stamp-image" src="/images/Pass stamp 02.png" alt="green pass stamp" />
    }
    else {
      return <img className = "stamp-image" src="/images/Rejected stamp 03.png" alt="red pass stamp" />
    }
  }

  return (
    <div className = 'grumble-card-container'>
      {grumble ? (
        <div className={`grumble-container ${grumble?.approval?.toLowerCase()}`}>
          <div>
            
            <div className="grumble-header">
              {grumbleProfilePic()}
              <div class = "grumble-name" style={{ flex: 2 }}>
                <h2 className="grumble-username">{grumble.user.username}</h2>
                <h3 className="profile-tagline">professional grumbler</h3>
              </div>
              {approvalImageRenderer(grumble)}
            </div>
            <hr />
            <h2>Title : "This darn thing happened!"</h2>
            <div className="speech-bubble">
              <p className="grumble-text">{grumble.grumble}</p>
            </div>
            <JudgementBar grumble={grumble} grumbleThreshold={grumbleThreshold} />
            {grumble.approval === "Pending Approval" ? (
              <div className="button-container">
                <button
                  className="like-button"
                  onClick={() => handleClick("like")}
                >
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVR4nO2ZTYhNYRjH3zFNGIzmNo1GUT4WiBoWPlNYS1mMLGZlwYLCkrCzEGqmKCxGsbBiQVkYpCwkNWWKGfkoZOQzY8i3n97mf+t0594zR+e54z06/zqb8z79///n3vfjOc/rXI4cOcYcwESgA3gLDAAngEaXJQC1wBVG4iFQcFkBcFDGXwCtwHzgrt4dcVkAsA74BfwAlkfer1Iij13oAJr0L3jsLRmbrPdfXMgAaoBLMnsNGFcy7qeYxwMXMoCdMvoamF5m/KjGj7lQASwGvgK/gfVlxuuBd0pkiQsRwCSgTyY7KsRs1fhNFyqA0zLZC0yoEFPceje5EAG0yeAnYF6FmDWRM6XOhQZgNjAok1ti4s4rZp8LDUAdcFsGz8XEzQJ++rMDaHahATikJJ7GFYJAp+JOudDA8JwvliArYuIaNPX8lrzAhQSgGXipX3lPwgOyHPzm8D7mGQBu+TLHlzbVKEEuy8jV0hKkTHw78J30uA9Ms0xke6QEaUl5gDaO8swANgD3pHnWKokC8EGkG01Ik+nOleagFeFuEXabECbXbSyuKSvCbhG2mRAm110k3X4rwlciHFGeVxPA6sgut82C0J/OHrUmDpPrjgeOR/TTFZ3FfdDM4d/r75CFO1lPpGCy6ANIZJksPM9sIgx3ZnpkoTPLifRK/knqlus/TuSi5L/FVdtZSKQGOCwL17O+2Jv+l11roSw8S0v0UURTzNwl154ZWfBdacn6RdRq5jCZbjvwObJrpav1gJMi22/mMplul3R7TLowuvMofh02mLhMprtUun2WpP6qADXcYr/XDTXrze9UgDm62PS4AEw1Ix+9JfvImnhlJJk3wAF/TWDdsgFa/IdUpCW7y5I/2vP17aCxwpmqTmVgre7Ofd9pyNj8EHAD2Fy1BHLkyOEyiz+lhVxrUBoKtwAAAABJRU5ErkJggg=="/>
                </button>
                <button
                  className="dislike-button"
                  onClick={() => handleClick("dislike")}
                >
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACqklEQVR4nO2ZXYgOYRiG37XJzyI2VmgPiNJKKPkJEadKyh7hRLQHFGcb9tSB9sBGUZQtJw7khFLys0UOKIpiV5TIT9Y/n1b+Lr3tPTV99ptv1jyzO5O5a06+ebrv+5n3eZ95vnecK1CgQIFKANYBx4FuoIQtSsB1YDNQ49IAMBvoYujQmUYSK4C3EngNtAELgTpjnWlAC/BRWi3WKxEkcQYYb0ZeWXOT9B5bknaFkkinbv/WHCvNPsuNHZRT6isRAFgi3W5nAXUnjzYTwvi6J6V7B5hqQdgjwgUmDuPrbgG+SvsJMCMp4WeRDVlZBQAagXsmrTho6IlIkunPk4VneU9kiix8yW0iQA3QLgtX85zIOcl/A5bnOZG7oa5Vn+dEJgO3ZeFw3jf7Ull4nvdE6mWhlPdEdsnCraREP0VUa+Yunu4o4CjwS/rNSQn91Osx3cxlPN1VQUkB2y0IL5k8kcHrzpdujxXhHhFeNiGMrzvJZJOXdY0PIt1oQhpPd440P1mS7hRprz8cSMBTpycddTUCG4AH0jxlPbxdCEoMGFElfivwneS4DzSYJSJzDcArCeytErs7wpzvQu8jrpfADaDV+qgpbHCN+vqPqGkUmOBrG/gNNLksAjioJ/vU13REXIfiTrgsAhgJ3JTJ0xFxMzUV9JnXuRWAWSodj20RcWcVs99lFUBzaPPOrRCzWjEv/Eq6rALolFF/ZDO6yr+8IR1x/uUF57+ReHRUiNmh+9dclgEs0uGAb7XrKxxGvxuO08pBI/QC7B1o3A+14iMuy6B/hDkvs1fKRxhgse49dFkH/Scevjt57Cu7N870W0faANaGRphlod9Xmn99ShvAgdC7wzeCptCJervLC4Ba4OIAU++jqNkskwDGAIeAN1qZY8DE4fZVoMD/jD+F8lxU+zNQqAAAAABJRU5ErkJggg=="/>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div>No grumble data available</div>
      )}
    </div>
  );
  

}
export default Grumble;
