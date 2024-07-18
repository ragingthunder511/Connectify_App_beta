import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { getDocs,collection} from "firebase/firestore";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";
export interface Post{
    id:string;
    userId:string;
    username:string;
    title:string;
    description:string;
}
export const Main=()=>{
    const [postsList,setPostsList]= useState<Post[]|null>(null);
    const postRef = collection(db,"posts");
    const [user] = useAuthState(auth);
    const getPosts = async ()=>{
        const data =await getDocs(postRef);
        setPostsList(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]);
    }
    useEffect(()=>{
        getPosts();
    },[]);
    return <div className="mainPage">{user?postsList?.map((post)=><Post post={post}/>):<h1>Welcome! Login to access what others have posted !</h1>}</div>;
};