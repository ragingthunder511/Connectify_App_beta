import {Post as IPost} from "./main";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props{
    post:IPost;
}

interface Like{
    userId:string;
    postId:string;
}

export const Post=(props:Props)=>{
    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes,setLikes]=useState<Like[] | null>(null);
    const likesRef = collection(db,"likes");


    const likesDoc = query(likesRef,where("postId","==",post.id));

    const getLikes = async()=>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({userId:doc.data().userId,postId:doc.data().postId})));
    }

    const hasUserLiked = likes?.find((like)=>like.userId===user?.uid);

    useEffect(()=>{
        getLikes();
    },[]);

    const addLike= async ()=>{
    try{
            await addDoc(likesRef,{
                userId:user?.uid,
                postId:post.id
            });
            user&&setLikes((prev)=>(prev?[...prev,{userId:user?.uid,postId:post.id}]:[{userId:user?.uid,postId:post.id}]));
    }
    catch(err){
        console.log(err);
    }
    }

    const removeLike= async ()=>{
        try{
                const likeToBeDeletedQuery = query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid));
                const likeToBeDeletedData = await getDocs(likeToBeDeletedQuery);
                const likeToBeDeleted = doc(db,"likes",likeToBeDeletedData.docs[0].id);
                await deleteDoc(likeToBeDeleted);
                setLikes((prev)=>(prev&&prev?.filter((like)=>!(like.postId===likeToBeDeletedData.docs[0].data().postId&&like.userId===likeToBeDeletedData.docs[0].data().userId))));
        }
        catch(err){
            console.log(err);
        }
        }
    
    return (
    <div>
        <div className="title">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>@{post.username}</p>
            <button onClick={ hasUserLiked?removeLike:addLike}>{hasUserLiked?<>&#128078;</>:<>&#128077;</>}</button>
            {likes?<p>Likes:{likes.length}</p>:<></>}
        </div>
    </div>
    )
};