import MovingPlatformController from "./controllers/MovingPlatformController";
import TerrainController from "./controllers/TerrainController";

export default function World() {
  return (
    <>
      <MovingPlatformController position={[30, 1, 64]} scale={[2, 1, 1.5]} />
      <TerrainController />
    </>
  );
}
