import { Link } from "react-router-dom";
import Signupform from "./SignupForm";
import Card from "../UI/Card";

import "./Signup.css";

const Signup = function () {
  return (
    <Card>
      <Link to="/login" className="back">
        &larr;
      </Link>
      <h3 className="signup-title">create account</h3>
      <Signupform />
    </Card>
  );
};

export default Signup;
