import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import CreateOrganizationForm from './components/CreateOrganizationForm';
import AdminForm from './components/AdminForm';
import LoginAsEmployee from './components/LoginAsEmployee';
import EmployeeHome from './components/EmployeePages/EmployeeHome';
import Works from './components/EmployeePages/Works';
import Reviews from './components/EmployeePages/Reviews';
import AdminLogin from './components/EmployeePages/AdminLogin';
import AdminHome from './components/AdminPages/AdminHome';
import AddEmployee from './components/AdminPages/AddEmployee';
import { ToastContainer } from 'react-toastify';
import DeleteEmployee from './components/AdminPages/DeleteEmployee'
import 'react-toastify/dist/ReactToastify.css';
import AddWork from './components/AdminPages/AddWork';
import CheckReviews from './components/AdminPages/CheckReviews';
import EmployeeReview from './components/AdminPages/EmployeeReview';
import PromoteEmployee from './components/AdminPages/PromoteEmployee';
import ChangePassword from './components/EmployeePages/ChangePassword';
import Announcements from './components/EmployeePages/Announcements';
const App = () => {
  return (
    <Router>
      <div>
        {/* ToastContainer for displaying toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"  
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-organization" element={<CreateOrganizationForm />} />
          <Route path="/LoginasEmp" element={<LoginAsEmployee />} />
          <Route path="/adminform" element={<AdminForm />} />
          <Route path="/EmployeeHome/:organization_name/:employeeId" element={<EmployeeHome />} />
          <Route path="/Works/:organization_name/:employeeId" element={<Works />} />
          <Route path="/Reviews/:organization_name/:employeeId" element={<Reviews />} />
          <Route path="/ChangePassword/:organization_name/:employeeId" element={<ChangePassword/>} />
          <Route path="/Announcements/:organization_name/:employeeId" element={<Announcements />} />
          <Route path="/AdminLogin/:organization_name/:employeeId" element={<AdminLogin />} />
          <Route path="/AdminHome/:organization_name/:employeeId" element={<AdminHome />} />
          <Route path="/addemployee/:organization_name/:employeeId" element={<AddEmployee />} />
          <Route path="/deleteemployee/:organization_name/:employeeId" element={<DeleteEmployee />} />
          <Route path="/addwork/:organization_name/:employeeId" element={<AddWork/>} />
          <Route path="/CheckReviews/:organization_name/:employeeId" element={<CheckReviews/>} />
          <Route path="/reviewsofemp/:organization_name/:employeeId/:userId" element={<EmployeeReview/>} />
          <Route path="/PromoteEmployee/:organization_name/:employeeId" element={<PromoteEmployee/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
