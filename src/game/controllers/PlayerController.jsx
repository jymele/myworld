import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Player from "../models/Player";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";

export default function PlayerController() {
  const rb = useRef();
  const [, get] = useKeyboardControls();

  useFrame(() => {
    const { forward, backward, left, right, jump } = get();

    if (rb.current) {
      if (forward) {
        console.log("forward");
      }
    }
  });

  return (
    <RigidBody ref={rb} colliders={false} position={[0, 2, 0]}>
      <CapsuleCollider args={[1, 1.05]} />
      <Player />
    </RigidBody>
  );
}
