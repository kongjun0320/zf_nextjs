import router from 'next/router';
import { useRef } from 'react';
import Layout from './index';
import request from '@/utils/request';

function UserAdd() {
  const usernameRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await request
      .post('/api/register', {
        name: usernameRef.current.value,
      })
      .then((response) => response.data);
    if (response.success) {
      router.push('/user/list');
    } else {
      alert('注册失败');
    }
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={usernameRef} />
        <button type="submit">register</button>
      </form>
    </Layout>
  );
}

export default UserAdd;
