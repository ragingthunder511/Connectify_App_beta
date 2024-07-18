import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc,collection} from "firebase/firestore";//addDoc - to add new document(entry), collection - to specify which table we want to work on
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
export const CreatePostForm=()=>{

    //Define types for schema 
    interface FormTypes{
        title:string;
        description:string;
    };

    //for navigation
    const navigate = useNavigate();
    //Validation of the form
    const schema=yup.object().shape({
        title:yup.string().required("Title is missing"),
        description:yup.string().required("Description is missing"),
    });

    //Interaction with firestore 
    const postRef = collection(db,"posts");
    const [user]=useAuthState(auth);

    //After submit is clicked 
    const onFormSubmit= async (data:FormTypes)=>{
        await addDoc(postRef,{
           title:data.title,
           description:data.description,
           userId:user?.uid,
           username:user?.displayName
        })
        navigate('/');
    }
    
    //useForm syntax 
    const {register,handleSubmit,formState:{errors}}=useForm<FormTypes>({
        resolver:yupResolver(schema),
    });

    //UI 
    return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
        <input placeholder="Title..." {...register("title")}/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description..." {...register("description")}/>
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type="submit" className="submitForm"/>
    </form>
)};