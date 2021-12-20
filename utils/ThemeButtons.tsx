import { useTheme } from "next-themes";

export const ThemeButtons = () => {
  const { theme, setTheme } = useTheme();

  const buttonHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div
      className="flex h-9 w-[60px] bg-blue-500 items-center rounded-full group cursor-pointer relative overflow-hidden"
      onClick={buttonHandler}
    >
      <div className="absolute -left-10 dark:left-[18px] w-6 h-6 rounded-full overflow-hidden bg-blue-500 transition-all duration-200 z-20" />
      <div className="mx-2 w-6 h-6 rounded-full overflow-hidden bg-gray-100  dark:ml-[27px] transition-all duration-200 z-10" />
    </div>
  );
};
