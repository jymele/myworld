import { RigidBody } from "@react-three/rapier";
import Terrain from "../models/environment/Terrain";
import { Box } from "@react-three/drei";
import { Land1 } from "../models/Land1";

export default function TerrainController() {
  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      friction={5}
      // collisionGroups={0b0001}
      name="terrain"
    >
      <Land1 />
      {/* <Terrain /> */}
      {/* <Box args={[1000, 0.1, 1000]} position={[0, 0, 0]} /> */}
    </RigidBody>
  );
}
