import React, { useState } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { createUser, getUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = ({
    createUser,
    getUser,
  }) => {
    const navigate = useNavigate();
  
    const [loginData, setLoginData] = useState({
      email: "",
      password: "",
    });
  
    const [signupData, setSignupData] = useState({
      username: "",
      password: "",
      email: "",
    });
    const navigation = (id) =>{
        navigate(`/user_id/${id}`);
    }
    const handleCreateUserSubmit = async (e) => {
      e.preventDefault();
      await createUser(signupData.username, signupData.email, signupData.password, navigation);
    };

    const handleGetUserSubmit = async (e) => {
      e.preventDefault();
      console.log("Getting user with:", loginData);
      await getUser(loginData.email, loginData.password, navigation);

    };
    
    return (
        <div className="auth-form">
            <div className="signup-section">
                <div className="form-title">CREATE A NEW ACCOUNT</div>
                <form className="form" onSubmit={handleCreateUserSubmit}>
                    <label htmlFor="newUsername" className="label">
                        Username
                    </label>
                    <input
                        id="newUsername"
                        className="form-input"
                        placeholder="Username"
                        value={signupData.username}
                        onChange={(e) =>
                            setSignupData({ ...signupData, username: e.target.value })
                        }
                    />
                    <label htmlFor="email" className="label">
                        Email
                    </label>
                    <input
                        id="email"
                        className="form-input"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={(e) =>
                            setSignupData({ ...signupData, email: e.target.value })
                        }
                    />
                    <label htmlFor="newPassword" className="label">
                        Password
                    </label>
                    <input
                        id="newPassword"
                        className="form-input"
                        placeholder="Password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) =>
                            setSignupData({ ...signupData, password: e.target.value })
                        }
                    />
                    <button type="submit" className="auth-button">
                        SIGN UP
                    </button>
                </form>
            </div>

            <div className="vertical-line"></div>

            <div className="login-section">
                <div className="form-title">LOG IN</div>
                <form className="form" onSubmit={handleGetUserSubmit}>
                    <label htmlFor="loginEmail" className="label">
                        Email
                    </label>
                    <input
                        id="loginEmail"
                        className="form-input"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={(e) =>
                            setLoginData({ ...loginData, email: e.target.value })
                        }
                    />
                    <label htmlFor="loginPassword" className="label">
                        Password
                    </label>
                    <input
                        id="loginPassword"
                        className="form-input"
                        placeholder="Password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData({ ...loginData, password: e.target.value })
                        }
                    />
                    <button type="submit" className="auth-button">
                        LOG IN
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    createUserResponse: state.auth.createUserResponse,
    getUserResponse: state.auth.getUserResponse,
});

export default connect(mapStateToProps, { createUser, getUser })(Login);
