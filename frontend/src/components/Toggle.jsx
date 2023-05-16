import { useState } from "react";
const body = document.querySelector('body');
function Toggle() {
    const [theme, setTheme] = useState(false);
    const changeTheme = () => {
        setTheme(!theme);
        if (!theme) {
            body.classList.add('active');
        } else {
            body.classList.remove('active');
        }
    }
    return (
    <div className={`toggle ${theme ? 'active' : ''}`} onClick={() => changeTheme()}>
      <span></span>
    </div>
  );
}

export default Toggle;
