import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async creatAccount({email,password,name}){
        try{
         const userAccount=await this.account.create(ID.unique(),email,password,name);
         if(userAccount){
            //call another method
           return this.login({email,password}); 
         }else{
            return  userAccount;
         }
        }catch(error){
            throw error;
        }
    }
//Login
    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }catch (error){
            throw error;
        }
    }

    //To get current user
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch (error){
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }
    //Logout
    async logout(){
        try{
            return await this.account.deleteSessions();
        }catch (error){
            // throw error; or
            console.log("Appwrite server:: logout::error",error);
        }
    }
    
}

const authService=new AuthService();


export default authService
