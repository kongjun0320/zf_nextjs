import Layout from '../index';

function UserDetail(props) {
  return (
    <Layout>
      <div>ID: {props?.user?.id}</div>
    </Layout>
  );
}

UserDetail.getInitialProps = async ({ query }) => {
  return { user: { id: query.id } };
};

export default UserDetail;
