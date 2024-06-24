import Link from 'next/link';
import Layout from './index';

function UserList(props) {
  return (
    <Layout>
      <ul>
        {props?.list?.map((user) => (
          <li key={user.id}>
            <Link href={`/user/detail/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// 在组件里定义好，然后在服务器端获取数据
UserList.getInitialProps = async () => {
  return {
    list: [
      {
        id: 1,
        name: 'aic1',
      },
      {
        id: 2,
        name: 'aic2',
      },
    ],
  };
};

export default UserList;
