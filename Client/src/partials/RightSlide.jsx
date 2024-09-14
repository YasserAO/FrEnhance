const RightSlide = (props) => {
  return (
    <div className="h-[90%] w-full rounded-xl bg-slate-500 md:h-full">
      {props.children}
    </div>
  );
};

export default RightSlide;
