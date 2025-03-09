import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Player from "../models/Player";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { Group, Vector3 } from "three";
import Controls from "../utils/controls";
import { useControls } from "leva";
import { degToRad, MathUtils } from "three/src/math/MathUtils.js";
import { lerpAngle } from "../utils/AngleHelpers";
import { Character } from "../models/Character";

type Props = {
  gameover: boolean;
};

PlayerController.defaultProps = {
  gameover: false,
};

export default function PlayerController(props: Props) {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 10, min: 0, max: 100 },
      RUN_SPEED: { value: 20, min: 0, max: 100 },
      ROTATION_SPEED: {
        value: degToRad(2),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
    }
  );

  let gameover: boolean = props.gameover;

  const rb = useRef<any>(null);
  const container = useRef<Group>(null);
  const character = useRef<Group>(null);
  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null);
  const CharacterrotationTarget = useRef<number>(0);
  const rotationTarget = useRef<number>(0);
  const cameraWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAtWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAt = useRef<Vector3>(new Vector3());

  const [, get] = useKeyboardControls<Controls>();

  useFrame(({ camera }) => {
    const { forward, back, left, right, run, jump } = get();

    /**
     * Handling the Camera
     * */
    // rotate the container contaning the camera, player and camera target
    container.current!.rotation.y = MathUtils.lerp(
      container.current!.rotation.y,
      rotationTarget.current,
      0.1
    );

    // Move the camera
    cameraPosition.current?.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }

    /**
     * Handling the Player Movement
     */
    if (rb.current && !gameover) {
      const vel = rb.current.linvel();

      const movement = {
        x: 0,
        z: 0,
      };

      if (forward) {
        movement.z = 1;
      }
      if (back) {
        movement.z = -1;
      }

      let speed = run ? RUN_SPEED : WALK_SPEED;

      if (left) {
        movement.x = 1;
      }
      if (right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += movement.x * ROTATION_SPEED;
      }

      // apply the movement
      if (movement.x !== 0 || movement.z !== 0) {
        CharacterrotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + CharacterrotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + CharacterrotationTarget.current) *
          speed;
      }
      character.current!.rotation.y = lerpAngle(
        character.current!.rotation.y,
        CharacterrotationTarget.current,
        0.1
      );
      rb.current.setLinvel(vel, true);
    }
  });

  return (
    <RigidBody ref={rb} colliders={false} position={[0, 2.4, 0]} lockRotations>
      <group ref={container}>
        <group ref={cameraTarget} position-z={-4} />
        <group ref={cameraPosition} position-y={16} position-z={-20} />
        <group ref={character}>
          {/* <Player /> */}
          <Character />
        </group>
      </group>
      <CapsuleCollider args={[1, 1.05]} />
    </RigidBody>
  );
}
