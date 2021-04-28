import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd';
import { status, json } from '../../utilities/requestHandlers';
import UserContext from '../../contexts/user';

const { Title } = Typography;

class UserPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userPost: undefined
    }
  }
    
  static contextType = UserContext;
    
  componentDidMount() {
      
    const user = this.context.user;   
    const id = this.props.match.params.id; // available using withRouter()
    
    fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/users/${id}`, {
        headers: {
            "Authorization": "Basic " + btoa(user.username + ":" + user.password)
        }
    })
    .then(status)
    .then(json)
    .then(post => {
      this.setState({userPost:post})
    })
    .catch(err => {
      console.log(`Fetch error for post ${id}`)
    });
  }

  render() {
    if (!this.state.userPost) {
      return <h3>Loading user information...</h3>
    }
    const userPost = this.state.userPost;

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={200} alt="Post" src={userPost.avatarURL} />
          </Col>
          <Col span={12}>
            <Title>{userPost.username}</Title>
            <h3> User ID: {userPost.ID} </h3>
            <h3> User Role: {userPost.role} </h3>
            <h3> First Name: {userPost.firstName} </h3>
            <h3> Last Name: {userPost.lastName} </h3>
            <h3> About: {userPost.about} </h3>
            <h3> Email: {userPost.email} </h3>
            <h3> Date Registered: {userPost.dateRegistered} </h3>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(UserPost);
