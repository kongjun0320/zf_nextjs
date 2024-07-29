import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import request from '@/utils/request';
import { SET_USER_INFO } from 'store/action-types';

const Login = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await request
      .post('/api/login', {
        name: usernameRef.current.value,
      })
      .then((response) => response.data);
    if (response.success) {
      // 登录成功之后，需要把用户信息保存在 redux 仓库中
      dispatch({
        type: SET_USER_INFO,
        payload: response.data,
      });
      router.push('/');
    } else {
      alert('登录失败');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={usernameRef} />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
