import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { status, json } from '../../utilities/requestHandlers';
import { Link } from "react-router-dom";
import UserContext from '../../contexts/user';

  const {Text} = Typography;
// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const dogNameRules = [
    { required: true, message: 'Please input the dog name!', whitespace: true }
]

const detailsRules = [
    { required: true, message: 'Please input the dog details!', whitespace: true }
]

const locationRules = [
    { required: true, message: 'Please input the shelter location!', whitespace: true }
]

const breedRules = [
    { required: true, message: 'Please input the dog breed!', whitespace: true }
]

const imageURLRules = [
    { required: true, message: 'Please insert Dog image URL !', whitespace: true }
]


// Update dog details form for employee

class UpdateListingForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.updateListing = this.updateListing.bind(this);
    }
    
    static contextType = UserContext;
    
    updateListing = (values) => {
        console.log('Received values of form: ', values);
        const {ID, ...data} = values; 

        const user = this.context.user;
       
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
        headers.append('Content-Type', 'application/json');
        
        console.log(values.ID);
        
        fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/listings/${values.ID}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers:headers
        })
            .then(status)
            .then(json)
            .then(data => {
            console.log(data);
            alert("Dog details has been updated")

            })
        
            .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`);
        });  
    };
    
    render() {
        
        return (

            <Form {...formItemLayout} name="updateListing" onFinish={this.updateListing} scrollToFirstError >
                <div style={{ padding: '1% 20%' }}>
                      <h1> Update Dog Details </h1>
                </div>
                
                <Form.Item name="ID" label="Dog ID" rules={dogNameRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="dogName" label="Dog's Name" rules={dogNameRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="details" label="Dog's Details" rules={detailsRules}>
                    <Input />
                </Form.Item>
                
                <Form.Item name="location" label="Dog's Shelter Location" rules={locationRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="breeds" label="Dog's Breed" rules={breedRules}>
                    <Input />
                </Form.Item>

                <Form.Item name = "imageURL" label="Dog's Image URL" rules={imageURLRules}>
                    <Input />
                </Form.Item>
            
                <Form.Item {...tailFormItemLayout}>
                    <Space direction="vertical">
                      <Text type="secondary">
                        Confirm?
                      </Text>

                      <Button type="primary" htmlType="submit">
                          Update
                      </Button>

                      <Button type="default">
                          <Link to = "/">
                            Back
                          </Link>
                      </Button>
                    </Space>
                </Form.Item>                
            </Form>
        );
    };
};

export default UpdateListingForm;