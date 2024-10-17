import { MdDeleteOutline } from "react-icons/md";
import { deleteTextForm } from "../../forms/deleteText.mjs";
import { useOutletContext, useParams } from "react-router-dom";
export const DeleteText = ({ id, setDbupdateToggle }) => {
  const handleDelete = async () => {
    let deletedText;
    console.log(id);
    try {
      deletedText = await deleteTextForm(id);
    } catch (err) {
      console.log(err);
    }
    if (deletedText.status === 200) {
      console.log(deletedText);
      setDbupdateToggle((prev) => !prev);

      return;
    }
  };
  return (
    <button
      onClick={handleDelete}
      className={`hover:scale-105 active:scale-95`}
    >
      <MdDeleteOutline color="red" size={"1.5rem"} />
    </button>
  );
};
