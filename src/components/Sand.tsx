import { useSphere } from '@react-three/cannon';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

function Sand() {
  const [size] = useState(0.1);
  // const texture = useLoader(TextureLoader, '/Ground054_4K_Color.png');
  const [sphereRef] = useSphere(
    () => ({
      mass: 1,
      args: [size],
      position: [0.5 - Math.random(), 4, 0],
      material: { friction: 0, restitution: 0.3 },
    }),
    useRef<Mesh>(null)
  );
  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[size, 48]} />
      <meshBasicMaterial
        /*map={texture}*/ color={'yellow'}
        toneMapped={false}
      />
    </mesh>
  );
}
export default Sand;
