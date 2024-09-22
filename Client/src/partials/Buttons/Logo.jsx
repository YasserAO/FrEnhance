export const Logo = () => {
  return (
    <div
      onClick={() => {
        window.location.href = "/";
      }}
      className="h-fit w-fit cursor-pointer select-none rounded-3xl bg-white px-2 py-1 font-semibold"
    >
      FrenchEnhance
    </div>
  );
};

export const LogoDash = () => {
  return (
    <div
      onClick={() => {
        window.location.href = "/dashboard";
      }}
      className="h-fit w-fit cursor-pointer select-none rounded-3xl bg-white px-2 py-1 font-semibold"
    >
      FrenchEnhance
    </div>
  );
};
