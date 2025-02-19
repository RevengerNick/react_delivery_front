import api from '../utils/axiosInstance'

type Props = {}

const Profile = (props: Props) => {
    const dishesGet = () => {
        api.get("/dishes")
        .then(function (response) {
            console.log(response.data);
        })
    }
  return (
    <div>Profile
    <button
        onClick={dishesGet}
    >text</button>
    <button
        onClick={() => localStorage.removeItem("accessToken")}
    >Burron</button>
    </div>
  )
}


export default Profile