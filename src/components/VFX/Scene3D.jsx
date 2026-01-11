
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';

const FloatingElement = ({ position, geometry, color, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * speed;
      meshRef.current.rotation.y += delta * 0.15 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <FloatingElement 
          position={[4, 0, -5]} 
          geometry={<icosahedronGeometry args={[2, 0]} />} 
          color="#4299e1" 
        />
        <FloatingElement 
          position={[-4, 2, -10]} 
          geometry={<torusKnotGeometry args={[1.5, 0.4, 128, 32]} />} 
          color="#ed64a6" 
          speed={0.8}
        />
        <FloatingElement 
          position={[0, -3, -8]} 
          geometry={<dodecahedronGeometry args={[1.5]} />} 
          color="#48bb78" 
          speed={1.2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
