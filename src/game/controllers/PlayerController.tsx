import {
  CapsuleCollider,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { Group, Vector3 } from "three";
import Controls from "../utils/controls";
import { useControls } from "leva";
import { degToRad, MathUtils } from "three/src/math/MathUtils.js";
import { lerpAngle } from "../utils/AngleHelpers";
import { Character } from "../models/Character";
import { PerspectiveCamera } from "three";
import { PlayerActions } from "../utils/playerActions";

type Props = {
  gameover: boolean;
};

PlayerController.defaultProps = {
  gameover: false,
};

export default function PlayerController(props: Props) {
  const [state, setState] = useState<PlayerActions>("Idle");

  useEffect(() => {
    if (rb.current) {
      rb.current.addForce(new Vector3(0, -12, 0), true);
    }
  }, []);

  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED, JUMP_FORCE } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 8, min: 0, max: 100 },
      RUN_SPEED: { value: 16, min: 0, max: 100 },
      ROTATION_SPEED: {
        value: degToRad(2),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
      JUMP_FORCE: { value: 8, min: 0, max: 10, step: 0.5 },
    }
  );
  const fall_reset = -20;

  const gameover: boolean = props.gameover;
  const inTheAir = useRef(false);

  const rb = useRef<RapierRigidBody>(null);
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

  const handleJump = (vel: Vector3) => {
    const { jump } = get();

    if (jump && !inTheAir.current) {
      inTheAir.current = true;
      vel.y = JUMP_FORCE;
      setState("Jump");
    }
  };

  const handleMovement = (vel: Vector3) => {
    const { forward, back, left, right, run } = get();

    const speed = run ? RUN_SPEED : WALK_SPEED;
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

    if (left) {
      movement.x = 1;
    }
    if (right) {
      movement.x = -1;
    }

    // set the state of the player for handling the animations
    if (movement.x !== 0 || movement.z !== 0) {
      setState("Walk");
    } else {
      setState("Idle");
    }

    if (movement.x !== 0) {
      rotationTarget.current += movement.x * ROTATION_SPEED;
    }

    // handle the movement
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
  };

  const handleCamera = (camera: PerspectiveCamera) => {
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
  };

  const resetPlayer = () => {
    rb.current?.setTranslation(new Vector3(0, 5, 0), true);
    rb.current?.setLinvel(new Vector3(0, 0, 0), true);
    rb.current?.setAngvel(new Vector3(0, 0, 0), true);
  };

  useFrame(({ camera }) => {
    handleCamera(camera as PerspectiveCamera);

    /**
     * Check if the player has fallen of the map
     */
    if (rb.current && rb.current.translation().y < fall_reset) {
      resetPlayer();
    }

    /**
     * Handling the Player Movement
     */
    if (rb.current && !gameover && !inTheAir.current) {
      const vel = rb.current.linvel() as Vector3;

      handleMovement(vel);
      handleJump(vel);

      // Apply the movement and the jump
      rb.current.setLinvel(vel, true);
    }
  });

  return (
    <RigidBody
      ref={rb}
      name="player"
      colliders={false}
      position={[0, 5, 0]}
      lockRotations
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject && other.rigidBodyObject.name === "terrain") {
          inTheAir.current = false;
        }
      }}
      onCollisionExit={({ other }) => {
        if (other.rigidBodyObject && other.rigidBodyObject.name === "terrain") {
          inTheAir.current = true;
        }
      }}
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={-4} />
        <group ref={cameraPosition} position-y={14} position-z={-24} />
        <group ref={character}>
          <Character state={state} />
        </group>
      </group>
      <CapsuleCollider args={[1, 1.05]} />
    </RigidBody>
  );
}
