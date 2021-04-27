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
const dogsIDRules = [
    { required: true, message: 'Please insert userID!', whitespace: true }
]

// Delete listed dog form for employee
class DeleteListingForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.deleteListing = this.deleteListing.bind(this);
    }
    
    static contextType = UserContext;
    
    deleteListing (values) {
        
        const user = this.context.user;
        
         let headers = new Headers();
         headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
        
        
        fetch(`https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/listings/${values.ID}`, {
            method: "DELETE",
            headers:headers
        })
            .then(status)
            .then(json)
            .then(data => {
            console.log(data);
            alert("Dog has been successfully deleted")
            
            })
        
            .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`);
        });  
    };
    
    render() {
        
        return (

            <Form {...formItemLayout} name="deleteListing" onFinish={this.deleteListing} scrollToFirstError >
                <div style={{ padding: '1% 30%' }}>
                  <h1> Delete Dogs </h1>
                </div>
                <Content style={{ padding: '0.5% 25%'}}>Enter dogs ID number</Content>
                <Form.Item name="ID" label="Dogs ID" rules={dogsIDRules}>
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

export default DeleteListingForm;