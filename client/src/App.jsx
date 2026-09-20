

function App() {
  const loginWithGithub = () => {
        window.location.href =
            "http://localhost:8000/auth/github";
    };
  return (
    <>
    <div className="bg-amber-400">
      <button onClick={loginWithGithub}>
            Continue with GitHub
        </button>
    </div>
    </>
  )
}

export default App
