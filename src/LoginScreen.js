import {Login} from "./LoginLogout"

const LoginPage = () => {
    return (
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: "auto"
        }}>
            <Login />
        </div>
    )
}

export default LoginPage;