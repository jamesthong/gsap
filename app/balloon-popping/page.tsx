'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './balloon.module.css';

export default function BalloonPopping() {
  const svgRef = useRef<SVGSVGElement>(null);
  const behindSvgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    onResize();
    window.addEventListener('resize', onResize);

    const getColor = () => {
      return `hsl(${360 * Math.random()},${100 + 70 * Math.random()}%,${70 + 0 * Math.random()}%)`;
    };

    const createBalloon = () => {
      const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use') as SVGUseElement;
      useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#balloon');
      useEl.style.setProperty('--color', getColor());
      useEl.setAttribute('class', 'balloon');
      return useEl;
    };

    const popBalloon = (colorSettings: string, x: number, y: number, isBehind: boolean) => {
      const pop = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      pop.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#pop');
      pop.style.setProperty('--color', colorSettings.split('--color:')[1]?.split(';')[0] || getColor());
      pop.setAttribute('class', 'pop');

      const targetSvg = isBehind ? behindSvgRef.current : svgRef.current;
      if (targetSvg) {
        targetSvg.appendChild(pop);
      }

      gsap.set(pop, { scale: 0.5, x: x, y: y, rotation: Math.random() * 360, transformOrigin: "center" });
      gsap.to(pop, {
        duration: 0.2,
        scale: 3,
        opacity: 0,
        ease: 'power3.out',
        onComplete: () => {
          if (targetSvg && targetSvg.contains(pop)) {
            targetSvg.removeChild(pop);
          }
        }
      });

      for (let i = 0; i <= 10; i++) {
        const confetti = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        confetti.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#confetti_${Math.ceil(Math.random() * 2)}`);
        confetti.style.setProperty('--color', getColor());
        confetti.setAttribute('class', 'confetti');

        const confettiTargetSvg = isBehind ? behindSvgRef.current : svgRef.current;
        if (confettiTargetSvg) {
          confettiTargetSvg.appendChild(confetti);
        }

        const randomPos = {
          x: Math.random() * 500 - 250,
          y: Math.random() * 500 - 250
        };
        gsap.set(confetti, { x: x, y: y, rotation: Math.random() * 360, transformOrigin: "center" });
        gsap.to(confetti, {
          duration: 3,
          scale: Math.random(),
          x: x + randomPos.x + (Math.random() * 20 - 10),
          y: y + randomPos.y + (Math.random() * 200),
          opacity: 0,
          rotation: Math.random() * 360 - 180,
          ease: 'power4.out',
          onComplete: () => {
            if (confettiTargetSvg && confettiTargetSvg.contains(confetti)) {
              confettiTargetSvg.removeChild(confetti);
            }
          }
        });
      }
    };

    const animateBalloon = (balloon: SVGElement, isBehind = false) => {
      gsap.set(balloon, {
        x: size.width / 2,
        y: size.height - 200,
        // transformOrigin: "center",
        scale: isBehind ? 1 : 1.5,
        alpha: 0.95,
        rotation: (Math.random() * 180) - 90
      });

      const centerPos = {
        x: (size.width / 4) + (Math.random() * (size.width / 2)),
        y: size.height / 6
      };

      const endPos = {
        x: centerPos.x + (Math.random() * 200 - 100),
        y: Math.random() * 50
      };

      gsap.to(balloon, {
        duration: 5 + Math.random(),
        x: centerPos.x,
        y: centerPos.y,
        scale: isBehind ? 0.5 : 1,
        rotation: 0,
        ease: "power1.in",
        onComplete: () => onClick(endPos.x, endPos.y, balloon, isBehind)
      });

      balloon.addEventListener('click', (e) => {
        onClick(e.clientX, e.clientY, balloon, isBehind);
      });
    };

    const onClick = (x: number, y: number, balloon: SVGElement, isBehind: boolean) => {
      gsap.killTweensOf(balloon);
      const color = balloon.style.getPropertyValue('--color') || getColor();
      const targetSvg = isBehind ? behindSvgRef.current : svgRef.current;
      if (targetSvg && targetSvg.contains(balloon)) {
        targetSvg.removeChild(balloon);
      }
      popBalloon(color, x, y, isBehind);
    };

    const balloonGenerator = setInterval(() => {
      if (!document.hidden) {
        const newBalloon = createBalloon();
        const isBehind = Math.random() > 0.5;
        const targetSvg = isBehind ? behindSvgRef.current : svgRef.current;
        if (targetSvg) {
          targetSvg.appendChild(newBalloon);
          animateBalloon(newBalloon, isBehind);
        }
      }
    }, 400);

    return () => {
      window.removeEventListener('resize', onResize);
      clearInterval(balloonGenerator);
    };
  }, [size.width, size.height]);

  return (
    <div className={`${styles.body} w-full h-screen`}>
      <svg
        width="1"
        height="1"
        id="svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        ref={svgRef}
        className={styles.svg}
        style={{ position: 'absolute', overflow: 'visible', top: 0, left: 0, zIndex: 3 }}
      >
        <defs>
          <g id="balloon">
            <path d="M30.32,85.27l2.6-3.67,2.18,3.67a3.09,3.09,0,0,1-2.39,1A2.63,2.63,0,0,1,30.32,85.27Z" style={{ fill: 'var(--color)' }} />
            <ellipse cx="32.92" cy="41.72" rx="32.92" ry="41.72" style={{ fill: 'var(--color)' }} />
            <ellipse cx="50.5" cy="20.4" rx="5.23" ry="13.48" transform="translate(-3 30.59) rotate(-32.78)" style={{ fill: '#fff', opacity: 0.4 }} />
          </g>
          <g id="pop">
            <path  d="M10.4,1.06s23.25-3.73,31.65,2.8S52,21,52,21s-3.73-11-9.33-10.5-11.47,4.89-11.47,4.89,5.65-11.52,0-11.52-16.55.63-16.55.63Z" style={{ fill: 'var(--color)' }}/>
            <path  d="M31.21,29.08s13,4.36,15.51,0,6.85,0,6.85,0L45.79,46.51S34.84,44.57,33,36.83Z" style={{ fill: 'var(--color)' }}/>
            <path  d="M14.86,6.71l-4,15.14,5.3,3.83s-5.85,3.84-1.43,7.81,13,3.27,13,3.27S-.89,43.33,0,30.93,14.86,6.71,14.86,6.71Z" style={{ fill: 'var(--color)' }}/>
          </g>
          <g id="confetti_1">
            <polygon points="0 6.23 12.76 0 17.43 6.23 9.96 16.81 0 6.23" style={{ fill: 'var(--color)' }}/>
          </g>
          <g id="confetti_2">
            <polygon points="0 21.79 10.53 0 15.2 2.18 4.93 25.21 0 21.79" style={{ fill: 'var(--color)' }}/>
          </g>
        </defs>
      </svg>

      <svg id="behind" width="1" height="1" ref={behindSvgRef} style={{ position: 'absolute', zIndex: 1 }}></svg>
    </div>
  );
}