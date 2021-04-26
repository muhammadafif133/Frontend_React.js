import React from 'react';
import { Col, Row } from 'antd';
import PostCard from './postcard';
import { status, json } from '../../utilities/requestHandlers';

class BlogGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    fetch('https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/listings')
    .then(status)
    .then(json)
    .then(data => {
      console.log("show" + JSON.stringify(data))
      this.setState({posts: data});
    })
    .catch(err => console.log("Error fetching listings", err));
  }

  render() {
    if (!this.state.posts.length) {
      return <h3>Loading posts...</h3>
    }
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post.ID}>
          <Col span={6}>
            <PostCard {...post} />
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

export default BlogGrid;
