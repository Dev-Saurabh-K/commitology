function App() {
  const loginWithGithub = () => {
    window.location.href = "http://localhost:8000/auth/github";
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div className="bg-amber-400">
        <button onClick={loginWithGithub}>Continue with GitHub</button>
      </div>

      <div className="bg-red-400 size-10" onClick={logout}>logout</div>
    </>
  );
}

export default App;
