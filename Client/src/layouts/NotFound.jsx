import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div className="px-3 py-3 text-white md:px-[10%]">
      <div className="mb-5">
        <img
          className="mx-auto block max-w-[250px]"
          src="/7465751.png"
          alt="404"
        />
        <h1 className="text-center text-3xl font-bold"> Page Not Found</h1>
        <p className="text-center">Oops! It seems you've taken a wrong turn.</p>
      </div>

      <div>
        <p className="py-5">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track:
        </p>
        <ul className="flex list-inside list-disc flex-col gap-2 py-2">
          <li>
            Go to{" "}
            <Link className="font-semibold text-amber-300" to={"/"}>
              Home
            </Link>
            : Return to the main page and start fresh.
          </li>
          <li>
            Visit{" "}
            <Link className="font-semibold text-amber-300" to={"/features"}>
              Features:
            </Link>{" "}
            Explore what frEnhance has to offer.
          </li>
          <li>
            Check{" "}
            <Link className="font-semibold text-amber-300" to={"/contact"}>
              Contact:
            </Link>{" "}
            Reach out if you need assistance or have questions.
          </li>
        </ul>
      </div>
      <p className="py-10 text-center">
        If you believe this is an error, please{" "}
        <Link className="font-semibold text-amber-300" to={"/contact"}>
          contact us
        </Link>
        . Thank you for visiting frEnhance!
      </p>
    </div>
  );
};
