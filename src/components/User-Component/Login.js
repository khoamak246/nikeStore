import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/Config";
import { useDispatch } from "react-redux";
import { userLogin } from "../../App/UserSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputLoginForm, setInputLoginForm] = useState({
    username: "",
    password: "",
  });
  const [changeWidthTimer, setChangeWidthTimer] = useState(false);
  useEffect(() => {
    const setTimer = setTimeout(() => {
      setChangeWidthTimer(true);
    }, 200);
    return () => {
      clearTimeout(setTimer);
    };
  }, []);
  const onChangeInputForm = (e) => {
    let name = e.target.name;
    setInputLoginForm({ ...inputLoginForm, [name]: e.target.value });
  };
  const onSubmitLoginForm = async (e) => {
    e.preventDefault();

    for (const val of Object.entries(inputLoginForm)) {
      if (val[1].length == 0) {
        return toast.error("OOP! You forgot to input something!", {
          duration: 1500,
        });
      }
    }
    const docUsername = doc(db, "user", inputLoginForm.username);
    const docUsernameSnap = await getDoc(docUsername);
    if (!docUsernameSnap.exists()) {
      return toast.error("OOP! Wrong uername!", {
        duration: 1500,
      });
    } else if (docUsernameSnap.data().password !== inputLoginForm.password) {
      return toast.error("OOP! Wrong password!", {
        duration: 1500,
      });
    }
    dispatch(userLogin(inputLoginForm));
    return navigate("/");
  };
  return (
    <>
      <div
        className={`${
          changeWidthTimer ? "w-full" : "w-0"
        } w-full h-full flex justify-center overflow-hidden transition-all duration-100`}
      >
        <div className="flex flex-col items-center w-full gap-3">
          <h1 className="text-3xl font-lobster">Sign in</h1>
          <form className="flex flex-col gap-2 items-center w-full">
            <div className="w-[60%] lg:w-[80%]">
              <input
                type="text"
                className="w-full form-control border border-solid border-gray-300 rounded transition focus:border-blue-600 focus:outline-none focus:text-gray-700 p-1 placeholder:italic placeholder:text-[0.7rem] text-[0.7rem]"
                placeholder="Username..."
                name="username"
                onChange={onChangeInputForm}
              />
            </div>
            <div className="w-[60%] lg:w-[80%]">
              <input
                type="password"
                className="w-full form-control border border-solid border-gray-300 rounded transition focus:border-blue-600 focus:outline-none focus:text-gray-700 p-1 placeholder:italic placeholder:text-[0.7rem] text-[0.7rem]"
                placeholder="Password..."
                name="password"
                onChange={(e) => {
                  onChangeInputForm(e);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-[40%] py-2 inline-block bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={onSubmitLoginForm}
            >
              Sign in
            </button>
            <p className="font-semibold">OR</p>
            <a
              className="px-7 py-3 xxsm:w-[80%] text-white font-medium bg-[#3b5998] text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-[15rem] flex justify-center items-center"
              href="#!"
              role="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Facebook
            </a>
            <a
              className="px-7 py-3 xxsm:w-[80%] text-white font-medium bg-[#ea4335] text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-[15rem] flex justify-center items-center"
              href="#!"
              role="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Googles
            </a>

            <p className="text-[0.8rem] sm:hidden">
              Click to{" "}
              <Link to="/register" className="text-blue-400">
                Signup
              </Link>
            </p>

            <div className="hidden sm:flex items-center flex-col">
              <p className="text-[0.8rem]">
                Click to{" "}
                <Link to="/login" className="text-blue-400">
                  Signup
                </Link>
              </p>
              <p className="text-[0.8rem]">
                Click to{" "}
                <Link to="/" className="text-blue-400">
                  shopping
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
