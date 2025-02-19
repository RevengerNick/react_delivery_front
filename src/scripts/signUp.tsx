type Props = {
  changeData: (React.ChangeEventHandler<HTMLInputElement>);
  submitData: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SignUp = ({changeData, submitData} : Props) => {
  return (
    <div>
      <form onSubmit={submitData} className="pt-4 space-y-4 pb-5 flex flex-col justify-between min-h-[220px] rounded-3xl ">
        <input
          type="text"
          name="name"
          placeholder="Имя пользователя"
          onChange={changeData}
          className="w-full flex items-center border-b border-gray-400 pb-1 p-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeData}
          className="w-full flex items-center border-b border-gray-400 pb-1 p-3 "
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={changeData}
          className="w-full flex items-center border-b border-gray-400 pb-1 p-3 "
          required
        />
        <div className="relative flex w-full justify-center items-center ">
            <button type="submit"
            className="absolute w-5/6 top-[-7px] py-2 bg-white text-black font-bold rounded-xl mt-2 hover:bg-amber-200 duration-300">
              Зарегистрироваться
              </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
