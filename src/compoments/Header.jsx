import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import iconSun from "../assets/icon-sun.svg";
import iconMoon from "../assets/icon-moon.svg";
const Header = () => {
  const { isLight, ChangeTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <h1 className="tittle">TODO</h1>
      <button onClick={ChangeTheme} className="btn">
        <img src={`${isLight ? iconMoon : iconSun}`} alt="" />
      </button>
    </header>
  );
};
export { Header };
