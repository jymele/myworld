import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Player from "../models/Player";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";

export default function PlayerController() {
  const rb = useRef();
  const [, get] = useKeyboardControls();
  const movementSpeed = 10;
  const vel = new Vector3();

  useFrame(() => {
    vel.x = 0;
    vel.y = -1;
    vel.z = 0;

    const { forward, back, left, right } = get();

    if (rb.current) {
      if (forward) {
        vel.z = -1 * movementSpeed;
      }
      if (back) {
        vel.z = 1 * movementSpeed;
      }

      if (left) {
        vel.x = -1 * movementSpeed;
      }
      if (right) {
        vel.x = 1 * movementSpeed;
      }

      rb.current.setLinvel(vel);
    }
  });

  return (
    <RigidBody ref={rb} colliders={false} position={[0, 2.4, 0]} lockRotations>
      <CapsuleCollider args={[1, 1.05]} />
      <Player />
    </RigidBody>
  );
}
