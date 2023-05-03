import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddContactForm from "./pages/AddContactForm";
import UpdateContactForm from "./pages/UpdateContactForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import useAuthStore from "./stores/authStore";

function App() {
  const userLogged = useAuthStore((state) => state.userLogged);

  return (
    <div>
      <Navbar />
      <div className="mt-[10vh]">
        <Routes>
          <Route
            path="/"
            element={userLogged ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!userLogged ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!userLogged ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/add" element={<AddContactForm />} />
          <Route path="/update" element={<UpdateContactForm />} />
          <Route path="*" element={"404 not found"} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
