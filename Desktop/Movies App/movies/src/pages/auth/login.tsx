import { Button, Input, InputRef, message, Typography } from 'antd';
import { Api, Mappers } from 'modules/auth';
import React, { Component } from 'react';
import store from 'store2';

export default class Login extends Component {
  emailRef = React.createRef<InputRef>();
  passwordRef = React.createRef<InputRef>();

  handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const email = this.emailRef.current?.input?.value!;
    const password = this.passwordRef.current?.input?.value!;

    try {
      const loginRes = await Api.Login({ email, password });
      const token = loginRes.data.data;

      store.set('access', token);

      const meRes = await Api.Me({ token });
      const user = Mappers.User(meRes.data);

      message.success(`Successfully Logged in. Hi ${user.name} 🎉`);
      window.location.href = '/movies';
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className=" container mx-auto flex h-full flex-col items-center  gap-2">
        <form onSubmit={this.handleSubmit} className="flex w-[800px] flex-col gap-2">
          <Typography className="text-center text-3xl">Login Form</Typography>
          <Input autoFocus ref={this.emailRef} type="email" placeholder="email" size="large" />
          <Input.Password ref={this.passwordRef} placeholder="password" size="large" />
          <Button type="primary" htmlType="submit" size="large">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
