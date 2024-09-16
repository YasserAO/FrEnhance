export default function SignIn() {
  const handleSignIn = () => {
    window.location.href = "/login";
  };

  return (
    <button
      className={`active rounded-md px-2 py-1 font-semibold text-white underline-offset-4 hover:underline active:underline`}
      onClick={() => {
        handleSignIn();
      }}
    >
      Login
    </button>
  );
}
