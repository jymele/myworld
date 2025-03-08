import { RigidBody } from "@react-three/rapier";
import Terrain from "../models/environment/Terrain";

export default function TerrainController() {
  return (
    <RigidBody type="fixed" colliders="trimesh" friction={5}>
      <Terrain />
    </RigidBody>
  );
}
