import Link from 'next/link';

function Layout(props) {
  return (
    <div>
      <ul>
        <li>
          <Link href="/user/list">用户列表</Link>
        </li>
        <li>
          <Link href="/user/add">添加用户</Link>
        </li>
      </ul>
      {props.children}
    </div>
  );
}

export default Layout;
