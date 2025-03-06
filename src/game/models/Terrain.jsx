import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Terrain(props) {
  const { nodes, materials } = useGLTF("/terrain.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
      />
    </group>
  );
}

useGLTF.preload("/terrain.glb");
