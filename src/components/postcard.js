 import React from 'react';
import { Card } from 'antd';
import PostIcon from './posticon';
import NavImage from './navimage';

const { Meta } = Card;

class PostCard extends React.Component {

  constructor(props) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this);
    this.togglePinned = this.togglePinned.bind(this);
  }

  toggleLike(isSelected) {
    console.log(`toggle LIKE on post ${this.props.ID}`);
    console.log(`new value ${isSelected}`);
    // code can be added here to update the API with new liked status
  }

  render() {
    const postID = this.props.ID;
    return (
      <Card
        style={{ width: 320 }}
        cover={<NavImage alt={`Post ${postID}`} src={this.props.imageURL} to={`/post/${postID}`} />}
        hoverable={true}
        actions={[
          <PostIcon type="favourites" countLink={this.props.links.favourites} selected={this.props.favourited}
              handleToggle={this.toggleLike} id={postID}/>,
        ]}>
        
        <Meta dogName={this.props.dogName} description={this.props.summary} />
      </Card>
    );
  }
}

export default PostCard; 
