import React from 'react';
import UserContext from '../../contexts/user';
import {useContext} from 'react';

function UserAccount(props) {
  const context = useContext(UserContext);
  const user = context.user;
  console.log("current user in UserContext is", user);

  const [profile, setProfile] = React.useState({});
  
  if (!user.loggedIn) {
    return "Please log in"
  }

  if (!profile.username) {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

    fetch(user.links.self, {headers:headers})
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.text());
      }
    })
    .then(data => {
      console.log(data);
      setProfile(data);
    })
    .catch(err => console.error(err));  
  }

  return (
    <>
      <div style={{ padding: '1% 30%' }}>
        <h1> Profile Account</h1>
        {Object.keys(profile).map(key => <li key={key}>{key}: {profile[key]}</li>)} 
      </div>
    </>
  );
}

export default UserAccount;
