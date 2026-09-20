export const fetchGithubUserInformation = async (githubAccessToken) => {
    const githubUserResponse = await fetch(
        "https://api.github.com/user",
        {
            headers: {
                Authorization: `Bearer ${githubAccessToken}`,
                Accept: "application/vnd.github+json",
                "User-Agent": "commitology"
            }
        }
    );
    const githubUser = await githubUserResponse.json();
    return githubUser;
};

export const fetchGithubUserEmail = async (githubAccessToken) => {
    const emailResponse = await fetch(
        "https://api.github.com/user/emails",
        {
            headers: {
                Authorization: `Bearer ${githubAccessToken}`,
                Accept: "application/vnd.github+json",
                "User-Agent": "commitology"
            }
        }
    );
    const emails = await emailResponse.json();
    const primaryEmail = emails.find(
        email => email.primary && email.verified
    );
    return (primaryEmail?.email);
}