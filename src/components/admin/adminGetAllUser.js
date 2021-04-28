import React from 'react';
import { Col, Row } from 'antd';
import UserPostCard from './userPostCard';
import { status, json } from '../../utilities/requestHandlers';
import UserContext from '../../contexts/user';

class GetAllUser extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cards:[]
        }
    }
    
    static contextType = UserContext;
    
  componentDidMount() {
      
      const user = this.context.user;
      
      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
      
      fetch('https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/users', {
          headers: headers
      })
      .then(status)
      .then(json)
      .then(data => {
          this.setState({cards: data})
      })
      .catch(err => console.log("Error fetching users", err));
  }
    
  render() {
    if (!this.state.cards.length) {
      return <h3>Loading user informations...</h3>
    }
      
    const cardList = this.state.cards.map(card => {
      return (
        <div style={{padding:"10px"}} key={card.ID}>
          <Col span={6}>
            <UserPostCard {...card} />
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
};

export default GetAllUser;
