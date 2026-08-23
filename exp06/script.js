const params = new URLSearchParams(location.search);
const username = params.has("demo") ? "user-that-does-not-exist-xyz" : "ufraaan";

async function fetchGitHubUser(username) {
    const status = document.querySelector("#githubStatus");
    const avatar = document.querySelector("#githubAvatar");
    const followers = document.querySelector("#followers");
    const repos = document.querySelector("#repos");

    status.textContent = "Loading...";

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok)
            throw new Error("User not found");

        const data = await response.json();

        avatar.src = data.avatar_url;
        status.textContent = `GitHub: ${data.login}`;
        followers.textContent = `Followers: ${data.followers}`;
        repos.textContent = `Public Repositories: ${data.public_repos}`;

    } catch (error) {
        console.error(error);
        status.textContent = "Failed to load GitHub data.";
    }
}

setTimeout(() => fetchGitHubUser(username), 2000);