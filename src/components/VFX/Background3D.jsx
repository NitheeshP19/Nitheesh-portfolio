
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const FloatingShape = ({ position, geometry, color, speed = 1, rotationIntensity = 1 }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * speed;
      meshRef.current.rotation.y += delta * 0.15 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={1}>
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

const Background3D = ({ shapes = [] }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {shapes.map((shape, index) => (
          <FloatingShape key={index} {...shape} />
        ))}
      </Canvas>
    </div>
  );
};

export default Background3D;
