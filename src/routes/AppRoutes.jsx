import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../components/layout/DefaultLayout';
import Homepage from '../pages/home/Homepage';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgetPassword from '../pages/auth/ForgetPassword';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import GoogleAuthSuccess from '../pages/auth/GoogleAuthSuccess';
import CreateElection from '../pages/Election/CreateElection';
import About from '../pages/About';
import Contact from '../pages/Contact';
import VerifyAccount from '../pages/auth/VerifyAccount';
import ElectionVoting from '../pages/Election/ElectionVoting';
import ResetPassword from '../pages/auth/ResetPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>
      {/* private routes */}
      <Route path="/user" element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="create-election" element={<CreateElection />} />
        <Route path="election-voting/:id" element={<ElectionVoting />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
