import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatedPassword from './UpdatedPassword'
import DeleteAccount from './DeleteAccount'


const Setting = () => {
  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Profile
        </h1>

        {/* Change Profile Picture */}
        <ChangeProfilePicture />

        {/* Profile */}
        <EditProfile />

        {/* Password */}
        <UpdatedPassword />

        {/* Delete Account */}
        <DeleteAccount />
    </div>
  )
}

export default Setting
