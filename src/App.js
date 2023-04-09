import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { ReactComponent as Logo } from "./images/logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Logo className="logo" />
        <LoginForm />
      </div>

      <h1 className="heading">
        STARCOMPANY DESIGNS, MANUFACTURES AND <br />
        <span className="heading-part">
          Launches Advanced Rockets and Spacecrafts
        </span>
      </h1>

      <RegisterForm />
    </div>
  );
}

export default App;
