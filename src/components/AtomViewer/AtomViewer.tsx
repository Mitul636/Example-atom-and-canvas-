import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useElementStore } from '@/store/useElementStore';

function ElectronShell({ radius, electronCount, speed, color }: { radius: number, electronCount: number, speed: number, color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed;
      groupRef.current.rotation.x = clock.getElapsedTime() * speed * 0.5;
    }
  });

  // Calculate electron positions
  const electrons = Array.from({ length: electronCount }).map((_, i) => {
    const angle = (i / electronCount) * Math.PI * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
  });

  // Orbit path
  const curve = new THREE.EllipseCurve(
    0,  0,
    radius, radius,
    0,  2 * Math.PI,
    false,
    0
  );
  const points = curve.getPoints(50).map(p => new THREE.Vector3(p.x, 0, p.y));

  return (
    <group ref={groupRef}>
      <Line points={points} color="rgba(255,255,255,0.2)" lineWidth={1} />
      {electrons.map((pos, i) => (
        <Sphere key={i} args={[0.2, 16, 16]} position={pos}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </Sphere>
      ))}
    </group>
  );
}

function Nucleus({ protons, neutrons }: { protons: number, neutrons: number }) {
  const total = protons + neutrons;
  const particles = Array.from({ length: Math.min(total, 60) }).map((_, i) => {
    // Distribute roughly in a cluster
    const phi = Math.acos( -1 + ( 2 * i ) / Math.min(total, 60) );
    const theta = Math.sqrt( Math.min(total, 60) * Math.PI ) * phi;
    const r = Math.cbrt(i) * 0.3; // scale radius by count roughly
    return {
      pos: new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      ),
      isProton: i < protons
    };
  });

  return (
    <group>
      {particles.map((p, i) => (
        <Sphere key={i} args={[0.3, 16, 16]} position={p.pos}>
          <meshStandardMaterial color={p.isProton ? '#ef4444' : '#9ca3af'} />
        </Sphere>
      ))}
    </group>
  );
}

export function AtomViewer() {
  const { selectedElement } = useElementStore();

  if (!selectedElement) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-900 rounded-lg">
        Select an element to view its 3D atomic structure.
      </div>
    );
  }

  const shellColors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa', '#f472b6'];

  return (
    <div className="w-full h-[500px] bg-black rounded-lg relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 text-white">
        <h2 className="text-xl font-bold">{selectedElement.name} Atom</h2>
        <p className="text-sm text-gray-300">
          Protons: {selectedElement.number} | Neutrons: {Math.round(selectedElement.atomic_mass) - selectedElement.number}
        </p>
      </div>
      <Canvas camera={{ position: [0, 0, Math.max(10, selectedElement.shells.length * 3)], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls autoRotate autoRotateSpeed={1} />
        
        <Nucleus 
          protons={selectedElement.number} 
          neutrons={Math.round(selectedElement.atomic_mass) - selectedElement.number} 
        />
        
        {selectedElement.shells.map((count, i) => (
          <ElectronShell 
            key={i} 
            radius={2 + i * 1.5} 
            electronCount={count} 
            speed={0.5 - i * 0.05} 
            color={shellColors[i % shellColors.length]}
          />
        ))}
      </Canvas>
    </div>
  );
}
