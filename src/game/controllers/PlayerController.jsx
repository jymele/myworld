import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Player from "../models/Player";

export default function PlayerController() {
  return (
    <RigidBody colliders={false} position={[0, 2, 0]}>
      <CapsuleCollider args={[1, 1.05]} />
      <Player />
    </RigidBody>
  );
}
