import World from "./World";
import { Canvas } from "@react-three/fiber";
import PlayerController from "./controllers/PlayerController";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import Lighting from "./Lighting";
// import BottomController from "./controllers/BottomController";

export default function Experience() {
  return (
    <Canvas
      className="scene"
      camera={{ position: [0, 10, -16], fov: 75 }}
      shadows
      dpr={[1, 2]} // Adjust the resolution here
    >
      <Lighting />
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
