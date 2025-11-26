'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function DragFollowers() {
  const targetRef = useRef<HTMLDivElement>(null);
  const oneRef = useRef<HTMLDivElement>(null);
  const twoRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // get a function that we can feed an x and y value to and have it animate there according to the duration
    function follower(target: HTMLElement, duration: number) {
      const xTo = gsap.quickTo(target, "x", { duration: duration, ease: "back" }),
        yTo = gsap.quickTo(target, "y", { duration: duration, ease: "back" });
      return (x: number, y: number) => {
        xTo(x);
        yTo(y);
      };
    }

    const followers = [oneRef, twoRef, threeRef]
    //   .reverse()
      .map((ref, i) => {
        const el = ref.current;
        if (!el) return null;
        return follower(el, 0.1 + i * 0.1);
      })
    //   .filter(Boolean);

    if (targetRef.current) {
      Draggable.create(targetRef.current, {
        bounds: window,
        // inertia: true,
        onDrag: updateFollowers,
        // onThrowUpdate: updateFollowers,
      });
    }

    function updateFollowers(this: Draggable.Vars) {
      followers.forEach((f) => f && f(this.x, this.y));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-0 m-0 overflow-hidden">
      <div
        ref={threeRef}
        className="bg-gradient-to-r from-green-400 to-green-600 rounded"
        style={{ width: '20px', height: '20px' }}
      ></div>
      <div
        ref={twoRef}
        className="bg-gradient-to-r from-green-400 to-green-600 rounded"
        style={{ width: '30px', height: '30px' }}
      ></div>
      <div
        ref={oneRef}
        className="bg-gradient-to-r from-green-400 to-green-600 rounded"
        style={{ width: '40px', height: '40px' }}
      ></div>
      <div
        ref={targetRef}
        className="bg-gradient-to-r from-green-400 to-green-600 rounded grid place-content-center cursor-pointer"
        style={{ width: '100px', height: '100px' }}
      >
        DRAG
      </div>
    </div>
  );
}