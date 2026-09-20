import mongoose, {Schema} from "mongoose"

const githubUserSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    access_token: {
        type: String
    },
    avatar: {
        type: String
    }
})

export default mongoose.model('GithubUser', githubUserSchema);
// id: id
// name: name
// email: email
// github_access_token: 
