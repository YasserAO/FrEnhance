import { useEffect, useState } from "react";
import SpinLoad from "../../partials/icons/spindLoader";
import { useNavigate, useParams } from "react-router-dom";
import urlVerificationForm from "../../forms/urlverificationForm.mjs";

const URLVerification = () => {
  // Validation Function

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading == false) {
      setTimeout(() => {
        setSpinner(false);
      }, 300);
    }
  }, [loading]);
  useEffect(() => {
    const validateToken = (token) => {
      const hexRegex = /^[a-f0-9]{64}$/i;

      if (!hexRegex.test(token) || token.length !== 64) {
        return false;
      }

      return true;
    };
    const validation = validateToken(id);
    if (validation == false) navigate("/NotFound");
    const postVerification = async () => {
      const response = await urlVerificationForm(id);
      if (!response) {
        console.log("Failed");
      }
      if (response) {
        if (response.status == 200) setColor(true);
        if (response.title) {
          setTitle(response.title);
        }
        if (response.msg) {
          setMessage(response.msg);
        } else setMessage("Something went Wrong please try later");
        setLoading(false);
      }
    };
    postVerification();
  }, []);
  return (
    <div className="px-3 py-10 md:px-[10%]">
      {spinner ? (
        <div className="mx-auto w-fit items-center py-20">{SpinLoad()}</div>
      ) : (
        <>
          <h1
            className={`mx-auto mb-10 w-fit rounded-md bg-white px-10 ${color ? `text-green-500` : `text-red-500`} py-4 text-center text-4xl`}
          >
            {title}
          </h1>
          <p className="text-center text-white">{message}</p>
        </>
      )}
    </div>
  );
};

export default URLVerification;
