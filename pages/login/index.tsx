import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [usernameLabel,setUserNameLabel] = useState('');
  const [passwordLabel,setPasswordLabel] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:1337/api/logins').then((response)=>{
      setUserNameLabel(response.data.data[0].attributes.username);
      setPasswordLabel(response.data.data[0].attributes.password);
    })
  },[])
  const onFinish = (values: any) => {
    const {remember,...rest}=values;
    loginApi(rest);
    
  };
  const loginApi: (body: {
    email: string;
    password: string;
  }) => any = async (body) => {
    return await axios({
      method: 'POST',
      url: `http://localhost:3000/auth/login`,
      headers: {},
      data: body,
    })
      .then((res) => {
        localStorage.setItem("accessToken",res.data.access_token);
        router.push('/dashboard');
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="horizontal"
    >
      <Form.Item
        label={usernameLabel}
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={passwordLabel}
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;