import { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import foodDay from "../../assets/foodDay.svg"
import { motion } from "framer-motion"
import api from "../utils/axiosInstance"

type Props = {
};

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
    
    <div className="flex justify-center items-center min-h-screen bottom-10 bg-amber-100">
      <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0.5, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4 space-y-4"
        >
      <div className="relative bg-opacity-30 backdrop-blur-md border border-white/30 rounded-2xl p-6 pb-10 text-white w-96">
        <img className="flex-auto size-50" src={foodDay} alt="Our Restaurant" />
        <div className="flex">
          <button
            className={`flex-1 py-2 rounded-t-xl text-lg font-semibold ${
              isLogin ? "bg-white text-black" : "hover:bg-gray-700 duration-300 bg-transparent"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Войти
          </button>
          <button
            className={`flex-1 py-2 rounded-t-xl text-lg font-semibold ${
              !isLogin ? "bg-white text-black " : "hover:bg-gray-700 duration-300 bg-transparent"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Создать
          </button>
        </div>
        <div className="outline-2 outline-offset-[-2px] rounded-b-lg">
        {isLogin ? (
          <SignIn
            changeData={changeData}
            submitData={submitData}
          />
        ) : (
          <SignUp
            changeData={changeData}
            submitData={submitData}
          />
        )}
        </div>
      </div>
      </motion.div>
    </div>
   
  );
};

export default AuthForm;
