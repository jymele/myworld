import { RigidBody } from "@react-three/rapier";
import { MovingPlatform } from "../models/environment/MovingPlatform";
import { RigidBodyProps } from "@react-three/rapier";

export default function MovingPlatformController(props: RigidBodyProps) {
  const { position, scale } = props;

  return (
    <>
      <RigidBody
        type="kinematicPosition"
        colliders="cuboid"
        position={position}
        friction={5}
      >
        <MovingPlatform scale={scale} />
      </RigidBody>
    </>
  );
}
