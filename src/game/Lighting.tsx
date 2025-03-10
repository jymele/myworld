import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Lighting() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shadow = useRef<any>(null);

  useHelper(shadow, THREE.CameraHelper);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[10, 10, 2]} />

      {/* Main light */}
      <directionalLight intensity={1} position={[-100, 100, 20]} castShadow>
        <orthographicCamera
          attach={`shadow-camera`}
          ref={shadow}
          top={100}
          bottom={-100}
          left={-100}
          right={100}
        />
      </directionalLight>
    </>
  );
}
