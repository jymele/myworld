const normalizeAngle = (angle: number) => {
  while (angle < -Math.PI) {
    angle += Math.PI * 2;
  }
  while (angle > Math.PI) {
    angle -= Math.PI * 2;
  }
  return angle;
};

const lerpAngle = (start: number, end: number, t: number) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  //   if (Math.abs(end - start) > Math.PI) {
  //     if (end > start) {
  //       start += Math.PI * 2;
  //     } else {
  //       end += Math.PI * 2;
  //     }
  //   }

  return start + (end - start) * t;
};

export { normalizeAngle, lerpAngle };
