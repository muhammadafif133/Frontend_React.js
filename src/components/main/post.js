import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd'
import PostIcon from './posticon';
import { status, json } from '../../utilities/requestHandlers';

const { Title, Paragraph } = Typography;

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: undefined
    }
    this.toggleFavourite = this.toggleFavourite.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()

    fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/listings/${id}`)
    .then(status)
    .then(json)
    .then(post => {
      this.setState({post:post})
    })
    .catch(err => {
      console.log(`Fetch error for post ${id}`)
    });
  }

  toggleFavourite(isSelected) {
    console.log('Favourite was toggled');
  }


  render() {
    if (!this.state.post) {
      return <h3>Loading post...</h3>
    }
    const post = this.state.post;
    const icons = (
      <div>
        Favourites : <PostIcon type="likes" count={post.favourites} selected={post.favourited}
          handleToggle={this.toggleFavourite}/><br/>
      </div>
    );

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={200} alt="Post" src={post.imageURL} />
          </Col>
          <Col span={12}>
            <Title>{post.dogName}</Title>
            <Paragraph>{post.details}</Paragraph>
          </Col>
          <Col span={6} align="center">
            {icons}
          </Col>
        </Row>
      </div>
    );
  }

}

export default withRouter(Post);
