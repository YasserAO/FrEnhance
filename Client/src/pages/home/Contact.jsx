const Contact = () => {
  return (
    <>
      <div className="px-3 py-10 md:px-[10%]">
        <div className="mb-5">
          <h1 className="mb-5 text-center text-4xl font-bold text-white">
            Reach Out to Us
          </h1>
          <p className="mx-auto max-w-80 text-center text-white md:max-w-[500px] lg:max-w-[800px]">
            Have questions or feedback? We’re here to help. Reach out through
            the following{" "}
          </p>
        </div>
        <div className="mx-auto mb-10 flex w-fit flex-col gap-5 rounded bg-white px-3 py-5 md:px-20">
          <p className="">
            <span className="font-semibold">Email: </span>
            <a
              target="_blank"
              href="mailto:frenhance@gmail.com"
              className="font-semibold text-sky-600"
            >
              frenhance@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold">GitHub: </span>
            <a
              target="_blank"
              href="https://github.com/YasserAO"
              className="font-semibold text-sky-600"
            >
              YasserAO
            </a>
          </p>
        </div>
        <p className="text-center text-white">
          Our support team is ready to assist you and ensure a seamless
          experience. Your input helps us improve and serve you better.
        </p>
      </div>
    </>
  );
};

export default Contact;
