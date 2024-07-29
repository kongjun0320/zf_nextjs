import App from 'next/app';
import Link from 'next/link';
import router from 'next/router';
import { Provider } from 'react-redux';
import request from '@/utils/request';
import createStore from '@/store';

import '../styles/global.css';
import styles from './_app.module.css';
import { SET_USER_INFO } from 'store/action-types';

function getStore(initialState) {
  if (typeof window === 'undefined') {
    // 服务器环境，每次都会创建新的仓库
    return createStore(initialState);
  } else {
    // 客户端的时候只会有首次创建仓库，后面的话都会复用老仓库
    if (!window._REDUX_STORE_) {
      window._REDUX_STORE_ = createStore(initialState);
    }
    return window._REDUX_STORE_;
  }
}

class LayoutApp extends App {
  // 9. 客户端收到数据后，把 props 反序列化为 js 对象传递给 LayoutApp 的 constructor
  constructor(props) {
    super(props);
    // 5. 把 props 作为属性对象作为对象传递给 LayoutApp 的构造函数
    // 6. 在服务器根据 getInitialProps 得到的初始状态
    // 10. 通过服务器返回的状态创建客户端的仓库
    this.store = getStore(props.initialState);
    console.log('App constructor');
    this.state = {
      loading: false,
    };
  }

  routeChangeStart = () => {
    this.setState({
      loading: true,
    });
  };

  routeChangeComplete = () => {
    this.setState({
      loading: false,
    });
  };

  componentDidMount() {
    router.events.on('routeChangeStart', this.routeChangeStart);
    router.events.on('routeChangeComplete', this.routeChangeComplete);
  }

  componentWillUnmount() {
    router.events.off('routeChangeStart', this.routeChangeStart);
    router.events.off('routeChangeComplete', this.routeChangeComplete);
  }

  static async getInitialProps({ Component, ctx }) {
    console.log('App getInitialProps');
    // 在后台执行的话，获取仓库，其实会创建新的仓库
    // 在客户端执行的时候，每次切换路由都会走此方法
    // 1. 在服务器端走 LayoutApp.getInitialProps 此处会创建新的空仓库
    const store = getStore();
    // 2. 如果是服务器端环境，会掉接口获取当前的登录用户，放置到仓库中
    if (typeof window === 'undefined') {
      const options = {
        url: '/api/validate',
      };
      if (ctx.req && ctx.req.headers.cookie) {
        options.headers = options.headers || {};
        options.headers.cookie = ctx.req.headers.cookie;
      }
      const response = await request(options).then((res) => res.data);
      if (response.success) {
        store.dispatch({
          type: SET_USER_INFO,
          payload: response.data,
        });
      }
    }

    let props = {};
    let pageProps = {};
    // 3. 在服务端执行的时候，把仓库的最新状态放在了属性对象的 initialState
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx, store);
    }
    props.pageProps = pageProps;

    if (typeof window === 'undefined') {
      props.initialState = store.getState();
    }
    // 4. 返回 props 属性对象
    // 8. 服务器事情做完后，会把 LayoutApp.props 序列化成字符串 和 render 渲染出来的 html 一起发送给客户端
    return props;
  }

  render() {
    console.log('App render');
    // 7. 通过使用仓库中的状态去在服务器端渲染组件，获取 HTML 字符串
    // 11. 通过客户端的仓库的状态渲染组件，进行水合
    const state = this.store.getState();

    const { Component: RouteComponent, pageProps } = this.props;
    return (
      <Provider style={{ padding: '20px' }} store={this.store}>
        <style jsx>
          {`
            li {
              display: inline-block;
              margin-left: 10px;
              line-height: 31px;
            }
          `}
        </style>
        <header style={{ borderBottom: '1px solid red', display: 'flex' }}>
          <img src="/images/kj.jpeg" className={styles.logo} />
          <ul>
            <li>
              <Link href="/">首页</Link>
            </li>
            <li>
              <Link href="/user/list">用户列表</Link>
            </li>
            <li>
              <Link href="/profile">个人中心</Link>
            </li>
            <li>
              {state?.currentUser ? (
                <span>用户名：{state?.currentUser.name}</span>
              ) : (
                <Link href="/login">登录</Link>
              )}
            </li>
          </ul>
        </header>
        <div style={{ height: '240px', padding: '20px' }}>
          {this.state.loading ? (
            <div>loading...</div>
          ) : (
            <RouteComponent {...pageProps} />
          )}
        </div>
        <footer
          style={{
            height: '44px',
            textAlign: 'center',
            borderTop: '1px solid red',
            backgroundColor: 'green',
          }}
        >
          footer
        </footer>
      </Provider>
    );
  }
}

export default LayoutApp;
