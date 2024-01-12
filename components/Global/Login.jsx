import React, { useState, useEffect } from 'react'

const Login = ({ axios, setActiveComponent, notifyError, notifySuccess }) => {
  const [user, setUser] = useState({

    password: "",

  })

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value })
  };

  const apiLogin = async (e) => {
    e.preventDefault();
    if (user.email == "" || user.password == "") {
      return notifyError("Please Provide email and password")
    }
    notifySuccess("Wait loggging to your account...");

    try {
      // Api call
      const response = await axios({
        method: "POST",
        url: `/api/v1/user/login`,
        baseURL: "https://crypto-bot-backend.vercel.app/",
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        }
      });

      if (response.data.status == 'success') {
        notifySuccess("Account Created Successfully");
        localStorage.setItem(
          "USER_MEMBERSHIP",
          response.data.data.user.membershipType
        );
        localStorage.setItem(
          "CryptoBot_BackEnd",
          response.data.data.user._id
        );
        localStorage.setItem(
          "CryptoAUTH_TOKEN",
          response.data.token
        );
        window.location.reload();
      } else if (response.data.status == "fail") {
        notifyError(response.data.message);
    }
    }
    catch (error) {
    console.log(error);
  }
}


return (
  <div className='techwave_fn_sign'>
    <div className="sign__content">
      <h1 className="logo">Designed by Dhruv</h1>
      <form className='login' >
        <div className="form__content">
          <div className="form__title">Sign In</div>
          
          <div className="form__username">
            <label htmlFor="user_login">Email</label>
            <input type="text" className='input' onChange={(e) => handleFormFieldChange("email", e)} />
          </div>
          <div className="form__username">
            <label htmlFor="user_login">Password</label>
            <input type="text" className='input' onChange={(e) => handleFormFieldChange("password", e)} />
          </div>
          


          <div className="form__alternative">
            <a onClick={(e) => apiLogin(e)} className='techwave_fn_button'>
              <span>Log In</span>
            </a>
          </div>

        </div>
      </form>
      <div className="sign__desc">
        <p>Not a member?
          <a onClick={() => setActiveComponent("Signup")}>Sign Up</a></p>
      </div>
    </div>
  </div>
)
}

export default Login
