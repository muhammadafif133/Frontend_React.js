import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { status, json } from '../../utilities/requestHandlers';
import { Link } from "react-router-dom";
import UserContext from '../../contexts/user';


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


// Create dog listing form for employees

class CreateListingForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.createListing = this.createListing.bind(this);
    }
    
    static contextType = UserContext;
    
    createListing = (values) => {
        console.log('Received values of form: ', values);
        const {...data } = values;

        const user = this.context.user;
        console.log(user);
        
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
        headers.append('Content-Type', 'application/json');
        
        fetch('https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/listings', {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers
        })
            .then(status)
            .then(json)
            .then(data => {
            console.log(data);
            alert("Dog has been listed")
        })
            .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`);
        });  
    };
    
    render() {
        return (
            <Form {...formItemLayout} name="createListing" onFinish={this.createListing} scrollToFirstError >
            
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

                <Form.Item name = "imageURL" label = "Dog's Picture">
                    <Input type = "file" name = "dog_image" accept = "" />
                </Form.Item>
            
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Post Dog</Button>
                    <Button type = "primary"><Link to = "/">Back</Link></Button>
                </Form.Item>
            </Form>
        );
    };
};

export default CreateListingForm;