import World from "./World";
import { Canvas } from "@react-three/fiber";
import PlayerController from "./controllers/PlayerController";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import Lighting from "./Lighting";
import { Sun } from "./models/Sun";
import Processing from "./Processing";
// import BottomController from "./controllers/BottomController";

export default function Experience() {
  return (
    <Canvas
      className="scene"
      camera={{ position: [0, 14, -24], fov: 45 }}
      shadows
    >
      <Processing />
      <Lighting />
      <Suspense fallback={null}>
        <Physics debug>
          <World />
          <Sun />
          <PlayerController />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
