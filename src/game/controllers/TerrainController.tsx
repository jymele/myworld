import { RigidBody } from "@react-three/rapier";
import Terrain from "../models/environment/Terrain";

export default function TerrainController() {
  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      friction={5}
      // collisionGroups={0b0001}
    >
      <Terrain />
    </RigidBody>
  );
}
