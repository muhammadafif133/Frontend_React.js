import React from 'react';
import { Col, Row } from 'antd';
import PostCardDog from './postCardDog';
import { status, json } from '../../utilities/requestHandlers';
import UserContext from '../../contexts/user';

class GetFavouriteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
    
    static contextType = UserContext;

  componentDidMount() {
      
      const id = this.context.user.ID;
      const user = this.context.user;
      
      console.log(user);
      
      fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/listings/${id}/getFavouriteList`)
      .then(status)
      .then(json)
      .then(data => {
          this.setState({posts: data})
      })
      .catch(err => console.log("Error fetching dogs", err));
  }

  render() {
    if (!this.state.posts.length) {
      return <h3>Loading favourite posts...</h3>
    }
      
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post.ID}>
          <Col span={6}>
            <FavouritePostCard {...post} />
          </Col>
        </div>
      )
    });

    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default GetFavouriteList;
