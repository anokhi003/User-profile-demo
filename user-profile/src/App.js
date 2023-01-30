import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Layout from "./component/Layout";
import WaitingPage from "./component/WaitingPage";
import AddUserInfo from "./pages/AddUserInfo";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SingUp from "./pages/SignUp";
import VerifyAccount from "./pages/VerifyAccount";
import { checkAuth } from "./redux/auth/action";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkAuth());
  },[])

  return (
    <div className="bg-gray-100">
      <ToastContainer transition={Slide} />
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route exact path="/:userId" element={<HomePage />} />
            <Route exact path="/edit/:userId" element={<AddUserInfo />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route exact path="/signup" element={<SingUp value="signUp" />} />
          <Route exact path="/reset-password" element={<SingUp value="reset-password"/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/verify/:token" element={<VerifyAccount />} />
          <Route exact path="/" element={<WaitingPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
