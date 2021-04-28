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
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];

const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
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
    { required: true, message: 'Please input your first name!', whitespace: true }
]

const lastnameRules = [
    { required: true, message: 'Please input your last name!', whitespace: true }
]

const aboutRules = [
    { required: true, message: 'Please input your about!', whitespace: true }
];



//Update Form class which allow users to update their profile credentials

class UpdateForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }
    
    static contextType = UserContext;
    
    update (values) {
        console.log('Read values of form: ', values);
        const {confirm, ...data} = values;
        console.log("Show value" + JSON.stringify(data));
        const user = this.context.user;
        console.log("User details", user);
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
        headers.append('Content-Type', 'application/json');
        
        console.log("User Update Test", headers); //checking error

        fetch(user.links.self, {
            method: "PUT",
            body: JSON.stringify(data),
            headers:headers
        })
            .then(status)
            .then(json)
            .then(data => {
            console.log(data);

            alert("Your profile has been updated")
            this.context.login(data);
            this.setState({ redirect:'/' });
            
        })
            .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`);
        });  
    };
    
    render() {
        
        return (

            <Form {...formItemLayout} name="update" onFinish={this.update} scrollToFirstError >
            
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
                         Confirm?
                      </Text>

                      <Button type="primary" htmlType="submit">
                          Update
                      </Button>
                      
                      <Button type="primary">
                          <Link to = "/home">
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

export default UpdateForm;