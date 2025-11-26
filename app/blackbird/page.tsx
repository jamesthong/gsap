'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

class Experience {
  options: any;
  container: HTMLElement;
  clock: THREE.Clock;
  time: number;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  controls: any;
  meshes: THREE.Mesh[];
  targetRotation: number;
  settings: any;
  scrollSmoother: any;

  constructor(options = { containerSelector: "[data-app-container]" }) {
    this.options = options;
    this.container = document.querySelector(this.options.containerSelector) as HTMLElement;
    this.clock = new THREE.Clock();
    this.time = 0;
    this.meshes = [];
    this.targetRotation = 0;
    this.settings = {
      cameraDistance: 5,
      scalePeriod: 8
    };
    this.init();
  }

  init = () => {
    this.createApp();
    this.createItems();
    this.initScroll();
    this.update();
    this.container.classList.add("is-ready");
  };

  initScroll = () => {
    this.scrollSmoother = ScrollSmoother.create({
      content: "#content",
      smooth: 1.2
    });

    document.querySelectorAll("span").forEach((span) => {
      ScrollTrigger.create({
        trigger: span,
        start: "top 90%",
        end: "bottom 10%",
        onUpdate: (self) => {
          const dist = Math.abs(self.progress - 0.5);
          const lightness = this.mapToRange(dist, 0, 0.5, 80, 100);
          (span as HTMLElement).style.setProperty("--l", lightness + "%");
        }
      });
    });
  };

  createApp = () => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    this.renderer.setPixelRatio(1.5);
    this.renderer.setSize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.offsetWidth / this.container.offsetHeight,
      1,
      10000
    );
    this.camera.position.set(0, 0, this.settings.cameraDistance);
    this.scene = new THREE.Scene();

    // Orbit Controls - assuming OrbitControls is imported
    // this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableKeys = false;
    // this.controls.enableZoom = false;
    // this.controls.enableDamping = false;

    window.addEventListener(
      "resize",
      () => {
        this.camera.aspect =
          this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
          this.container.offsetWidth,
          this.container.offsetHeight
        );
      },
      true
    );

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 3, 2);
    directionalLight.target.position.set(0, 0, 0);
    this.scene.add(directionalLight);
  };

  createItems = () => {
    let boxGeom = new THREE.BoxGeometry(2, 2, 2);
    let material = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });

    const itemCount = 40;
    for (let i = 0; i < itemCount; i++) {
      const mesh = new THREE.Mesh(boxGeom, material);
      mesh.position.y = 13 * (Math.random() * 2 - 1);
      mesh.position.x = 3 * (Math.random() * 2 - 1);
      mesh.position.z = 4 * (Math.random() * 2 - 1);
      mesh.rotation.y = Math.PI * Math.random();
      (mesh as any).rotationSpeed = Math.random() * 0.01 + 0.005;
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }
  };

  updateItems = () => {
    const time = this.time;
    const amplitude = 0.05;
    const period = this.settings.scalePeriod;

    const baseScale = 0.2;
    const scaleEffect =
      baseScale + amplitude * Math.sin(Math.PI * 2 * (time / period));

    this.meshes.forEach((mesh) => {
      mesh.scale.set(scaleEffect, scaleEffect, scaleEffect);
      mesh.rotation.x += (mesh as any).rotationSpeed;
    });

    const cameraRange = 10;
    this.camera.position.y = this.mapToRange(
      this.scrollSmoother.progress,
      0,
      1,
      cameraRange,
      -cameraRange
    );
  };

  mapToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  update = () => {
    this.time = this.clock.getElapsedTime();
    this.updateItems();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.update);
  };
}

export default function BlackbirdPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      new Experience({ containerSelector: "[data-app-container]" });
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@800&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        html, body {
          min-height: 100vh;
          background-color: #111;
        }
        html {
          font-size: 62.5%;
          box-sizing: border-box;
        }
        *, *:before, *:after {
          box-sizing: inherit;
        }
        .content {
          color: white;
          font-family: "Work Sans", sans-serif;
          padding: 3vw;
          padding-top: 9vh;
          font-size: calc(28px + 96 * (100vw - 300px) / 1200);
        }
        .content span {
          --h: 0;
          --s: 100%;
          --l: 80%;
          position: relative;
          color: hsl(var(--h), var(--s), var(--l));
          display: inline;
          background: linear-gradient(to right, hsl(var(--h), var(--s), var(--l)), hsl(calc(var(--h) + 30), var(--s), var(--l))),
            no-repeat;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-box-decoration-break: clone;
        }
        .content span:nth-child(1) { --h: 165; }
        .content span:nth-child(2) { --h: 170; }
        .content span:nth-child(3) { --h: 175; }
        .content span:nth-child(4) { --h: 180; }
        .content span:nth-child(5) { --h: 185; }
        .content span:nth-child(6) { --h: 190; }
        .content span:nth-child(7) { --h: 195; }
        .content span:nth-child(8) { --h: 200; }
        .content span:nth-child(9) { --h: 205; }
        .content span:nth-child(10) { --h: 210; }
        .content span:nth-child(11) { --h: 215; }
        .content span:nth-child(12) { --h: 220; }
        .content span:nth-child(13) { --h: 225; }
        .content span:nth-child(14) { --h: 230; }
        .content span:nth-child(15) { --h: 235; }
        .content span:nth-child(16) { --h: 240; }
        .content span:nth-child(17) { --h: 245; }
        .content span:nth-child(18) { --h: 250; }
        .content span:nth-child(19) { --h: 255; }
        .content span:nth-child(20) { --h: 260; }
        .content span:nth-child(21) { --h: 265; }
        .content span:nth-child(22) { --h: 270; }
        .content span:nth-child(23) { --h: 275; }
        .content span:nth-child(24) { --h: 280; }
        .content span:nth-child(25) { --h: 285; }
        .content span:nth-child(26) { --h: 290; }
        .content span:nth-child(27) { --h: 295; }
        .content span:nth-child(28) { --h: 300; }
        .content span:nth-child(29) { --h: 305; }
        .content span:nth-child(30) { --h: 310; }
        .logo {
          display: block;
          padding-bottom: 7rem;
          margin-top: 20vh;
        }
        [data-app-container] {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          transition: opacity 1s;
          opacity: 0;
        }
        [data-app-container].is-ready {
          opacity: 1;
        }
        [data-app-container] > canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        [data-app-container]:before,
        [data-app-container]:after {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          height: 15vh;
        }
        [data-app-container]:before {
          top: 0;
          background: linear-gradient(to bottom, black, rgba(black, 0));
        }
        [data-app-container]:after {
          background: linear-gradient(to top, black, rgba(black, 0));
          bottom: 0;
        }
      `}</style>
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

        <a href='https://malven.co' target="_blank" className='logo'>
          <svg width="63" height="52" viewBox="0 0 63 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.4 26.3L1.2 51.2V1.3l30.2 25z" stroke="#fff" strokeWidth=".9" strokeMiterlimit="10" strokeLinejoin="round"></path>
            <path d="M61.6 26.3L31.4 51.2 1.2 26.3l15.1-12.5 15.1 12.5 15.1-12.5 15.1 12.5z" stroke="#fff" strokeWidth=".9" strokeMiterlimit="10" strokeLinejoin="round"></path>
            <path d="M61.6 26.3v24.9L31.4 26.3l30.2-25v25z" stroke="#fff" strokeWidth=".9" strokeMiterlimit="10" strokeLinejoin="round"></path>
          </svg>
        </a>
      </div>

      <div ref={containerRef} data-app-container></div>
    </>
  );
}