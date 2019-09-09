import React, { useEffect, useState, useRef } from "react";
import {
  getContainerSize,
  getContainerPosition,
  checkWindowPositionForContainer,
  isOffScreen
} from "./utils";

const ReactIntro = props => {
  const [, forceUpdate] = useState();
  const [containerSize, setContainerSize] = useState();
  const [offScreen, setOffScreen] = useState(false);

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
    if (!containerSize) {
      setContainerSize(newContainerSize);
    } else if (
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
    position: offScreen ? props.fallbackPosition : props.position,
    arrowPosition: offScreen
      ? props.fallbackArrowPosition
      : props.arrowPosition,
    targetRef: props.stepMgr.currentStep(),
    containerSize
  });

  const repositionedContainer = checkWindowPositionForContainer({
    containerPosition,
    containerSize: containerSize || {},
    position: offScreen ? props.fallbackPosition : props.position
  });
  const currentOffScreen = isOffScreen(
    offScreen ? props.fallbackPosition : props.position,
    repositionedContainer,
    containerSize
  );

  if (currentOffScreen !== offScreen) {
    setOffScreen(currentOffScreen);
  }

  const style = {
    position: "absolute",
    top: repositionedContainer.top,
    left: repositionedContainer.left
  };

  return (
    <div style={style} ref={ref}>
      {childrenWithProps}
    </div>
  );
};

export default ReactIntro;
