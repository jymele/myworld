import React from "react";

export default function Player() {
  return (
    <mesh castShadow>
      <capsuleGeometry args={[1, 2, 8, 12]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}
