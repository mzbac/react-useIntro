import React, { useEffect, useState } from "react";

const ReactIntro = props => {
  const [, forceUpdate] = useState();
  let timeoutId;
  const resizeDelay = 30;
  const resizeHandler = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      forceUpdate({});
    }, resizeDelay);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  });
  return props.children;
};

export default ReactIntro;
