import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ReactIntro from "./reactIntro";
import { getStepManager } from "./stepManager";
import {
  createPortalNode,
  validateIntroPosition,
  validateIntroArrowPosition
} from "./utils";
export let useStep;

export const useIntro = (config = {}) => {
  const { position, arrowPosition, onNext, onPrevious } = config;
  const portal = createPortalNode();
  const [steps, setSteps] = useState([]);
  const stepMgr = getStepManager(steps, onNext, onPrevious);
  useStep = () => {
    const inputEl = useRef(null);
    useEffect(() => {
      setSteps([...steps, inputEl.current]);
    }, []);
    return inputEl;
  };
  return () =>
    createPortal(
      <ReactIntro
        stepMgr={stepMgr}
        position={validateIntroPosition(position)}
        arrowPosition={validateIntroArrowPosition(arrowPosition)}
      />,
      portal
    );
};
