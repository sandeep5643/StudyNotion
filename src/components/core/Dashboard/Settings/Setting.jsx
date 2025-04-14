import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"


export default function Settings() {
  return (
    <>
      <h1 className="mb-10 text-3xl font-medium text-richblack-5 text-center sm:text-left">
        Edit Profile
      </h1>
  
      <div className="flex flex-col gap-y-10">
        {/* Change Profile Picture */}
        <div className="rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:p-6 md:p-8">
          <ChangeProfilePicture />
        </div>
  
        {/* Edit Profile Form */}
        <div className="rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:p-6 md:p-8">
          <EditProfile />
        </div>
  
        {/* Update Password */}
        <div className="rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:p-6 md:p-8">
          <UpdatePassword />
        </div>
  
        {/* Delete Account */}
        <div className="rounded-md border border-pink-700 bg-pink-900/10 p-4 sm:p-6 md:p-8">
          <DeleteAccount />
        </div>
      </div>
    </>
  )
  
}