export const VerifictionBar = () => {
  return (
    <div className="flex items-center justify-center bg-violet-600 px-3 py-2 text-white md:px-[10%]">
      <p>Please Verify your Email by Clicking here </p>
      <a
        href="/verify"
        className="ml-2 rounded-md border border-black bg-white px-2 text-sm font-semibold text-black"
      >
        Verify
      </a>
    </div>
  );
};
