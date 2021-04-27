import React from 'react';
import { Form, Button, Input, Layout, Typography, Space } from 'antd';
import { status, json } from '../../utilities/requestHandlers';
import { Link } from "react-router-dom";
import UserContext from '../../contexts/user';

const {Text} = Typography;
const {Content} = Layout;
// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const userIDRules = [
    { required: true, message: 'Please ', whitespace: true }
]

// Delete Form for admin to delete user account 

class AdminDeleteForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.adminDelete = this.adminDelete.bind(this);
    }
    
    static contextType = UserContext;
    
    adminDelete (values) {
        
        const user = this.context.user;
        
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
                
        fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/users/${values.ID}`, {
            method: "DELETE",
            headers:headers
        })
            .then(status)
            .then(json)
            .then(data => {
            console.log(data);
            alert("User account has been deleted")
            
            })
        
            .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`);
        });  
    };
    
    render() {
        
        return (

            <Form {...formItemLayout} name="adminDelete" onFinish={this.adminDelete} scrollToFirstError >
                <div style={{ padding: '1% 30%' }}>
                  <h1> Delete User/Employee Account </h1>
                </div>
                <Content style={{ padding: '0.5% 25%'}}>Enter user ID number</Content>
                <Form.Item name="ID" label="User ID" rules={userIDRules}>
                    <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Space direction="vertical">
                      <Text type="primary">
                         Confirm?
                      </Text>

                      <Button type="primary" htmlType="submit">
                          Delete
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

export default AdminDeleteForm;