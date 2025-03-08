import { RigidBody } from "@react-three/rapier";

export default function BottomController() {
  return (
    <RigidBody type="fixed" position={[0, -10, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial opacity={0} color={"white"} />
      </mesh>
    </RigidBody>
  );
}
