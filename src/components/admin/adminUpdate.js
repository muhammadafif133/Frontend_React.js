import React from 'react';
import { Form, Button, Input, Typography, Space } from 'antd';
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
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input user`s E-mail!' }
];

const passwordRules = [
      { required: true, message: 'Please input user`s password!' }
];

const confirmRules = [
    { required: true, message: 'Please confirm user`s password!' },
    // rules can include function handlers in which you can apply additional logic
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        }
    })
];

const firstnameRules = [
    { required: true, message: 'Please input users first name!', whitespace: true }
]

const lastnameRules = [
    { required: true, message: 'Please input users last name!', whitespace: true }
]

const aboutRules = [
    { required: true, message: 'Please input users about!', whitespace: true }
];

// Update Form for admin to update user's credentials

class AdminUpdateForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.adminUpdate = this.adminUpdate.bind(this);
    }
    
    static contextType = UserContext;
    
    adminUpdate = (values) => {
        console.log('Received values of form: ', values);
        const {ID, confirm, ...data} = values;  // ignore the 'confirm' value in data sent

        const user = this.context.user;
       
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
        headers.append('Content-Type', 'application/json');
        
        console.log(values.ID);
        
        fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/users/${values.ID}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers:headers
        })
            .then(status)
            .then(json)
            .then(data => {
            console.log(data);
            alert("User account has been updated")

            })
        
            .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`);
        });  
    };
    
    render() {
        
        return (

            <Form {...formItemLayout} name="adminUpdate" onFinish={this.adminUpdate} scrollToFirstError >
                <div style={{ padding: '1% 20%' }}>
                      <h1> Update User Account  </h1>
                </div>

                <Form.Item name="ID" label="User ID">
                    <Input />
                </Form.Item>
            
                <Form.Item name="firstName" label="First Name" rules={firstnameRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="lastName" label="Last Name" rules={lastnameRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="about" label="About" rules={aboutRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="email" label="E-mail" rules={emailRules}>
                    <Input />
                </Form.Item>
            
                <Form.Item name="password" label="Password" rules={passwordRules}>
                    <Input.Password />
                </Form.Item>
            
                <Form.Item name="confirm" label="Confirm Password" rules={confirmRules}>
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Space direction="vertical">
                      <Text type="primary">
                         Confirm Update?
                      </Text>

                      <Button type="primary" htmlType="submit">
                          Update
                      </Button>
                      
                      <Button type="primary">
                          <Link to = "/">
                            Cancel
                          </Link>
                      </Button>
                      
                      <Button type="primary">
                          <Link to = "/userAccount">
                            Back
                          </Link>
                      </Button>
                    </Space>
                </Form.Item>
            </Form>
        );
    };
};

export default AdminUpdateForm;