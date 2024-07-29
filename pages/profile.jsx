import router from 'next/router';
import request from '@/utils/request';

function Profile(props) {
  return (
    <div>
      <p>当前用户：{props?.currentUser?.name}</p>
      <p>Profile</p>
      <button onClick={() => router.back()}>返回</button>
    </div>
  );
}

Profile.getInitialProps = async function (ctx, store) {
  const state = store.getState();
  const currentUser = state.currentUser;

  if (currentUser) {
    return { currentUser };
  } else {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    } else {
      router.push('/login');
    }
    return {};
  }
};

// Profile.getInitialProps = async function (ctx) {
//   const options = {
//     url: '/api/validate',
//   };
//   if (ctx.req && ctx.req.headers.cookie) {
//     options.headers = options.headers || {};
//     options.headers.cookie = ctx.req.headers.cookie;
//   }
//   const response = await request(options).then((res) => res.data);
//   if (response.success) {
//     return {
//       currentUser: response.data,
//     };
//   } else {
//     if (ctx.req) {
//       ctx.res.writeHead(302, { Location: '/login' });
//       ctx.res.end();
//     } else {
//       router.push('/login');
//     }
//     return {};
//   }
// };

export default Profile;
