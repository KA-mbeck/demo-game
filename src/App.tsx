import React, { useState, useEffect } from 'react';
    import './index.css';

    const Game = () => {
      const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 150 });
      const [bullets, setBullets] = useState([]);
      const [isMoving, setIsMoving] = useState(false);

      const playerSpeed = 5;
      const gameWidth = 800;
      const gameHeight = 600;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
          setPlayerPosition((prevPosition) => ({
            ...prevPosition,
            x: Math.max(0, prevPosition.x - playerSpeed),
          }));
          setIsMoving(true);
        } else if (event.key === 'ArrowRight') {
          setPlayerPosition((prevPosition) => ({
            ...prevPosition,
            x: Math.min(gameWidth - 50, prevPosition.x + playerSpeed),
          }));
          setIsMoving(true);
        } else if (event.key === ' ') {
          // Implement shooting logic here
          console.log('Shooting!');
          // Add bullet to bullets array
          setBullets((prevBullets) => [...prevBullets, { x: playerPosition.x, y: playerPosition.y }]);
        }
      };

      useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

      return (
        <div
          className="min-h-screen bg-gray-100 flex items-center justify-center"
          onKeyDown={handleKeyDown}
        >
          <div className="relative">
            {/* Player */}
            <div
              className="absolute top-[150px] left-[100px] w-[50px] h-[50px] bg-blue-500 rounded-full"
              style={{ left: playerPosition.x }}
            ></div>

            {/* Bullets */}
            {bullets.map((bullet, index) => (
              <div
                key={index}
                className="absolute top-0 left-0 w-[5px] h-[5px] bg-red-500"
                style={{ left: bullet.x, top: bullet.y }}
              />
            ))}
          </div>
        </div>
      );
    };

    export default Game;
