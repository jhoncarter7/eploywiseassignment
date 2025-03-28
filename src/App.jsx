import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import './App.css';
// import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin';
import { Nav } from './components/Nav.jsx';
import UserList from './pages/UserList.jsx';
// import Signin from './page/Signin';

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
     <Nav/>
      <Routes>
        {/* Redirect from root "/" to "/signup" */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        
        {/* Define distinct routes for signup and signin */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/user_list" element={token ?<UserList />: <Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
