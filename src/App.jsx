import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import OpenRoute from './components/core/Auth/OpenRoute'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import MyProfile from './components/core/Dashboard/MyProfile'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import ContactUs from './pages/ContactUs'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart/Cart'
import Setting from './components/core/Dashboard/Settings/Setting'
import Error from './pages/Error'
import { ACCOUNT_TYPE } from './utlis/constants'
import AddCourses from './components/core/Dashboard/AddCourses/AddCourses'
import { useSelector } from 'react-redux'
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourses from './components/core/Dashboard/EditCourses/EditCourses'
import Catalog from './pages/Catalog'
import CoureDetails from './pages/CoureDetails'
import ViewCourses from './pages/ViewCourses'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import Instructor from './components/core/Dashboard/instructorDashboard/Instructor'



function App() {

  const {user} = useSelector((state) => state.profile);

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='catalog/:catalogName' element={<Catalog/>}/>
        <Route path='courses/:courseId' element={<CoureDetails/>}/>
        <Route path='/signup' element={<OpenRoute><SignUp/></OpenRoute>}/>
        <Route path='/login' element={<OpenRoute><LogIn/></OpenRoute>}/>
        <Route path='/reset-password' element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        <Route path="/update-password/:token" element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>}/>  
        <Route path="/about" element={<About />}/>  
        <Route path="/contact" element={<ContactUs />} />

        <Route element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path='dashboard/settings' element={<Setting/>} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
                <Route path="dashboard/cart" element={<Cart/>}/>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="dashboard/instructor" element={<Instructor/>}/>
                <Route path="dashboard/add-course" element={<AddCourses/>}/>
                <Route path="dashboard/edit-course/:courseId" element={<EditCourses/>}/>
              </>
            )
          }
          
        </Route>

        <Route element={<PrivateRoute><ViewCourses/></PrivateRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='view-course/:courseId/section/:sectionId/sub-Section/:subSectionId' element={<VideoDetails/>}/>
              </>
            )
          }
        </Route>

        <Route path='*' element={<Error/>} />

      </Routes>
    </div>
  )
}

export default App
