import React, { useState } from 'react'

import { sidebarLinks } from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
      <>
        <div className="flex h-auto md:h-[calc(100vh-3.5rem)] min-w-full md:min-w-[220px] flex-col border-b md:border-b-0 md:border-r border-richblack-700 bg-richblack-800 py-5 md:py-10">
          <div className="flex flex-col px-4 md:px-0">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              );
            })}
          </div>
    
          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700 hidden md:block" />
    
          <div className="flex flex-col px-4 md:px-0">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-2 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2 pl-2 sm:pl-2 md:pl-6 lg:pl-6">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </>
    );
    
}

export default Sidebar
