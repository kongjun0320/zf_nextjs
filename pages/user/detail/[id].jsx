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

// UserDetail.getInitialProps = async ({ query }) => {
//   const response = await request.get(`/api/users/${query.id}`);
//   return { user: response.data.data };
// };

// 此方法会在每次客户端请求服务器的时候调用
export async function getServerSideProps() {
  const response = await request.get(
    `http://localhost:3333/api/users/${query.id}`
  );
  return {
    props: {
      user: response.data.data,
    },
  };
}

// 此函数仅会在编译阶段使用
export async function getStaticPaths({ params }) {
  const response = await request.get('http://localhost:3333/api/users');
  const users = response.data.data;
  // 这是一个用户详情页的路径的字符串数组
  // 在编译的时候，会调用此方法，获取路径的数组，然后依次访问这些路径，把这个路径生成静态的 HTML 文件
  const paths = users.map((user) => `/user/detail/${user.id}`);

  return {
    paths,
  };
}

export default UserDetail;
