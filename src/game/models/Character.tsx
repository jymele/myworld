import * as THREE from "three";
import { useRef, JSX, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube004: THREE.SkinnedMesh;
    Bone_1: THREE.Bone;
    Bone002_1: THREE.Bone;
    Bone005_1: THREE.Bone;
    Bone003_1: THREE.Bone;
    Bone004_1: THREE.Bone;
    neutral_bone: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

type Props = JSX.IntrinsicElements["group"] & {
  state: "Idle" | "Walk";
};

export function Character(props: Props) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/character.glb"
  ) as unknown as GLTFResult;
  const { actions } = useAnimations<THREE.AnimationClip>(animations, group);
  const { state } = props;

  useEffect(() => {
    // Check if all animations are present
    if (!actions.Idle || !actions.Walk) {
      console.error("Missing animations");
    } else {
      if (state === "Idle") {
        actions.Walk.stop();
        actions.Idle.play();
      } else if (state === "Walk") {
        actions.Idle.stop();
        actions.Walk.play().setDuration(0.5);
      }
    }
  }, [state]);

  return (
    <group ref={group} {...props} position-y={-1.8} castShadow dispose={null}>
      <group name="Set_Armature">
        <group name="Armature001">
          <skinnedMesh
            name="Cube004"
            geometry={nodes.Cube004.geometry}
            material={materials.Material}
            skeleton={nodes.Cube004.skeleton}
            castShadow
            receiveShadow
          />
          <primitive object={nodes.Bone_1} />
          <primitive object={nodes.Bone002_1} />
          <primitive object={nodes.Bone005_1} />
          <primitive object={nodes.Bone003_1} />
          <primitive object={nodes.Bone004_1} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  );
}
