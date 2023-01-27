import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const App = () => {
  const [user, setUser] = useState({});
  const handleCallBackResponse = (response) => {
    console.log("Encoded JWT ID Token:", response.credential);
    var userObject = jwt_decode(response.credential);
    console.log("userObject", userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  };
  useEffect(() => {
    /* global google  */
    google.accounts.id.initialize({
      client_id:
        "992143856827-2qi1vpfiu9oglm40qr3mbinpsv6sfncs.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  const handleSignOut = (e) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };
  return (
    <div>
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>sign out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} alt=""></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
