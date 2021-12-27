import { useTheme } from "next-themes";

export const ThemeButtons = () => {
  const { theme, setTheme } = useTheme();

  const buttonHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div
      className="flex h-[30px] w-[50px] bg-blue-500 items-center rounded-full group cursor-pointer relative overflow-hidden"
      onClick={buttonHandler}
    >
      <div className="absolute -left-10 dark:left-[20px] w-4 h-4 rounded-full overflow-hidden bg-blue-500 transition-all duration-200 z-20" />
      <div className="mx-1 w-5 h-5 rounded-full overflow-hidden bg-gray-100  dark:ml-[23px] transition-all duration-200 z-10" />
    </div>
  );
};
