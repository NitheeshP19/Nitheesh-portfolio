import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform vec2 uMouse;

  // Simplex 3D Noise 
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Noise-based displacement
    float time = uTime * 0.4;
    float noise = snoise(position * 2.5 + vec3(time)); // Increased frequency slightly for more detail
    
    // Transform position to clip space to get screen coordinates roughly
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vec4 projected = projectionMatrix * viewPos;
    vec2 screenPos = projected.xy / projected.w;
    
    // Mouse interaction: Use screen space distance for better "hover" feel
    float dist = distance(screenPos, uMouse);
    
    // Optimized reaction: Sharper falloff for snappy "magnetic" feel
    float mouseEffect = smoothstep(0.35, 0.0, dist) * 0.3; 
    
    vec3 newPos = position + normal * (noise * 0.25 + mouseEffect); // Slightly reduced base noise amplitude
    vPosition = newPos;
    vViewPosition = viewPos.xyz;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  
  void main() {
    // Premium color palette: Deep Purple base with Cyan/Magenta/Electric Blue accents
    vec3 colorA = vec3(0.05, 0.0, 0.15); // Deep Purple
    vec3 colorB = vec3(0.0, 0.8, 1.0); // Cyan
    vec3 colorC = vec3(0.8, 0.0, 1.0); // Magenta
    vec3 colorD = vec3(0.2, 0.2, 1.0); // Electric Blue
    
    // Dynamic mixing based on position and normality
    float noise = sin(vPosition.x * 5.0 + uTime) * sin(vPosition.y * 5.0 + uTime);
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    
    vec3 mix1 = mix(colorA, colorB, vPosition.y * 0.5 + 0.5);
    vec3 mix2 = mix(colorC, colorD, sin(uTime * 0.5) * 0.5 + 0.5);
    
    vec3 finalColor = mix(mix1, mix2, noise * 0.5 + 0.5);
    
    // Add glow/bloom feel with fresnel
    finalColor += fresnel * 0.6 * vec3(0.8, 0.9, 1.0);
    
    gl_FragColor = vec4(finalColor, 0.9);
  }
`;

const LiquidOrb = () => {
  const mesh = useRef();
  const { viewport } = useThree();
  
  // Responsive scale: Smaller on mobile, larger on desktop
  const scale = Math.min(viewport.width / 3, 2.8);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) }
    }),
    []
  );

  useFrame((state) => {
    const { clock, pointer } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
      
      // Pass normalized device coordinates directly (-1 to 1)
      mesh.current.material.uniforms.uMouse.value.lerp(
        pointer, // pointer is already -1 to 1, matches NDC
        0.1
      );
      
      // Gentle rotation
      mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
      mesh.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={scale}>
      <icosahedronGeometry args={[1, 5]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
};

export default LiquidOrb;
