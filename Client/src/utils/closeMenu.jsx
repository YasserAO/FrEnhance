import { useEffect } from "react";

const useClickOutside = (ref, onClickOutside, ignoredRef = null) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!ignoredRef || !ignoredRef.current.contains(event.target))
      ) {
        onClickOutside(); // Call the passed function
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onClickOutside]);
};

export default useClickOutside;
