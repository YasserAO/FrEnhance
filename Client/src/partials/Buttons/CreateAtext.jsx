import { MdOutlineCreateNewFolder } from "react-icons/md";

export const CreateAText = () => {
  return (
    <div className="group flex h-60 max-w-60 flex-col items-center justify-center rounded-lg border-4 border-gray-300">
      <h1 className="groupe-hov text-lg text-gray-400">Create a Text</h1>
      <MdOutlineCreateNewFolder size={"2rem"} className="text-gray-400" />
    </div>
  );
};
