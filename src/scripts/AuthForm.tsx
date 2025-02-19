import { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import foodDay from "@/assets/foodDay.svg";
import { motion } from "framer-motion";
import api from "../utils/axiosInstance";

type Props = {};

const AuthForm = ({}: Props) => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signInButton = () => {
    api
      .post("/auth/login", {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        console.log(response.status);
        if (response.status === 201) {
          localStorage.setItem("accessToken", response.data.access_token);
          window.location.href = "/dashboard"
          //setAccessToken(response.data.access_token);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const signUpButton = () => {
    {
      api
        .post("/auth/register", formData)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitData = (e: React.FormEvent) => {
    e.preventDefault();
    {
      isLogin ? signInButton() : signUpButton();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bottom-10 bg-gray-500">
      <motion.div
        key={isLogin ? "login" : "register"}
        initial={{ translateY: -20, opacity: 0 }} // Начальное состояние (скрыто + смещено вверх)
        animate={{ translateY: 0, opacity: 1 }} // Конечное состояние (плавный вход)
        exit={{ translateY: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="p-4 space-y-4"
      >
        <div className="relative bg-opacity-30 bg-gray-100 rounded-2xl backdrop-blur-md p-6 pb-8 text-black w-96">
          <img
            className="flex-auto size-56 p-2"
            src={foodDay}
            alt="Our Restaurant"
          />
          <div className="rounded-tl-4xl rounded-lg bg-orange-50">
            {isLogin ? (
              <div className="">
                <h2 className="flex pl-6 p-4 pb-0 rounded-t-xl text-2xl font-semibold">
                  Войти
                </h2>
                <SignIn
                  formData={formData}
                  setIsLogin={setIsLogin}
                  changeData={changeData}
                  submitData={submitData}
                />
              </div>
            ) : (
              <div>
                <h2 className="flex pl-6 p-4 pb-0 rounded-t-xl text-2xl font-semibold">
                  Регистрация
                </h2>
                <SignUp
                  formData={formData}
                  setIsLogin={setIsLogin}
                  changeData={changeData}
                  submitData={submitData}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
