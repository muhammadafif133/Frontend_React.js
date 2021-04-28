import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd';
import { status, json } from '../../utilities/requestHandlers';

const { Title } = Typography;

class FavouritePost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: undefined
    } 
  }

  componentDidMount() {
    const id = this.props.match.params.listingID; // available using withRouter()
    
    fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/listings/${id}`)
    .then(status)
    .then(json)
    .then(favouritePost => {
      this.setState({post:favouritePost})
    })
    .catch(err => {
      console.log(`Fetch error for post ${id}`)
    });
  }

  render() {
    if (!this.state.post) {
      return <h3>Loading favourite post...</h3>
    }
    const favouritePost = this.state.post;

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={200} alt="Post" src={favouritePost.imageURL} />
          </Col>
          <Col span={12}>
            <Title>{favouritePost.dogName}</Title>
            <h3> Dog ID: {favouritePost.ID} </h3>
            <h3> Dog Age: {favouritePost.breeds} </h3>
            <h3> Dog Colour: {favouritePost.location} </h3>
            <h3> Dog Location: {favouritePost.details} </h3>
          </Col>
          <Col span={6} align="center">
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(FavouritePost);
