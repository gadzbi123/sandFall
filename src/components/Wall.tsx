import { BoxProps, useBox } from '@react-three/cannon';
import { useRef } from 'react';
import { Mesh } from 'three';

function Wall({ position = [0, 0, 0], args = [0.1, 2, 0.1] }: BoxProps) {
  const [ref] = useBox(() => {
    return {
      position,
      args,
    };
  }, useRef<Mesh>(null));
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={args} />
      <meshBasicMaterial transparent opacity={0.5} color="#222222" />
    </mesh>
  );
}
export default Wall;
