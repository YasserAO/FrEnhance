export default function SignUp() {
  const handleSignUp = () => {
    window.location.href = "/register";
  };
  return (
    <button
      className={`rounded-md bg-sky-100 px-2 py-1 font-semibold text-gray-600`}
      onClick={() => {
        handleSignUp();
      }}
    >
      Register
    </button>
  );
}
