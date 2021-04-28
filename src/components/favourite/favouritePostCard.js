import React from 'react';
import { Card } from 'antd';
import NavImage from '../main/navimage';

const { Meta } = Card;

class FavouritePostCard extends React.Component {
    
  render() {
    const postID = this.props.listingID;
      
    return (
        
      <Card
        
        style = {{ width: 320 }}
        cover = {
            <NavImage alt = {`FavouritePost ${postID}`} src = {this.props.imageURL} to = {`/favouritePost/${postID}`} />}

        hoverable = {true} >

        <Meta title = {this.props.listingID} description = {this.props.userID} />
      </Card>
    );
  }
}

export default FavouritePostCard; 