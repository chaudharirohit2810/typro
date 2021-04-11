import { useState, useEffect } from "react";

const usePressedKey = () => {
  const [pressedKey, setPressedKey] = useState([]);

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      if (pressedKey === key) {
        setPressedKey("");
      }
      setPressedKey(key);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return [pressedKey, setPressedKey];
};

export default usePressedKey;
