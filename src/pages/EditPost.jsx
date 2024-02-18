import React ,{useEffect,useState} from "react";
import { Container,PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function EditPost(){

    const [post,setPosts]=useState(null)
    const {slug}=useParams()   // url se kuch bhi value nikaalne ke liye useParams use hota hai 
    const navigate =useNavigate()

    useEffect(()=>{
         if(slug){
           appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
           })
         }else{
            navigate('/')
         }
    },[slug,navigate])   //dependency array means agar slug , navigate me kuch v change ho to phir se run kariye
    return post ?(
        <div className=" py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ):null



    
}
export default EditPost