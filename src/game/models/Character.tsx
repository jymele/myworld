import * as THREE from "three";
import React, { useRef, JSX, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube004: THREE.SkinnedMesh;
    Cube005: THREE.SkinnedMesh;
    Cube006: THREE.SkinnedMesh;
    Cube007: THREE.SkinnedMesh;
    Bone_1: THREE.Bone;
    Bone002_1: THREE.Bone;
    Bone005_1: THREE.Bone;
    Bone003_1: THREE.Bone;
    Bone004_1: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

// type ActionName = "Idle";
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function Character(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/character.glb"
  ) as unknown as GLTFResult;
  const { actions } = useAnimations<THREE.AnimationClip>(animations, group);

  useEffect(() => {
    actions.Idle!.play();
  }, []);

  return (
    <group ref={group} {...props} position-y={-1.6} castShadow dispose={null}>
      <group name="Set_Armature">
        <group name="Armature001">
          <skinnedMesh
            name="Cube004"
            geometry={nodes.Cube004.geometry}
            material={materials.Material}
            skeleton={nodes.Cube004.skeleton}
          />
          <skinnedMesh
            name="Cube005"
            geometry={nodes.Cube005.geometry}
            material={materials.Material}
            skeleton={nodes.Cube005.skeleton}
          />
          <skinnedMesh
            name="Cube006"
            geometry={nodes.Cube006.geometry}
            material={materials.Material}
            skeleton={nodes.Cube006.skeleton}
          />
          <skinnedMesh
            name="Cube007"
            geometry={nodes.Cube007.geometry}
            material={materials.Material}
            skeleton={nodes.Cube007.skeleton}
          />
          <primitive object={nodes.Bone_1} />
          <primitive object={nodes.Bone002_1} />
          <primitive object={nodes.Bone005_1} />
          <primitive object={nodes.Bone003_1} />
          <primitive object={nodes.Bone004_1} />
        </group>
      </group>
    </group>
  );
}
