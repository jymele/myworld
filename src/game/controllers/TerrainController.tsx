import { RigidBody } from "@react-three/rapier";
import { TerrainWorld } from "../models/environment/TerrainWorld";

export default function TerrainController() {
  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      friction={5}
      // collisionGroups={0b0001}
      name="terrain"
    >
      {/* <Land1 /> */}
      <TerrainWorld />
      {/* <Terrain /> */}
      {/* <Box args={[1000, 0.1, 1000]} position={[0, 0, 0]} /> */}
    </RigidBody>
  );
}
