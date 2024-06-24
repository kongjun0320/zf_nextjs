import request from '@/utils/request';
import dynamic from 'next/dynamic';
import Layout from '../index';
import { useState } from 'react';

const DynamicUserInfo = dynamic(() => import('@/components/UserInfo'));

function UserDetail(props) {
  const [show, setShow] = useState(false);
  return (
    <Layout>
      <div>ID: {props?.user?.id}</div>
      <button onClick={() => setShow(!show)}>显示更多</button>
      {show && props.user && <DynamicUserInfo user={props.user} />}
    </Layout>
  );
}

UserDetail.getInitialProps = async ({ query }) => {
  const response = await request.get(`/api/users/${query.id}`);
  return { user: response.data.data };
};

export default UserDetail;
