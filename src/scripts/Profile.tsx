import api from "../utils/Static/axiosInstance";

type Props = {};

const Profile = (props: Props) => {
  const dishesGet = () => {
    api.get("/dishes").then(function (response) {
      console.log(response.data);
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bottom-10 bg-gray-500">
      <div className="flex min-w-120 min-h-screen bg-gray-100">
        Profile
        <button type="button" onClick={dishesGet}>
          text
        </button>
        <button
          type="button"
          onClick={() => localStorage.removeItem("accessToken")}
        >
          Burron
        </button>
      </div>
    </div>
  );
};

export default Profile;
