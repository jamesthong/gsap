'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function RollerCoaster() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const currentXRef = useRef(0);
  const boxesRef = useRef<Box[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!stageRef.current || !bg1Ref.current || !bg2Ref.current || !wordRef.current) return;

    const stage = stageRef.current;
    const bg1 = bg1Ref.current;
    const bg2 = bg2Ref.current;
    const word = wordRef.current;

    const split = new SplitText(word, { type: 'chars' });
    let x = 0;
    const newBoxes: Box[] = [];

    split.chars.forEach((char) => {
      const bb = (char as HTMLElement).getBoundingClientRect();
      newBoxes.push({
        x: x,
        y: 0,
        width: bb.width,
        height: bb.height
      });
      if (char.innerHTML === '*') gsap.set(char, { opacity: 0 }); // hide asterisk to create spaces
      x += bb.width;
    });

    currentXRef.current = x;
    boxesRef.current = newBoxes;

    function setPath() {
      let path = '';
      boxesRef.current.forEach(b => {
        path += 'M' + b.x + ',' + b.y + ' ' + (b.x + b.width) + ',' + b.y + ' ' + (b.x + b.width) + ',' + (b.y + b.height) + ' ' + b.x + ',' + (b.y + b.height) + 'z';
      });
      gsap.set(bg2, { clipPath: "path('" + path + "')" });
    }
    setPath();

    const nClones = 10;
    for (let i = 0; i < nClones; i++) {
      const clone1 = word.cloneNode(true) as HTMLElement;
      const clone2 = word.cloneNode(true) as HTMLElement;
      bg1.prepend(clone1);
      bg2.prepend(clone2);
      gsap.timeline({
        repeat: -1,
        onRepeat: () => {
          bg1.append(clone1);
          bg2.append(clone2);
        }
      }).fromTo([clone1, clone2], {
        position: 'absolute',
        className: 'clone',
        y: (j: number) => (j % 2) ? 400 : 0
      }, {
        duration: 1,
        y: (j: number) => (j % 2) ? 0 : 400,
        ease: 'sine'
      })
      .fromTo([clone1, clone2], {
        color: '#fff'
      }, {
        ease: 'power1.inOut',
        color: '#222'
      }, 0.5)
      .play(i / nClones)
      .timeScale(0.15);
    }

    const newTl = gsap.timeline({
      onUpdate: setPath
    })
    .to(split.chars, {
      y: 400,
      ease: 'sine.inOut',
      stagger: { each: 0.1, yoyo: true, repeat: -1 },
      duration: 2.4
    })
    .play(99);

    boxesRef.current.forEach((b, i) => {
      newTl.add(gsap.to(b, {
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.1,
        height: 400
      }), 0);
    });

    tlRef.current = newTl;

    const handlePointerUp = () => {
      if (tlRef.current) {
        gsap.to(tlRef.current, {
          timeScale: tlRef.current.isActive() ? 0 : 1
        });
      }
    };

    window.addEventListener('pointerup', handlePointerUp);

    const handleResize = () => {
      gsap.set(stage, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        width: currentXRef.current,
        height: 400,
        scale: gsap.utils.clamp(0, 1.2, window.innerWidth / currentXRef.current),
        color: '#fff'
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black font-['Ubuntu_Mono'] font-normal overflow-hidden">
      <div
        ref={stageRef}
        className="stage absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
      >
        <div ref={bg1Ref} className="bg1"></div>
        <div ref={bg2Ref} className="bg2"></div>
        <div
          ref={wordRef}
          className="word uppercase relative text-[55px] leading-[60px]"
        >
          *roller*coaster*roller*coaster*
        </div>
      </div>
    </div>
  );
}