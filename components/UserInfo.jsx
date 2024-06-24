import React, { useState } from 'react';

function UserInfo(props) {
  const [createdAt, setCreatedAt] = useState(props.user.createdAt);

  const changeTime = async () => {
    const moment = await import('moment');
    setCreatedAt(moment.default(createdAt).format('YYYY-MM-DD hh:mm:ss'));
  };

  return (
    <div>
      <p>Name: {props.user.name}</p>
      <p>CreatedAt: {createdAt}</p>
      <button onClick={changeTime}>切换时间</button>
    </div>
  );
}

export default UserInfo;
