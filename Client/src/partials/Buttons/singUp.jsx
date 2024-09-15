export default function SignUp() {
  const handleSignUp = () => {
    window.location.href = "/register";
  };
  return (
    <button
      className={`rounded-md bg-gray-400 px-2 py-1 font-semibold`}
      onClick={() => {
        handleSignUp();
      }}
    >
      SignUp
    </button>
  );
}
