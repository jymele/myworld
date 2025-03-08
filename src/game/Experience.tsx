import World from "./World";
import { Canvas } from "@react-three/fiber";
import PlayerController from "./controllers/PlayerController";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
// import BottomController from "./controllers/BottomController";

export default function Experience() {
  return (
    <Canvas
      className="scene"
      camera={{ position: [0, 10, -16], fov: 75 }}
      shadows
      dpr={[1, 2]} // Adjust the resolution here
      // orthographic
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[-10, 10, 2]} castShadow />
      <directionalLight intensity={0.5} position={[10, 10, 2]} />

      <Suspense fallback={null}>
        <Physics debug>
          <World />
          <PlayerController />
          {/* <BottomController /> */}
        </Physics>
      </Suspense>
    </Canvas>
  );
}
