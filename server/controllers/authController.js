import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { fetchGithubUserInformation } from '../services/UserInformation.js';
import crypto from 'crypto';
import { saveGithubUserData, createJWT } from '../services/authService.js';

export const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: "Invalid credentials " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "50h" });
    res.json({ token });
};

//github auth
export const github = async (req, res) => {
    const state = crypto.randomBytes(32).toString("hex");

    res.cookie("github_oauth_state", state, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
        maxAge: 10 * 60 * 1000
    });

    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
        scope: "read:user user:email",
        state
    });

    res.redirect(
        `https://github.com/login/oauth/authorize?${params.toString()}`
    );
};

export const github_callback = async (req, res) => {
    try {
        const { code, state } = req.query;

        // const savedState = req.cookies.github_oauth_state;

        // if(!state || state !== savedState){
        //     return res.status(400).send("Invalid OAuth state");
        // }
        //     if (!code) {
        // return res.status(400).send("Missing authorization code");
        // }
        // Continue...
        console.log(code);
        console.log(state);

        const tokenResponse = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                    redirect_uri: process.env.GITHUB_CALLBACK_URL
                })
            }
        );

        const tokenData = await tokenResponse.json();
        const githubAccessToken = tokenData.access_token;
        console.log("github access token: ", githubAccessToken);
        const userInfo = await fetchGithubUserInformation(githubAccessToken);
        await saveGithubUserData(userInfo, githubAccessToken);
        const appToken = await createJWT(userInfo.id, githubAccessToken);

        res.cookie("access_token", appToken, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.redirect(`${process.env.FRONTEND_URL}`);

    } catch (error) {
        console.error(error);
        res.status(500).send("Authentication failed");
    }
};
