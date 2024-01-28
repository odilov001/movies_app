import { Input, message } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { Api } from 'modules/auth';
import React, { Component } from 'react';

export default class Register extends Component {
  handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const name = document.querySelector<HTMLInputElement>('#name')?.value!;
    const email = document.querySelector<HTMLInputElement>('#email')?.value!;
    const password = document.querySelector<HTMLInputElement>('#password')?.value!;

    try {
      await Api.Register({ name, email, password });
      message.success('Successfully registered 😃');
      window.location.href = '/auth/login';
    } catch (err) {
      console.log('err');
      message.error('This username is already registered 🔴');
    }
  };

  render() {
    return (
      <div className="container mx-auto flex h-full flex-col items-center  gap-2">
        <Typography className=" text-3xl ">Register Form</Typography>
        <form onSubmit={this.handleSubmit} className="flex w-[800px] flex-col gap-3">
          <Input autoFocus id="name" placeholder="Your name" size="large" />
          <Input id="email" type="email" placeholder="email" size="large" />
          <Input.Password id="password" placeholder="password" size="large" />
          <button className="h-[40px] rounded-md bg-[blue] text-white">Register</button>
        </form>
      </div>
    );
  }
}
