import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { status, json } from '../../utilities/requestHandlers';
import { Link } from "react-router-dom";

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
    {required: true, message: 'Please input your E-mail!' }
];

const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        }
    })
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
]

const firstnameRules = [
    { required: true, message: 'Please input your first name!', whitespace: true }
]

const lastnameRules = [
    { required: true, message: 'Please input your last name!', whitespace: true }
]

const aboutRules = [
    { required: true, message: 'Please input your about!', whitespace: true }
];

const codeRules = [
    { required: false, message: 'Please input your code!', whitespace: false }
];

//Registration form class which allow user to sign up
class RegistrationForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  onFinish = (values) => {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    console.log('Received code from form: ', values.code);
    const { role } = values.code; 
    fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/users/${values.code}/signUpCode`, {
        method: "GET",
        body: JSON.stringify(role),
        headers: headers
    })
    .then(status)
    .then(json)
    .then(role => {
        console.log(role);
        console.log("Role added" + JSON.stringify(role))
        console.log('Received values of form: ', values);
        const { confirm, code, ...data } = values ;  // ignore the 'confirm' and 'data' value in data sent

        let roleName = role[0].name;
        console.log(JSON.stringify(roleName));
        data.role = roleName;
        console.log("data" + JSON.stringify(data));
              
        fetch('https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/users', {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers
        })
        .then(status)
        .then(json)
        .then(data => {
            console.log(data);
            alert("Your account has been created")
        })
        .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`);
        });  
    })
  };
    
  
  render() {
    return (
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
        <div style={{ padding: '1% 20%' }}>
              <h1> Registration Page </h1>
        </div>

        <Form.Item name="firstName" label="First Name" rules={firstnameRules}>
            <Input />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name" rules={lastnameRules}>
            <Input />
        </Form.Item>

        <Form.Item name="about" label="About" rules={aboutRules}>
            <Input />
        </Form.Item>

        <Form.Item name="username" label="Username" rules={usernameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="email" label="E-mail" rules={emailRules} >
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
            <Input.Password />
        </Form.Item>

        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
            hasFeedback rules={confirmRules}>
            <Input.Password />
        </Form.Item>

        <Form.Item name="code" label="Sign Up Code" rules={codeRules}>
            <Input />
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
          <Space direction="vertical">
            <Button type="primary" htmlType="submit">
                Register
            </Button>

            <Text type="secondary">
              Already have an account?
            </Text>

            <Button type="default">
                <Link to = "/userLogin">
                  Log In
                </Link>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };
};

export default RegistrationForm;
