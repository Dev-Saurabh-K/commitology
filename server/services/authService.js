import GithubUser from '../models/githubUser.js';
import jwt from 'jsonwebtoken';

export const saveGithubUserData = async(userInfo, github_access_token)=>{
    //encrypt token afterwards before storing also make a function to decrypt it in this file
    

    // store 
    try{
        let user = await GithubUser.findOne({
            id: userInfo.id
        });
        if(!user){
            user = await GithubUser.create({
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                avatar: userInfo.avatar_url,
                access_token: github_access_token,
            });
        }else {
            user.name = userInfo.name;
            user.email = userInfo.email;
            user.avatar = userInfo.avatar_url;
            user.access_token = github_access_token;
            await user.save();
        }
        return user;
    }catch(err){
        console.error("Error saving Github user:", err)
        throw err;
    }
};

export const createJWT = async(id, github_access_token)=>{
    const appToken = jwt.sign(
        {
            id: id,
            access_token: github_access_token
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
    return appToken;
}