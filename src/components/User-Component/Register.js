import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { db } from "../../Firebase/Config";
import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [changeWidthTimer, setChangeWidthTimer] = useState(false);
  const [registerValue, setRegisterValue] = useState({
    name: { value: "", state: false },
    email: { value: "", state: false },
    username: { value: "", state: false },
    password: { value: "", state: false },
    confirmPassword: { value: "", state: false },
  });

  const onChangeInput = (e, charNumber) => {
    let validateValue;
    let name = e.target.name;
    let format;
    if (name == "name") {
      format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    } else {
      format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    }

    if (
      e.target.value.length > 6 &&
      e.target.value.length < charNumber &&
      !format.test(e.target.value)
    ) {
      validateValue = { value: e.target.value, state: true };
    } else {
      validateValue = { value: e.target.value, state: false };
    }

    if (name == "confirmPassword") {
      if (e.target.value == registerValue.password.value) {
        validateValue = { value: e.target.value, state: true };
      } else {
        validateValue = { value: e.target.value, state: false };
      }
    }

    setRegisterValue({
      ...registerValue,
      [name]: validateValue,
    });
  };

  const onChangeEmailInput = (e) => {
    let validateValue;
    let checkFormat = String(e.target.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (checkFormat && e.target.value.includes("@gmail.com")) {
      validateValue = { value: e.target.value, state: true };
    } else {
      validateValue = { value: e.target.value, state: false };
    }

    setRegisterValue({
      ...registerValue,
      email: validateValue,
    });
  };

  const handleOnSubmitRegisterForm = async (e) => {
    e.preventDefault();
    for (const val of Object.entries(registerValue)) {
      if (!val[1].state) {
        return toast.error("OOP! Something wrong in your register form!", {
          duration: 1500,
        });
      }
    }

    let userData = {
      displayName: registerValue.name.value,
      userName: registerValue.username.value,
      password: registerValue.password.value,
      email: registerValue.email.value,
      avatar: "",
      phoneNumber: "",
      gender: "other",
      address: [],
      cartItems: [],
      orders: [],
      loveProducts: [],
      notifications: [],
      createdAt: Timestamp.fromDate(new Date()),
    };
    const docUsername = doc(db, "user", userData.userName);
    const docUsernameSnap = await getDoc(docUsername);

    if (docUsernameSnap.exists()) {
      return toast.error("OOP! Have the same username before", {
        duration: 1500,
      });
    }

    const docEmail = query(
      collection(db, "user"),
      where("email", "==", userData.email)
    );
    const docEmailSnap = await getDocs(docEmail);
    docEmailSnap.forEach(() => {
      return toast.error("OOP! This email authorized before", {
        duration: 1500,
      });
    });
    toast.success("Registed successfully", { duration: 1500 });
    setDoc(doc(db, "user", registerValue.username.value), userData);
    return navigate("/login");
  };

  useEffect(() => {
    const setTimer = setTimeout(() => {
      setChangeWidthTimer(true);
    }, 200);
    return () => {
      clearTimeout(setTimer);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          changeWidthTimer ? "w-full" : "w-0"
        } h-full flex flex-col items-center transition-all duration-100 overflow-hidden`}
      >
        <div className="w-full h-full flex flex-col items-center gap-3 justify-center lg:gap-2">
          <h1 className="text-3xl font-lobster">Sign up</h1>
          <form
            className="flex flex-col w-full items-center gap-4 lg:gap-3"
            spellCheck={false}
          >
            <div
              className={`w-[60%] ${
                registerValue.name.value.length != 0 && "relative"
              }`}
            >
              <input
                type="text"
                className={`w-full form-control border border-solid border-gray-300 rounded transition ${
                  registerValue.name.value.length == 0
                    ? "focus:border-blue-600"
                    : registerValue.name.state
                    ? "focus:border-green-400"
                    : "focus:border-red-400"
                } focus:outline-none focus:text-gray-700 p-1 placeholder:italic placeholder:text-[0.7rem] text-[0.7rem]`}
                placeholder="Name..."
                name="name"
                value={registerValue.name.value}
                onChange={(e) => {
                  onChangeInput(e, 13);
                }}
              />
              <div
                className={`absolute right-1 top-1 ${
                  (registerValue.name.value.length != 0 &&
                    registerValue.name.value.length < 6) ||
                  (registerValue.name.value.length > 12 &&
                    !registerValue.name.state)
                    ? ""
                    : "hidden"
                }`}
              >
                <XCircleIcon className={`w-5 h-5 fill-red-400 stroke-white`} />
              </div>
              <div
                className={`absolute right-1 top-1 ${
                  registerValue.name.state ? "" : "hidden"
                }`}
              >
                <CheckCircleIcon className="w-5 h-5 fill-green-400 stroke-white" />
              </div>
            </div>

            <div
              className={`w-[60%] ${
                registerValue.email.value.length != 0 && "relative"
              }`}
            >
              <input
                type="text"
                className={`w-full form-control border border-solid border-gray-300 rounded transition focus:border-blue-600 focus:outline-none focus:text-gray-700 p-1 placeholder:italic placeholder:text-[0.7rem] text-[0.7rem] ${
                  registerValue.email.value.length == 0
                    ? "focus:border-blue-600"
                    : registerValue.email.state
                    ? "focus:border-green-400"
                    : "focus:border-red-400"
                }`}
                placeholder="Email adress..."
                name="email"
                value={registerValue.email.value}
                onChange={(e) => {
                  onChangeEmailInput(e);
                }}
              />

              <div
                className={`absolute right-1 top-1 ${
                  registerValue.email.value.length > 0 &&
                  !registerValue.email.state
                    ? ""
                    : "hidden"
                }`}
              >
                <XCircleIcon className={`w-5 h-5 fill-red-400 stroke-white`} />
              </div>

              <div
                className={`absolute right-1 top-1 ${
                  registerValue.email.state ? "" : "hidden"
                }`}
              >
                <CheckCircleIcon className="w-5 h-5 fill-green-400 stroke-white" />
              </div>
            </div>

            <div
              className={`w-[60%] ${
                registerValue.username.value.length != 0 && "relative"
              }`}
            >
              <input
                type="text"
                className={`w-full form-control border border-solid border-gray-300 rounded transition focus:border-blue-600 focus:outline-none focus:text-gray-700 p-1 placeholder:italic placeholder:text-[0.7rem] text-[0.7rem] ${
                  registerValue.username.value.length == 0
                    ? "focus:border-blue-600"
                    : registerValue.username.state
                    ? "focus:border-green-400"
                    : "focus:border-red-400"
                }`}
                placeholder="Username..."
                name="username"
                value={registerValue.username.value}
                onChange={(e) => {
                  onChangeInput(e, 16);
                }}
              />

              <div
                className={`absolute right-1 top-1 ${
                  registerValue.username.value.length != 0 &&
                  !registerValue.username.state
                    ? ""
                    : "hidden"
                }`}
              >
                <XCircleIcon className={`w-5 h-5 fill-red-400 stroke-white`} />
              </div>

              <div
                className={`absolute right-1 top-1 ${
                  registerValue.username.state ? "" : "hidden"
                }`}
              >
                <CheckCircleIcon className="w-5 h-5 fill-green-400 stroke-white" />
              </div>
            </div>

            <div
              className={`w-[60%] ${
                registerValue.password.value.length != 0 && "relative"
              }`}
            >
              <input
                type="password"
                className={`w-full form-control border border-solid border-gray-300 rounded transition focus:border-blue-600 focus:outline-none focus:text-gray-700 p-1 placeholder:italic placeholder:text-[0.7rem] text-[0.7rem] ${
                  registerValue.password.value.length == 0
                    ? "focus:border-blue-600"
                    : registerValue.password.state
                    ? "focus:border-green-400"
                    : "focus:border-red-400"
                }`}
                placeholder="Password..."
                name="password"
                value={registerValue.password.value}
                onChange={(e) => {
                  onChangeInput(e, 20);
                }}
              />

              <div
                className={`absolute right-1 top-1 ${
                  registerValue.password.value.length != 0 &&
                  !registerValue.password.state
                    ? ""
                    : "hidden"
                }`}
              >
                <XCircleIcon className={`w-5 h-5 fill-red-400 stroke-white`} />
              </div>

              <div
                className={`absolute right-1 top-1 ${
                  registerValue.password.value.length > 0 &&
                  registerValue.password.state
                    ? ""
                    : "hidden"
                }`}
              >
                <CheckCircleIcon className="w-5 h-5 fill-green-400 stroke-white" />
              </div>
            </div>

            <div
              className={`w-[60%] ${
                registerValue.confirmPassword.value.length != 0 && "relative"
              }`}
            >
              <input
                type="password"
                className={`w-full form-control border border-solid border-gray-300 rounded transition focus:border-blue-600 focus:outline-none focus:text-gray-700 p-1 placeholder:italic placeholder:text-[0.7rem] text-[0.7rem] ${
                  registerValue.confirmPassword.value.length == 0
                    ? "focus:border-blue-600"
                    : registerValue.confirmPassword.state
                    ? "focus:border-green-400"
                    : "focus:border-red-400"
                }`}
                placeholder="Confirm password..."
                name="confirmPassword"
                value={registerValue.confirmPassword.value}
                onChange={(e) => {
                  onChangeInput(e, 20);
                }}
              />

              <div
                className={`absolute right-1 top-1 ${
                  registerValue.confirmPassword.value.length != 0 &&
                  !registerValue.confirmPassword.state
                    ? ""
                    : "hidden"
                }`}
              >
                <XCircleIcon className={`w-5 h-5 fill-red-400 stroke-white`} />
              </div>

              <div
                className={`absolute right-1 top-1 ${
                  registerValue.confirmPassword.value.length > 0 &&
                  registerValue.confirmPassword.state
                    ? ""
                    : "hidden"
                }`}
              >
                <CheckCircleIcon className="w-5 h-5 fill-green-400 stroke-white" />
              </div>
            </div>

            <button
              type="submit"
              className="inline-block px-5 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={handleOnSubmitRegisterForm}
            >
              Sign up
            </button>

            <p className="text-[0.8rem] sm:hidden">
              Click to{" "}
              <Link to="/login" className="text-blue-400">
                Sign in
              </Link>
            </p>
            <div className="hidden sm:flex items-center flex-col">
              <p className="text-[0.8rem]">
                Click to{" "}
                <Link to="/login" className="text-blue-400">
                  Signin
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
