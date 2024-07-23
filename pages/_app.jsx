import App from 'next/app';
import Link from 'next/link';

import '../styles/global.css';
import styles from './_app.module.css';

class LayoutApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component: RouteComponent, pageProps } = this.props;
    return (
      <div style={{ padding: '20px' }}>
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
          </ul>
        </header>
        <div style={{ height: '200px' }}>
          <RouteComponent {...pageProps} />
        </div>
        <footer
          style={{
            textAlign: 'center',
            borderTop: '1px solid red',
            backgroundColor: 'green',
          }}
        >
          footer
        </footer>
      </div>
    );
  }
}

export default LayoutApp;
