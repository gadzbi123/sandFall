import { PlaneProps, usePlane } from '@react-three/cannon';
import { useRef } from 'react';
import { Mesh } from 'three';

function Plane({ rotation = [0, 0, 0], position = [0, 0, 0] }: PlaneProps) {
  const [ref] = usePlane(() => {
    return {
      position,
      rotation,
      material: { friction: 0, restitution: 0.3 },
    };
  }, useRef<Mesh>(null));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[10, 5]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}
export default Plane;
