import { OrbitControls } from "@react-three/drei";
import TerrainController from "./controllers/TerrainController";
import { Canvas } from "@react-three/fiber";
import PlayerController from "./controllers/PlayerController";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

export default function Experience() {
  return (
    <Canvas
      className="scene"
      camera={{ position: [0, 16, 16] }}
      shadows="basic"
      //   orthographic
    >
      <OrbitControls enableDamping />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[-10, 10, 2]} castShadow />
      <directionalLight intensity={0.5} position={[10, 10, 2]} />

      <Suspense fallback={null}>
        <Physics debug>
          <TerrainController />
          <PlayerController />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
