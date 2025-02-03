import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import GuardianReg from './pages/Registration/GuardianReg';
import TutorReg from './pages/Registration/TutorReg';
import LandingPage from './pages/LandingPage';
import EditProfile from './pages/EditProfile';
import Search from './pages/Search';
import ProfilePage from './pages/ProfilePage';
import SinglePost from './pages/SinglePost';


function App() {
    
    return (
      <BrowserRouter> 
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register/guardian' element={<GuardianReg />} /> 
          <Route path='/register/tutor' element={<TutorReg />} /> 
          <Route path='/editProfile' element={<EditProfile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile/:id?' element={<ProfilePage />} />
          <Route path='/post/:id?' element={<SinglePost />} />         
        </Routes>
      </BrowserRouter>
    )
}

export default App;
