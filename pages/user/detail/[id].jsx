import request from '@/utils/request';
import Layout from '../index';

function UserDetail(props) {
  return (
    <Layout>
      <div>ID: {props?.user?.id}</div>
      <div>Name: {props?.user?.name}</div>
    </Layout>
  );
}

UserDetail.getInitialProps = async ({ query }) => {
  const response = await request.get(`/api/users/${query.id}`);
  return { user: response.data.data };
};

export default UserDetail;
