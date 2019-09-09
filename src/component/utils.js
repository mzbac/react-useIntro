export const getContainerSize = ref => {
  if (ref) {
    return {
      width: ref.offsetWidth,
      height: ref.offsetHeight
    };
  }

  return {
    width: 0,
    height: 0
  };
};

export const getContainerPosition = ({
  position,
  arrowPosition,
  targetRef,
  containerSize,
  positionMargin = 0
}) => {
  if (!targetRef) return {};
  if (!containerSize) return {};

  const targetElmPosition = targetRef.getBoundingClientRect();
  const scrollY =
    window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
  const scrollX =
    window.scrollX !== undefined ? window.scrollX : window.pageXOffset;
  const top = scrollY + targetElmPosition.top;
  const left = scrollX + targetElmPosition.left;
  const leftWhenPositionLeft = left - containerSize.width - positionMargin;
  const leftWhenPositionRight = left + targetRef.offsetWidth + positionMargin;
  const topWhenPositionLeftOrRightAndArrowTop =
    top + targetRef.offsetHeight / 2 - positionMargin;
  const topWhenPositionLeftOrRightAndArrowBottom =
    top + targetRef.offsetHeight / 2 - containerSize.height + positionMargin;
  const topWhenPositionLeftOrRightAndArrowCenter =
    top + targetRef.offsetHeight / 2 - containerSize.height / 2;
  const leftWhenPositionTopAndArrowCenter =
    left - containerSize.width / 2 + targetRef.offsetWidth / 2;
  const leftWhenPositionTopAndArrowLeft =
    left + targetRef.offsetWidth / 2 - positionMargin;
  const leftWhenPositionTopAndArrowRight =
    left - containerSize.width + targetRef.offsetWidth / 2 + positionMargin;
  const topWhenPositionTopAndArrowCenterOrRightOrLeft =
    top - containerSize.height - positionMargin;
  const topWhenPositionBottomAndArrowCenterOrRightOrLeft =
    top + targetRef.offsetHeight + positionMargin;
  const leftWhenPositionBottomAndArrowCenter =
    left - containerSize.width / 2 + targetRef.offsetWidth / 2;
  const leftWhenPositionBottomAndArrowLeft =
    left + targetRef.offsetWidth / 2 - positionMargin;
  const leftWhenPositionBottomAndArrowRight =
    left - containerSize.width + targetRef.offsetWidth / 2 + positionMargin;

  // default position right arrow center
  const containerPosition = {
    top: topWhenPositionLeftOrRightAndArrowCenter,
    left: leftWhenPositionRight
  };

  if (position === "left") {
    containerPosition.left = leftWhenPositionLeft;

    if (arrowPosition === "top") {
      containerPosition.top = topWhenPositionLeftOrRightAndArrowTop;
    } else if (arrowPosition === "bottom") {
      containerPosition.top = topWhenPositionLeftOrRightAndArrowBottom;
    } else {
      containerPosition.top = topWhenPositionLeftOrRightAndArrowCenter;
    }
  }
  if (position === "right") {
    containerPosition.left = leftWhenPositionRight;

    if (arrowPosition === "top") {
      containerPosition.top = topWhenPositionLeftOrRightAndArrowTop;
    } else if (arrowPosition === "bottom") {
      containerPosition.top = topWhenPositionLeftOrRightAndArrowBottom;
    } else {
      containerPosition.top = topWhenPositionLeftOrRightAndArrowCenter;
    }
  }
  if (position === "top") {
    containerPosition.top = topWhenPositionTopAndArrowCenterOrRightOrLeft;
    if (arrowPosition === "left") {
      containerPosition.left = leftWhenPositionTopAndArrowLeft;
    } else if (arrowPosition === "right") {
      containerPosition.left = leftWhenPositionTopAndArrowRight;
    } else {
      containerPosition.left = leftWhenPositionTopAndArrowCenter;
    }
  }
  if (position === "bottom") {
    containerPosition.top = topWhenPositionBottomAndArrowCenterOrRightOrLeft;

    if (arrowPosition === "left") {
      containerPosition.left = leftWhenPositionBottomAndArrowLeft;
    } else if (arrowPosition === "right") {
      containerPosition.left = leftWhenPositionBottomAndArrowRight;
    } else {
      containerPosition.left = leftWhenPositionBottomAndArrowCenter;
    }
  }

  return containerPosition;
};

export const checkWindowPositionForContainer = ({
  containerPosition,
  containerSize,
  positionMargin = 10,
  position
}) => {
  if (position === "top" || position === "bottom") {
    if (containerPosition.left < 0) {
      return { ...containerPosition, left: positionMargin };
    }

    const rightOffset =
      containerPosition.left + containerSize.width - window.innerWidth;
    if (rightOffset > 0) {
      return {
        ...containerPosition,
        left: window.innerWidth - containerSize.width - positionMargin
      };
    }
  }
  return containerPosition;
};

export const isOffScreen = (position, containerPosition, containerSize) => {
  let offScreen = false;
  if (position === "left" && containerPosition.left < 0) {
    offScreen = true;
  }
  if (
    position === "right" &&
    window.innerWidth < containerPosition.left + containerSize.width
  ) {
    offScreen = true;
  }
  return offScreen;
};
