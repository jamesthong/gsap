'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface ExperienceProps {
  containerSelector?: string;
}

function Box({ position, rotationSpeed, scrollProgress }: { position: [number, number, number]; rotationSpeed: number; scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const amplitude = 0.03;
      const period = 8;
      const baseScale = 0.1;
      const scaleEffect = baseScale + amplitude * Math.sin(Math.PI * 2 * (time / period));

      meshRef.current.scale.set(scaleEffect, scaleEffect, scaleEffect);
      meshRef.current.rotation.x += rotationSpeed;

      // Move cubes based on scroll progress
      const scrollOffset = scrollProgress * 20; // Adjust multiplier for movement speed
      meshRef.current.position.y = position[1] + scrollOffset;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshLambertMaterial color={0xffffff} />
    </mesh>
  );
}

function Scene() {
  const scrollSmootherRef = useRef<ScrollSmoother | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [boxes] = useState(() => {
    const boxArray = [];
    for (let i = 0; i < 40; i++) {
      boxArray.push({
        position: [
          3 * (Math.random() * 2 - 1),
          13 * (Math.random() * 2 - 1),
          4 * (Math.random() * 2 - 1)
        ] as [number, number, number],
        rotationSpeed: Math.random() * 0.01 + 0.005
      });
    }
    return boxArray;
  });

  useGSAP(() => {
    // Initialize scroll smoother
    const scrollSmoother = ScrollSmoother.create({
      content: "#content",
      smooth: 3
    });
    scrollSmootherRef.current = scrollSmoother;

    // Update scroll progress
    const updateScrollProgress = () => {
      if (scrollSmootherRef.current) {
        setScrollProgress(scrollSmootherRef.current.progress);
      }
    };

    // Listen to scroll updates
    ScrollTrigger.addEventListener("scrollEnd", updateScrollProgress);
    ScrollTrigger.addEventListener("scrollStart", updateScrollProgress);

    // Add scroll triggers for each span item
    document.querySelectorAll("span").forEach((span, index) => {
      ScrollTrigger.create({
        trigger: span,
        start: "top 90%",
        end: "bottom 20%",
        onUpdate: (self) => {
          const dist = Math.abs(self.progress - 0.5);
          const lightness = 80 + dist * 20; // Map from 80 to 100
          span.style.setProperty("--l", lightness + "%");
          updateScrollProgress(); // Update scroll progress on span updates
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (scrollSmootherRef.current) {
        scrollSmootherRef.current.kill();
      }
      ScrollTrigger.removeEventListener("scrollEnd", updateScrollProgress);
      ScrollTrigger.removeEventListener("scrollStart", updateScrollProgress);
    };
  }, []);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 3, 2]} intensity={0.4} />
      {boxes.map((box, i) => (
        <Box key={i} position={box.position} rotationSpeed={box.rotationSpeed} scrollProgress={scrollProgress} />
      ))}
    </>
  );
}

function Experience({ containerSelector = "[data-app-container]" }: ExperienceProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-100 transition-opacity duration-1000"
      data-app-container
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enableDamping={false}
        />
      </Canvas>
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="absolute top-0 left-0 right-0 h-[15vh] bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[15vh] bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  );
}

export default function BlackbirdPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Font preconnects */}
      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@800&display=swap"
        rel="stylesheet"
      /> */}

      <div id="content" className="content">
        <p>
          Blackbird singing in the dead of <span>night</span><br />
          Take these broken <span>wings</span> and learn to fly<br />
          All your life<br />
          You were only <span>waiting</span> for this moment to arise<br />
          Blackbird <span>singing</span> in the dead of night<br />
          Take these sunken eyes and <span>learn</span> to see<br />
          All your life<br />
          You were only waiting for this <span>moment</span> to be free<br />
          Blackbird fly, blackbird fly<br />
          Into the light of a <span>dark</span> black night<br />
          Blackbird fly, blackbird fly<br />
          Into the light of a dark <span>black</span> night<br />
          Blackbird <span>singing</span> in the dead of night<br />
          Take these broken wings and <span>learn</span> to fly<br />
          All your life<br />
          You were only <span>waiting</span> for this moment to arise<br />
          You were only waiting for this <span>moment</span> to arise<br />
          You were only waiting for this moment to <span>arise</span><br />
        </p>


      </div>

      <Experience />
    </div>
  );
}
