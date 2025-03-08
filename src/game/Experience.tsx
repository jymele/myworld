import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import TerrainController from "./controllers/TerrainController";
import { Canvas } from "@react-three/fiber";
import PlayerController from "./controllers/PlayerController";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import BottomController from "./controllers/BottomController";

export default function Experience() {
  const shadowCameraRef = useRef(null);

  return (
    <Canvas
      className="scene"
      camera={{ position: [0, 16, 16] }}
      shadows="basic"
      //   orthographic
    >
      <OrbitControls enableDamping />
      {/* <OrthographicCamera
        left={-22}
        right={15}
        top={10}
        bottom={-20}
        ref={shadowCameraRef}
        attach={"shadow-camera"}
        makeDefault
      /> */}
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[-10, 10, 2]} castShadow />
      <directionalLight intensity={0.5} position={[10, 10, 2]} />

      <Suspense fallback={null}>
        <Physics debug>
          <TerrainController />
          <PlayerController />
          <BottomController />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
