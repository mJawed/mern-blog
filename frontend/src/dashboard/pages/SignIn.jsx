import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {signInStart, signInSuccess, signInFailur } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";


function SignIn() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const formDataEntry = { username, password };

  const [formData, setFormData] = useState(formDataEntry);
  //const [errorMessage, setErrorMessage] = useState(null);
  //const [loading, setLoading] = useState(false);

  const{loading, error:errorMessage} = useSelector(state => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);
    console.log("Form Submitted");

    if (!formData.username || !formData.password) {
      let missingFields = [];

      if (!formData.username) {
        missingFields.push("Username");
      }
      if (!formData.password) {
        missingFields.push("Password");
      }

      const errorMessage = `${missingFields.join(", ")} ${
        missingFields.length > 1 ? "are" : "is"
      } mandatory`;
      //return setErrorMessage(errorMessage);
      return dispatch(signInFailur(errorMessage))
    }

    try {
      //setLoading(true);
      //setErrorMessage(null);

      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      //console.log(data);
      if (data.success === false) {
        //console.log("kuch gadabad hai");
        //setErrorMessage(data.message);
        dispatch(signInFailur(data.message));
      }
      setLoading(false);
      if (res.ok) {
        navigate("dashboard/signup");
        dispatch(signInSuccess(data))
      }
    } catch (error) {
     // setErrorMessage(error.message);
     // setLoading(false);
     dispatch(signInFailur(error.message));
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Jawed's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
      
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading..</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/dashboard/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="failure" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
