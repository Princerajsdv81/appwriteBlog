import conf from "../conf/conf";
import { Client, ID ,Databases,Storage,Query} from "appwrite";

export class Service{
    client =new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    //create post
    async createPost({title,slug,content,featuredImage,status,userId}){

       try{
           return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                 content,
                 featuredImage,
                 status,
                 userId
            }
           )
       }catch(error){
        console.log("Appwrite server:: createPost::error",error);
       }

    }
       //Update post
        async updatePost(slug,{title,content,featuredImage,status}){

        try{
            return await this.databases.updateDocument(
             conf.appwriteDatabaseId,
             conf.appwriteCollectionId,
             slug,  //in place of document id
             {
                 title,
                  content,
                  featuredImage,
                  status,
             }
            )
        }catch(error){
         console.log("Appwrite server:: updatePost::error",error);
        }

       }

       //Delete Post
        async deletePost(slug){

        try{
            return await this.databases.deleteDocument(
             conf.appwriteDatabaseId,
             conf.appwriteCollectionId,
             slug,  //in place of document id
          
            )
            return true;
        }catch(error){
         console.log("Appwrite server:: deletePost::error",error);
         return false;
        }

       }

       //getPost
        async getPost(slug){

        try{
            return await this.databases.getDocument(
             conf.appwriteDatabaseId,
             conf.appwriteCollectionId,
             slug,  //in place of document id
          
            )
            return true;
        }catch(error){
         console.log("Appwrite server:: getPost::error",error);
         return false;
        }

       }
       //For all Post
       async getPosts(queries=[Query.equal("status",
       "active")]){

        try{
            return await this.databases.listDocuments(
             conf.appwriteDatabaseId,
             conf.appwriteCollectionId,
             queries,  //in place of document id
          
            )
        }catch(error){
         console.log("Appwrite server:: getPosts::error",error);
         return false;
        }

       }

       //File upload services
      //create file
       async uploadFile(file){
        try{
         return await this.bucket.createFile(
            conf.appwriteBuketId,
            ID.unique(),
            file
         )
        }catch(error){
            console.log("Appwrite service::uploadFile::error",error);
            return false;
        }
       }

       //DeleteFile

       async deleteFile(fileId){
        try{
         return await this.bucket.deleteFile(
            conf.appwriteBuketId,
            fileId
         )
         return true;
        }catch(error){
            console.log("Appwrite service::uploadFile::error",error);
            return false;
        }
       }
       //get file preview
     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBuketId,
            fileId
        )
       }
}


const service=new Service()
export default service;