import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Mail, Lock, User, Phone, LogIn, UserPlus } from "lucide-react";
import "../css/Login.css";

// =========================================================
// 🔹 BACKEND INTEGRATION: Backend connect karne par ise uncomment karein
// =========================================================
// import axios from "axios";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Form State Variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // =========================================================
        // 🔹 BACKEND INTEGRATION: LOGIN API CALL
        // =========================================================
        /*
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        // Save token / user info for Auth Context & Topbar
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.user || { name: email.split('@')[0], email })
          );
        }
        */

        // TEMPORARY TESTING CODE (Backend connect hone tak):
        console.log("Logging in with:", { email, password });

        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "🎉 You have successfully logged in!",
          confirmButtonColor: "#4f46e5",
          background: "#131825",
          color: "#fff",
        }).then(() => {
          navigate("/");
        });

      } else {
        if (password !== confirmPassword) {
          setLoading(false);
          return Swal.fire({
            icon: "error",
            title: "Password Mismatch",
            text: "Password and Confirm Password do not match!",
            confirmButtonColor: "#ef4444",
            background: "#131825",
            color: "#fff",
          });
        }

        // =========================================================
        // 🔹 BACKEND INTEGRATION: REGISTER API CALL
        // =========================================================
        /*
        await axios.post("http://localhost:5000/api/auth/register", {
          name: fullName,
          email,
          password,
          phone,
        });
        */

        // TEMPORARY TESTING CODE (Backend connect hone tak):
        console.log("Registering with:", { fullName, email, password, phone });

        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "🎉 You have successfully registered!",
          confirmButtonColor: "#4f46e5",
          background: "#131825",
          color: "#fff",
        }).then(() => {
          setIsLogin(true);
          setFullName("");
          setEmail("");
          setPassword("");
          setPhone("");
          setConfirmPassword("");
        });
      }
    } catch (err) {
     
      let errorMessage = "Something went wrong. Please try again.";

      if (err.response) {
        errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          `Server Error: ${err.response.status}`;
      }
      else if (err.request) {
        errorMessage =
          "Unable to connect to the server. Please check if your backend is running!";
      }
      else {
        errorMessage = err.message;
      }

      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: errorMessage,
        confirmButtonColor: "#ef4444",
        background: "#131825",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back 👋" : "Create Account 🚀"}</h2>
          <p>
            {isLogin
              ? "Please enter your details to sign in"
              : "Fill in the information below to register"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="input-group">
                <Phone size={18} className="input-icon" />
                <input
                  type="tel"
                  placeholder="Phone No."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              "Processing..."
            ) : isLogin ? (
              <>
                <LogIn size={18} /> Login
              </>
            ) : (
              <>
                <UserPlus size={18} /> Register
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)} className="toggle-link">
                Register
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)} className="toggle-link">
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;