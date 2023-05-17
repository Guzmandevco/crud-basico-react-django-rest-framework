import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
// import moon  from "../../node_modules/font-awesome/css";
const body = document.querySelector("body");
function Toggle() {
  const { dark, dataFromLocalStorage, changetheme } = useContext(DataContext);
  const getThemeFromLocalStorage = (key) => {
    return localStorage.getItem(key);
  };
  const setDarkLocalStorage = (theme) => {
    localStorage.setItem("dark", theme);
  };
  const changeTheme = () => {
    if (dark) {
      body.classList.remove("active");
      setDarkLocalStorage(dark);
    } else {
      body.classList.add("active");
      setDarkLocalStorage(dark);
    }
    changetheme(!dark);
  };

  useEffect(() => {
    if (getThemeFromLocalStorage("dark") == "false") {
      body.classList.add("active");
      changetheme(true);
    } else {
      body.classList.remove("active");
      changetheme(false);
    }
  }, []);

  return (
    <div
      className={`toggle ${
        getThemeFromLocalStorage("dark") === "true" ? "active" : "",
        dark ? "active" : ""
      }`}
      onClick={() => changeTheme()}
    >
      <span>
      <i className={`fa ${!dark ? 'fa-moon-o' : 'fa-sun-o'}`} aria-hidden="true"></i>
      </span>
    </div>
  );
}

export default Toggle;
