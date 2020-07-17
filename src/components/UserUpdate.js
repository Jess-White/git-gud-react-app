import React from 'react';
// import CurrentUser from './CurrentUser';

const UserUpdate = (props) => {
  return (
    <div>
      {/* <CurrentUser {...props} /> */}

      <h1>User Update here</h1>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" defaultValue={props.first_name} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" defaultValue={props.last_name} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" defaultValue={props.email} />
        </div>
        <div>
          <input type="submit" value="Update User" />
        </div>
      </form>
    </div>
  )

}

export default UserUpdate;
