/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube003_1: THREE.Mesh;
    Cube003_2: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export function MovingPlatform(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/moving_platform.glb"
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[-18, 0, -24.371]} scale={[0.117, 1, 0.117]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/moving_platform.glb");
