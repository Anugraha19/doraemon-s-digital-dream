import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function useIsLowEnd() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  useEffect(() => {
    const nav = navigator as any;
    const cores = nav.hardwareConcurrency || 4;
    const memory = nav.deviceMemory || 4;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsLowEnd(cores <= 4 || memory <= 4 || isMobile);
  }, []);
  return isLowEnd;
}

function AnimatedSphere({ segments }: { segments: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#00d4ff') },
      uColor2: { value: new THREE.Color('#a855f7') },
      uColor3: { value: new THREE.Color('#06b6d4') },
    }),
    []
  );

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vNormal = normal;
      vPosition = position;
      
      vec3 pos = position;
      float displacement = sin(pos.x * 3.0 + uTime) * 0.15 
                         + sin(pos.y * 4.0 + uTime * 1.3) * 0.1 
                         + sin(pos.z * 2.0 + uTime * 0.7) * 0.12;
      pos += normal * displacement;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    
    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
      
      float pattern = sin(vPosition.x * 5.0 + uTime) * sin(vPosition.y * 5.0 + uTime * 0.8) * 0.5 + 0.5;
      
      vec3 color = mix(uColor1, uColor2, pattern);
      color = mix(color, uColor3, fresnel * 0.6);
      
      float glow = fresnel * 0.8 + 0.2;
      
      gl_FragColor = vec4(color * glow, 0.9);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.6;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.4}>
      <sphereGeometry args={[1, segments, segments]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

function GlowRing({ radius, rotationAxis, speed, color, tubularSegments }: { radius: number; rotationAxis: 'x' | 'y' | 'z'; speed: number; color: string; tubularSegments: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation[rotationAxis] = state.clock.elapsedTime * speed;
      if (rotationAxis === 'x') ref.current.rotation.z = Math.PI * 0.3;
      if (rotationAxis === 'z') ref.current.rotation.x = Math.PI * 0.4;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 16, tubularSegments]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

function FloatingParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#00d4ff');
    const c2 = new THREE.Color('#a855f7');
    const c3 = new THREE.Color('#06b6d4');
    const palette = [c1, c2, c3];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * 3)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function CSSFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[hsl(190,100%,50%)] to-[hsl(270,80%,60%)] opacity-30 blur-3xl animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] rounded-full border border-[hsl(190,100%,50%)]/20 animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[hsl(270,80%,60%)]/15 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
    </div>
  );
}

export default function Scene3D() {
  const isLowEnd = useIsLowEnd();

  if (isLowEnd) {
    return <CSSFallback />;
  }

  return (
    <div className="absolute inset-0">
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#00d4ff" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#a855f7" />

        <AnimatedSphere segments={48} />
        <GlowRing radius={2.2} rotationAxis="y" speed={0.2} color="#00d4ff" tubularSegments={64} />
        <GlowRing radius={2.5} rotationAxis="x" speed={-0.15} color="#a855f7" tubularSegments={64} />
        <GlowRing radius={2.8} rotationAxis="z" speed={0.1} color="#06b6d4" tubularSegments={64} />
        <FloatingParticles count={80} />
      </Canvas>
    </div>
  );
}
