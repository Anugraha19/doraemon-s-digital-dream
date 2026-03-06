import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.8, 20]} />
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#0066ff"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRing({ radius, speed, color, thickness }: { radius: number; speed: number; color: string; thickness: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const cubes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      color: ['#00d4ff', '#a855f7', '#06b6d4', '#8b5cf6'][i % 4],
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed * 3} rotationIntensity={2} floatIntensity={2}>
          <mesh position={cube.position} scale={cube.scale}>
            <octahedronGeometry args={[1, 0]} />
            <MeshWobbleMaterial
              color={cube.color}
              emissive={cube.color}
              emissiveIntensity={0.3}
              factor={0.4}
              speed={1}
              transparent
              opacity={0.7}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Particles() {
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00d4ff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -5, -10]} intensity={0.6} color="#a855f7" />
        <spotLight position={[0, 10, 5]} intensity={0.5} color="#06b6d4" angle={0.5} penumbra={1} />
        
        <GlowingSphere />
        <OrbitingRing radius={2.8} speed={0.3} color="#a855f7" thickness={0.02} />
        <OrbitingRing radius={3.4} speed={-0.2} color="#00d4ff" thickness={0.015} />
        <OrbitingRing radius={4.0} speed={0.15} color="#06b6d4" thickness={0.01} />
        <FloatingCubes />
        <Particles />
      </Canvas>
    </div>
  );
}
