'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

const StaggeredList = () => {
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const dur = 0.5;
  const lastItems = useRef<Element[]>([]);
  const lastIndex = useRef<number>(-1);

  useEffect(() => {
    const listItems = listItemsRef.current.filter(Boolean) as HTMLLIElement[];

    listItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        // Get all content within the clicked item
        const itemTargets = gsap.utils.toArray(item.querySelectorAll('*')) as Element[];

        // Check to see if the item is the same one as the last time
        const isSameAsLast = i === lastIndex.current && listItems[lastIndex.current];

        // Get all the items that are changing this click
        const targets = isSameAsLast ?
          [...listItems, ...itemTargets] :
          [...listItems, ...itemTargets, ...lastItems.current];

        // grab the current state of the targets (before changing)
        const state = Flip.getState(targets);

        // Animate out the last clicked item if it's not the same as the current
        if (!isSameAsLast && listItems[lastIndex.current]) {
          listItems[lastIndex.current].classList.remove('expanded');
        }

        // Toggle the display on the clicked item
        listItems[i].classList.toggle('expanded');

        Flip.from(state, {
          duration: dur,
          ease: "power1.inOut",
          absolute: true, // make things position: absolute during the flip
          nested: true,   // we've got nested flipping elements (more expensive processing)
          // Fade in or out the elements within the item
          onEnter: elements => gsap.fromTo(elements, {opacity: 0}, {opacity: 1, duration: dur / 2, delay: dur / 2}),
          onLeave: elements => gsap.fromTo(elements, {opacity: (i, el) => state.getProperty(el, "opacity")}, {opacity: 0, duration: dur / 2}),
        });

        // Update our variables
        lastItems.current = itemTargets as Element[];
        lastIndex.current = i;
      });
    });
  }, []);

  return (
    <div className="staggered-list-content">
      <ul className="list">
        {Array.from({ length: 7 }, (_, i) => (
          <li
            key={i}
            ref={(el) => { listItemsRef.current[i] = el; }}
            className="listItem"
          >
            <div className="avatar"></div>

            <div className="description">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>

            <div className="additional-content">
              <div className="chunk"></div>
              <div className="chunk"></div>
              <div className="chunk"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaggeredList;