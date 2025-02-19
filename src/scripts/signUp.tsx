import { useState } from "react";
import eye from "@/assets/pass/eye.svg";
import eyeOff from "@/assets/pass/eyeOff.svg";

type Props = {
  changeData: React.ChangeEventHandler<HTMLInputElement>;
  submitData: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsLogin: (isLogin: boolean) => void;
  formData: {
    name: string;
    email: string;
    password: string;
  };
};

const SignUp = ({ setIsLogin, changeData, submitData, formData }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <form
        onSubmit={submitData}
        className="pt-4 space-y-4 pb-3 flex flex-col justify-between items-center"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Имя пользователя"
          onChange={changeData}
          className="w-5/6 flex items-center border-b border-gray-400 pb-1 p-3"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="example@gmail.com"
          onChange={changeData}
          className="w-5/6 flex items-center border-b border-gray-400 pb-1 p-3 "
          required
        />
        <div className="relative w-5/6 flex items-center border-b border-gray-400 pb-1 p-3 ">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={changeData}
            className=""
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 hover:opacity-85  duration-100"
            onMouseDown={() => setShowPassword(true)} // Когда зажали кнопку – показываем пароль
            onMouseUp={() => setShowPassword(false)} // Когда отпустили – скрываем
            onMouseLeave={() => setShowPassword(false)}
          >
            {showPassword ? (
              <img src={eye} alt="" />
            ) : (
              <img src={eyeOff} alt="" />
            )}
          </button>
        </div>
        <div className="relative flex w-full justify-center items-center ">
          <button
            type="submit"
            className="w-5/6 py-2 bg-amber-400 text-black font-bold rounded-xl mt-2 hover:bg-amber-300 duration-300"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
      <p className="flex w-full justify-center p-4 bg-white rounded-lg rounded-t-3xl">
        Уже зарегистрированы?
        <button
          onClick={() => setIsLogin(true)}
          className="text-yellow-500 hover:underline ml-1"
        >
          Войти
        </button>
      </p>
    </div>
  );
};

export default SignUp;
