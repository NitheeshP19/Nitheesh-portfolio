import { Canvas } from '@react-three/fiber';
import { Environment, Stars, OrbitControls, PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { useState, Suspense } from 'react';

const SkyBackground = () => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, dpr]}>
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={1} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#4299e1" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#ed64a6" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkyBackground;
