"use client";
import { Typewriter } from "react-simple-typewriter";
import { twMerge } from "tailwind-merge";

interface TypeWriterComponentProps {
  className?: string;
  words: string[];
  cursor: boolean;
  loop: number;
  typeSpeed: number;
  deleteSpeed: number;
  delaySpeed: number;
}

const TypeWriterComponent = ({
  className,
  words,
  cursor,
  loop,
  typeSpeed,
  deleteSpeed,
  delaySpeed,
}: TypeWriterComponentProps) => {
  return (
    <div className={twMerge(className)}>
      <Typewriter
        words={words}
        loop={loop}
        cursor={cursor}
        cursorStyle="|"
        typeSpeed={typeSpeed}
        deleteSpeed={deleteSpeed}
        delaySpeed={delaySpeed}
      />
    </div>
  );
};

export default TypeWriterComponent;
