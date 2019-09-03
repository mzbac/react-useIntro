const isInputValid = (value, validArray = []) => {
  return validArray.includes(value);
};

export const validateIntroPosition = position => {
  const validValues = ["top", "right", "bottom", "left"];
  const defaultPosition = "bottom";
  return isInputValid(position, validValues) ? position : defaultPosition;
};
export const validateIntroArrowPosition = (arrowPosition, position) => {
  const validValues = {
    top: ["center", "left", "right"],
    right: ["center", "left", "right"],
    bottom: ["center", "left", "right"],
    left: ["center", "left", "right"]
  };

  const defaultArrowPosition = "center";

  return isInputValid(arrowPosition, validValues[position])
    ? arrowPosition
    : defaultArrowPosition;
};

export const createPortalNode = () => {
  const portal = document.createElement("div");
  document.body.appendChild(portal);
  return portal;
};
