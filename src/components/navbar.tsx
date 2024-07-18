import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  //for signing out 
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };
  //UI
  return (
    <div className="navbar">
      <div className="logo">
        <img src="C:\Users\hp\Downloads\8fbf71ea602e4fa6aeeb018a09b60ef0.png"></img>
      </div>
      <div className="links">
        <Link to="/"> Home </Link>
        {
          user?<Link to="/createpost">Create Post</Link>:<Link to="/login"> Login </Link>
        }
      </div>
      <div className="user">
        {user && (
          <div>
            <p> {user?.displayName} </p>
            <img src={user?.photoURL || ""} width="20" height="20" />
            <button onClick={signUserOut}> Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};