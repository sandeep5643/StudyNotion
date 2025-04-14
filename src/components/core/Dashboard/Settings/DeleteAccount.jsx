import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.error("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="my-10 flex flex-col gap-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-6 sm:flex-row sm:gap-x-5 sm:p-8 sm:px-12">
        {/* Icon Section */}
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 self-center sm:self-start">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
  
        {/* Text + Button Section */}
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
  
          <div className="w-full sm:w-4/5 text-pink-25 mx-auto sm:mx-0">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
  
          <button
            type="button"
            className="w-fit mx-auto sm:mx-0 cursor-pointer italic text-pink-300"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  );
  
}