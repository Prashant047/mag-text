"use client";
import React from 'react';
import { cn } from './cn';

export default function Home() {
  return (
    <main className='h-screen flex flex-col gap-10 justify-center items-center'>
      <MagText text="Magnet-Text-REACT-Component" className='text-xl sm:text-3xl md:text-5xl'/>
      <p className='text-neutral-400'>hover over the above text.</p>
    </main>
  )
};

interface MagTextProps {
  text: string,
  className?: string
  fadeIn?: boolean
};

function MagText({text, className}: MagTextProps ){

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {

    // @ts-ignore
    const containerSpan = event.target.parentElement as HTMLSpanElement;
    const boundingRect = containerSpan.getBoundingClientRect();
    let localX = event.clientX - boundingRect.x;

    for(let i=0;i<containerSpan.children.length; i++ ){
      const childBoundingRect = containerSpan.children[i].getBoundingClientRect();
      let childX = childBoundingRect.x - boundingRect.x;

      let diff = Math.abs(localX-childX);
      let weight = Math.max(300, 800*(1-(diff/100)));

      // @ts-ignore
      containerSpan.children[i].style.fontWeight = `${weight}`;
    }

  }

  const characters = text.split('').map((char, index) => {
    if (char === ' ') {
      return <span key={index}>&nbsp;</span>
    }
    return (
      <span key={index}>{char}</span>
    )
  });


  return (
    <span onMouseMove={handleMouseMove} className={cn("inline-flex variable-font cursor-default font-publicsans", className)}>
      { characters }
    </span>
  )
}
