import { RigidBody } from "@react-three/rapier";
import Terrain from "../models/environment/Terrain";
import { Box } from "@react-three/drei";

export default function TerrainController() {
  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      friction={5}
      // collisionGroups={0b0001}
    >
      {/* <Terrain /> */}
      <Box args={[1000, 0.1, 1000]} position={[0, 0, 0]} />
    </RigidBody>
  );
}
