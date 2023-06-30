import { Physics } from '@react-three/cannon';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva, button, useControls } from 'leva';
import { useEffect, useState } from 'react';

import './App.css';
import BoxTrigger from './components/BoxTrigger';
import Plane from './components/Plane';
import Sphere from './components/Sand';
import Wall from './components/Wall';
function App() {
  const [Spheres, setSpheres] = useState<JSX.Element[]>([]);
  const [hasCollided, setHasCollided] = useState(false);
  const LevaPanel = useControls({
    spawnRate: { value: 2000, min: 100, max: 10000, step: 500, order: -1 },
    reset: button(() => {
      setSpheres([]);
      setHasCollided(false);
    }),
  });
  useEffect(() => {
    if (hasCollided) {
      alert(`Box overflown by creation of ${Spheres.length} grains`);
    } else {
      const interval = setInterval(() => {
        if (!hasCollided) {
          setSpheres([...Spheres, <Sphere />]);
        }
      }, LevaPanel.spawnRate);
      return () => clearInterval(interval);
    }
  }, [Spheres.length]);

  return (
    <div id="canvas-outer-container">
      <Canvas
        style={{ background: '#195863' }}
        camera={{
          position: [0, 2, 5],
        }}>
        <Physics>
          <Plane {...{ position: [0, 0, -0.11], name: 'back' }} />
          <Plane
            {...{
              position: [0, 0, 0.11],
              rotation: [0, Math.PI, 0],
              name: 'front',
            }}
          />
          <Wall position={[-2, 1, 0]} />
          <Wall position={[2, 1, 0]} />
          <Wall position={[0, 0, 0]} args={[4, 0.1, 0.1]} />
          <BoxTrigger
            position={[-2.6, 1, 0]}
            hasCollided
            setHasCollided={setHasCollided}
          />
          <BoxTrigger
            position={[2.6, 1, 0]}
            hasCollided
            setHasCollided={setHasCollided}
          />
          {...Spheres}
        </Physics>
        <OrbitControls />
      </Canvas>
      <Stats />
      <Leva />
    </div>
  );
}
export default App;
