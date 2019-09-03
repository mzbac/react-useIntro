import React, { useEffect, useState, useRef } from "react";
import Intro from "./intro";
import { getContainerSize, getContainerPosition } from "./utils";
import { getStepManager } from "../stepManager";

const ReactIntro = props => {
  const [, forceUpdate] = useState();
  const [containerSize, setContainerSize] = useState({});
  let timeoutId;
  const resizeDelay = 30;
  const resizeHandler = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      forceUpdate({});
    }, resizeDelay);
  };
  const ref = useRef(null);
  useEffect(() => {
    const newContainerSize = getContainerSize(ref.current);
    if (
      containerSize.width !== newContainerSize.width &&
      containerSize.height !== newContainerSize.height
    ) {
      setContainerSize(newContainerSize);
    }
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  });

  const childrenWithProps = React.Children.map(props.children, child =>
    React.cloneElement(child)
  );

  const containerPosition = getContainerPosition({
    position: props.position,
    arrowPosition: props.arrowPosition,
    targetRef: props.stepMgr.currentStep(),
    containerSize
  });
  console.log(props);
  const style = {
    position: "absolute",
    top: containerPosition.top,
    left: containerPosition.left
  };
  return props.children ? (
    <div style={style} ref={ref}>
      {childrenWithProps}
    </div>
  ) : (
    <div style={style} ref={ref}>
      <Intro />
    </div>
  );
};

export default ReactIntro;
