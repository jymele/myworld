import { OrbitControls } from "@react-three/drei";
import TerrainController from "./controllers/TerrainController";
import { Canvas } from "@react-three/fiber";

export default function Experience() {
  return (
    <Canvas className="scene" camera={{ position: [0, 10, 10] }}>
      <OrbitControls enableDamping />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[-10, 10, 2]} castShadow />
      <directionalLight intensity={0.5} position={[10, 10, 2]} />

      <TerrainController />
    </Canvas>
  );
}
