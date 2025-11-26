'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable, type Draggable as DraggableInstance } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin' // ✅ Import this
import styles from './radial.module.css';

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function RadialTimePicker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLHeadingElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!inputRef.current || !ringRef.current || !trackRef.current || !timeRef.current || !handleRef.current) return;

    const INPUT = inputRef.current;
    const RING = ringRef.current;
    const TRACK = trackRef.current;
    const TIME = timeRef.current;
    const HANDLE = handleRef.current;

    const ROTATE_MAPPER = gsap.utils.mapRange(0, parseInt(INPUT.max, 10), 0, 360);
    const PROGRESS_MAPPER = gsap.utils.mapRange(0, parseInt(INPUT.max, 10) * 0.5, 0, 50);

    // gsap.set('[aria-label="moon"]', { scale: 0 });

    const minToTime = (minutes: number) => `${`${Math.floor(minutes / 60)}`.padStart(2, '0')}:${`${Math.floor(minutes % 60)}`.padStart(2, '0')}`;

    const SUNRISE = 465;
    const SUNSET = 465 + (12 * 60);
    const rotationSnap = 15;

    const onInput = function (this: any) {
      if (this && this.rotation !== undefined) {
        let VALUE = Math.floor(((this.rotation % 360) / 360) * parseInt(INPUT.max, 10));
        if (VALUE < 0) VALUE = parseInt(INPUT.max, 10) - Math.abs(VALUE);
        INPUT.value = VALUE.toString();
      } else {
        gsap.set(RING, {
          rotate: ROTATE_MAPPER(parseInt(INPUT.value, 10))
        });
      }
    // const onInput = (draggable?: DraggableInstance) => {
    //   const rotation = draggable?.rotation ?? 0;
    //   let VALUE = Math.floor(((rotation % 360) / 360) * parseInt(INPUT.max, 10));
    //   if (VALUE < 0) VALUE = parseInt(INPUT.max, 10) - Math.abs(VALUE);
    //   INPUT.value = VALUE.toString();
      const TIME_VALUE = minToTime(gsap.utils.wrap(0, 1440, parseInt(INPUT.value, 10) + (SUNSET + (SUNRISE - SUNSET) * 0.5)));
      gsap.set(TIME, {
        innerText: TIME_VALUE
      });
      gsap.set(HANDLE, {
        rotate: ROTATE_MAPPER(-parseInt(INPUT.value, 10))
      });
      if (parseInt(INPUT.value, 10) > parseInt(INPUT.max, 10) * 0.25 && parseInt(INPUT.value, 10) < parseInt(INPUT.max, 10) * 0.75) {
        gsap.to('[aria-label="sun"]', { scale: 0, duration: 0.25 });
        gsap.to('[aria-label="moon"]', { scale: 1, duration: 0.25 });
        gsap.set(HANDLE, { background: 'var(--gray-8)' });
        gsap.set('body', { background: 'var(--text-1)' });
        gsap.set(TIME, { color: 'var(--surface-1)' });
      } else {
        gsap.to('[aria-label="moon"]', { scale: 0, duration: 0.25 });
        gsap.to('[aria-label="sun"]', { scale: 1, duration: 0.25 });
        gsap.set(HANDLE, { background: 'var(--gray-0)' });
        gsap.set('body', { background: 'var(--surface-1)' });
        gsap.set(TIME, { color: 'var(--text-1)' });
      }
      // Based on the value work out the conic-gradient percentages...
      // Remember the ring starts at 0 and the input at 0 but the stops are offset.
      const sunInput = parseInt(INPUT.value, 10) > parseInt(INPUT.max, 10) * 0.75 ? parseInt(INPUT.value, 10) - parseInt(INPUT.max, 10) * 0.75 : parseInt(INPUT.value, 10) + parseInt(INPUT.max, 10) * 0.25;
      const moonInput = parseInt(INPUT.value, 10) > parseInt(INPUT.max, 10) * 0.75 ? 0 : parseInt(INPUT.value, 10) - parseInt(INPUT.max, 10) * 0.25;
      gsap.set(TRACK, {
        '--sun-stop': gsap.utils.clamp(0, 50, PROGRESS_MAPPER(sunInput) || 0),
        '--moon-stop': gsap.utils.clamp(0, 50, PROGRESS_MAPPER(moonInput) || 0)
      });
    };

    const draggable = Draggable.create(RING, {
      trigger: HANDLE,
      type: "rotation",
      inertia: true,
      onThrowUpdate: onInput,
      throwResistance: 300, // 🔧 try 300 (fast) to 2000 (slow)
      onDrag: onInput,
      // onDragEnd: onInput,
      snap: function (endValue: number) {
        return Math.round(endValue / rotationSnap) * rotationSnap;
      }
    });

    // INPUT.addEventListener('input', onInput);

    onInput();

    return () => {
      draggable[0]?.kill();
    };
  }, []);

  return (
    <div className={`${styles.body} w-full h-screen flex items-center justify-center`}>
      <div className={`${styles.radial} radial`}>
        <div className={styles.radial__track} ref={trackRef}></div>
        <div className={styles.radial__indicators}>
          <div className={styles.radial__indicator}>
            <svg viewBox="0 0 640 512" aria-label="cloud-sun">
              <path d="M575.2 325.7c.2-1.9.8-3.7.8-5.6 0-35.3-28.7-64-64-64-12.6 0-24.2 3.8-34.1 10-17.6-38.8-56.5-66-101.9-66-61.8 0-112 50.1-112 112 0 3 .7 5.8.9 8.7-49.6 3.7-88.9 44.7-88.9 95.3 0 53 43 96 96 96h272c53 0 96-43 96-96 0-42.1-27.2-77.4-64.8-90.4zm-430.4-22.6c-43.7-43.7-43.7-114.7 0-158.3 43.7-43.7 114.7-43.7 158.4 0 9.7 9.7 16.9 20.9 22.3 32.7 9.8-3.7 20.1-6 30.7-7.5L386 81.1c4-11.9-7.3-23.1-19.2-19.2L279 91.2 237.5 8.4C232-2.8 216-2.8 210.4 8.4L169 91.2 81.1 61.9C69.3 58 58 69.3 61.9 81.1l29.3 87.8-82.8 41.5c-11.2 5.6-11.2 21.5 0 27.1l82.8 41.4-29.3 87.8c-4 11.9 7.3 23.1 19.2 19.2l76.1-25.3c6.1-12.4 14-23.7 23.6-33.5-13.1-5.4-25.4-13.4-36-24zm-4.8-79.2c0 40.8 29.3 74.8 67.9 82.3 8-4.7 16.3-8.8 25.2-11.7 5.4-44.3 31-82.5 67.4-105C287.3 160.4 258 140 224 140c-46.3 0-84 37.6-84 83.9z" />
            </svg>
          </div>
          <div className={styles.radial__indicator}>
            <svg viewBox="0 0 576 512" aria-label="cloud-moon">
              <path d="M342.8 352.7c5.7-9.6 9.2-20.7 9.2-32.7 0-35.3-28.7-64-64-64-17.2 0-32.8 6.9-44.3 17.9-16.3-29.6-47.5-49.9-83.7-49.9-53 0-96 43-96 96 0 2 .5 3.8.6 5.7C27.1 338.8 0 374.1 0 416c0 53 43 96 96 96h240c44.2 0 80-35.8 80-80 0-41.9-32.3-75.8-73.2-79.3zm222.5-54.3c-93.1 17.7-178.5-53.7-178.5-147.7 0-54.2 29-104 76.1-130.8 7.3-4.1 5.4-15.1-2.8-16.7C448.4 1.1 436.7 0 425 0 319.1 0 233.1 85.9 233.1 192c0 8.5.7 16.8 1.8 25 5.9 4.3 11.6 8.9 16.7 14.2 11.4-4.7 23.7-7.2 36.4-7.2 52.9 0 96 43.1 96 96 0 3.6-.2 7.2-.6 10.7 23.6 10.8 42.4 29.5 53.5 52.6 54.4-3.4 103.7-29.3 137.1-70.4 5.3-6.5-.5-16.1-8.7-14.5z" />
            </svg>
          </div>
        </div>
        <div className={styles.radial__ring} ref={ringRef}>
          <button className={styles.radial__handle} ref={handleRef}>
            <svg viewBox="0 0 512 512" aria-label="sun">
              <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z" />
            </svg>
            <svg viewBox="0 0 512 512" aria-label="moon">
              <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" />
            </svg>
          </button>
        </div>
        <h2 className={styles.radial__time} ref={timeRef}></h2>
        <input className={styles['sr-only']} type="range" id="radial" min="0" max="1440" defaultValue="0" step="1" ref={inputRef} />
      </div>
    </div>
  );
}
