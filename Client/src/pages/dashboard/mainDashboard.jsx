import { TextToolButton } from "../../partials/Buttons/TextToolButton";
export const MainDashboard = () => {
  return (
    <div className="flex w-full flex-col gap-4 px-7 pt-5 md:flex-row">
      <TextToolButton type={1}></TextToolButton>

      <TextToolButton type={2}></TextToolButton>
    </div>
  );
};
