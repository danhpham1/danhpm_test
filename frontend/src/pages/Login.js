import React, { useState } from "react";
import { Form, Input, Button, Card, message, Alert } from "antd";

const Login = ({ onLogin }) => {
  const [msgError, setMsgError] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Login" style={{ width: 400 }}>
        {msgError ? (
          <Alert
            message={msgError}
            type="error"
            showIcon
            style={{ marginBottom: 10 }}
            closable
            onClose={() => setMsgError("")}
          />
        ) : null}
        <Form layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
