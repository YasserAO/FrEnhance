export default function SignIn() {
  const handleSignIn = () => {
    window.location.href = "/login";
  };

  return (
    <button
      className={`rounded-md bg-gray-400 px-2 py-1 font-semibold`}
      onClick={() => {
        handleSignIn();
      }}
    >
      SignIn
    </button>
  );
}
