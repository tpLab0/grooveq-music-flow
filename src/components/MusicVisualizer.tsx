
import { useEffect, useState } from "react";
import { useQueue } from "@/contexts/QueueContext";

export const MusicVisualizer = () => {
  const { currentSong } = useQueue();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(!!currentSong);
    
    // Reset animation when song changes
    const bars = document.querySelectorAll('.visualizer-bar');
    bars.forEach(bar => {
      bar.classList.remove('animate-music-pulse', 'animate-music-pulse-slow', 'animate-music-pulse-slower');
      void bar.offsetWidth; // Trigger reflow to restart animation
      
      // Add animation classes back with delays
      const animClass = ['animate-music-pulse', 'animate-music-pulse-slow', 'animate-music-pulse-slower'][
        Math.floor(Math.random() * 3)
      ];
      bar.classList.add(animClass);
    });
  }, [currentSong]);

  // Generate an array of heights for the visualizer bars
  const getRandomHeight = () => `${20 + Math.random() * 60}%`;

  const barCount = 16;
  const bars = Array.from({ length: barCount }, (_, i) => ({
    id: i,
    height: getRandomHeight(),
    delay: `${i * 0.05}s`,
    animationClass: ['animate-music-pulse', 'animate-music-pulse-slow', 'animate-music-pulse-slower'][
      Math.floor(Math.random() * 3)
    ],
  }));

  return (
    <div 
      className={`flex items-end justify-center h-24 gap-1 transition-opacity duration-500 ${
        isPlaying ? 'opacity-100' : 'opacity-30'
      }`}
    >
      {bars.map((bar) => (
        <div
          key={bar.id}
          className={`visualizer-bar bg-gradient-to-t from-groove-purple to-groove-pink rounded-full w-1.5 ${
            bar.animationClass
          }`}
          style={{
            height: bar.height,
            animationDelay: bar.delay,
            opacity: isPlaying ? 1 : 0.5,
          }}
        ></div>
      ))}
    </div>
  );
};
