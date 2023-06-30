import { BoxProps, useBox } from '@react-three/cannon';
import { useRef } from 'react';
import { Mesh } from 'three/src/Three.js';

type CollisionProps = {
  hasCollided: boolean;
  setHasCollided: (state: boolean) => void;
};
function BoxTrigger({
  args = [1, 2, 1],
  position,
  hasCollided,
  setHasCollided,
}: BoxProps & CollisionProps) {
  const [ref] = useBox(
    () => ({
      args,
      onCollide: () => {
        if (!hasCollided) alert('sand has escaped the box');
        setHasCollided(true);
      },
      position,
      isTrigger: true,
    }),
    useRef<Mesh>(null)
  );
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={'red'} wireframe visible={false} />
    </mesh>
  );
}

export default BoxTrigger;
