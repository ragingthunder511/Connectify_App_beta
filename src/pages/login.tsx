import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  //Signing in and collecting the data in auth
  const signInWithGoogle = async () => { 
    const result = await signInWithPopup(auth, provider);
      console.log(result);;
    navigate("/");
  };
 //UI 
  return (
    <div>
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};