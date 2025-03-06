import { RigidBody } from "@react-three/rapier";
import Terrain from "../models/Terrain";

export default function TerrainController() {
  return (
    <RigidBody type="fixed" friction={5}>
      <Terrain />
    </RigidBody>
  );
}
