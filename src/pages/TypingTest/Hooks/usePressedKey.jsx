import { useState, useEffect } from "react";

const usePressedKey = () => {
  const [pressedKey, setPressedKey] = useState([]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (pressedKey === e.key) {
        setPressedKey("");
      }
      if (e.keyCode === 32 || e.key === "/" || e.key === "'") {
        e.preventDefault();
      }
      setPressedKey(e.key);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return [pressedKey, setPressedKey];
};

export default usePressedKey;
