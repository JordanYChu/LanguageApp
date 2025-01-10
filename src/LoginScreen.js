import {Login} from "./LoginLogout"
import background from './assets/gen-background.svg';




const LoginPage = () => {
    return (
        <div>
            <div className="flex h-screen" style={{backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                margin: "auto",
                textAlign: "center" // Center the text
            }}>
                <div className="p-4">
                    <h1 className="text-3xl font-bold">Welcome to LexiLearn</h1>
                </div>
                <Login/>
            </div>
        </div>
        </div>
    )
}

export default LoginPage;