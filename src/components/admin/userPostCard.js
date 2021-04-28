import React from 'react';
import { Card } from 'antd';
import NavImage from '../main/navimage';

const { Meta } = Card;

class UserPostCard extends React.Component {

  render() {  
    const postID = this.props.ID;
      
    return (
      <Card
        style = {{ width: 320 }}
        cover = {<NavImage alt = {`UserPost ${postID}`} src = {this.props.avatarURL} to = {`/userPost/${postID}`} />}
        hoverable = {true}>
        <Meta title = {this.props.username} description = {this.props.role}/>
        <Meta description = {this.props.email}/>
        <Meta description = {this.props.about}/>
      </Card>
    );
  }
}

export default UserPostCard; 