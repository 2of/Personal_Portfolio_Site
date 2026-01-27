import React, { useState, useEffect, useRef } from "react";

const DrawGame = ({ x_l, y_l, snake, food }) => {
    const cellSize = 20;
    
    const isSnake = (x, y) => {
        return snake.some(segment => segment[0] === x && segment[1] === y);
    };
    
    const isFood = (x, y) => {
        return food && food[0] === x && food[1] === y;
    };
    
    const isHead = (x, y) => {
        return snake[0][0] === x && snake[0][1] === y;
    };
    
    return (
        <div style={{
            display: 'inline-grid',
            gridTemplateColumns: `repeat(${x_l}, ${cellSize}px)`,
            gap: '1px',
            backgroundColor: '#333',
            padding: '1px',
            border: '2px solid currentColor',
            userSelect: 'none',
        }}>
            {Array.from({ length: y_l }).map((_, y) => (
                Array.from({ length: x_l }).map((_, x) => (
                    <div
                        key={`${x}-${y}`}
                        style={{
                            width: cellSize,
                            height: cellSize,
                            backgroundColor: isHead(x, y) ? 'var(--text-color)' : 
                                           isSnake(x, y) ? '#666' : 
                                           isFood(x, y) ? 'var(--accent-color)' : 'var(--bg)',
                        }}
                    />
                ))
            ))}
        </div>
    );
};

export const SnakeGame = ({
    num_cells_x =10, 
    num_cells_y = 10
}) => { 
    const [snake, setSnake] = useState([[Math.floor(num_cells_x/2), Math.floor(num_cells_y/2)]]);
    const [direction, setDirection] = useState([0, 0]); // [dx, dy]
    const [food, setFood] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    
    const moveQueue = useRef([]);
    const lastDirection = useRef([0, 0]);

    const head = () => snake[0];

    const generateFood = () => {
        let newFood;
        do {
            newFood = [
                Math.floor(Math.random() * num_cells_x),
                Math.floor(Math.random() * num_cells_y)
            ];
        } while (snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
        
        setFood(newFood);
    };

    // Initialize food
    useEffect(() => {
        generateFood();
    }, []);

    const move = () => {
        if (gameOver) return;
        
        // Process next move from queue
        if (moveQueue.current.length > 0) {
            const nextDirection = moveQueue.current.shift();
            lastDirection.current = nextDirection;
            setDirection(nextDirection);
        }
        
        const currentDirection = lastDirection.current;
        
        if (currentDirection[0] === 0 && currentDirection[1] === 0) return;

        const newHead = [
            head()[0] + currentDirection[0],
            head()[1] + currentDirection[1]
        ];

        // Check boundaries
        if (newHead[0] < 0 || newHead[0] >= num_cells_x || 
            newHead[1] < 0 || newHead[1] >= num_cells_y) {
            console.log("Hit wall! Game over");
            setGameOver(true);
            return;
        }

        // Check self collision
        if (snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
            console.log("Hit yourself! Game over");
            setGameOver(true);
            return;
        }

        // Check if eating food
        const ateFood = food && newHead[0] === food[0] && newHead[1] === food[1];

        let newSnake;
        if (ateFood) {
            // Grow snake: add new head, keep tail
            newSnake = [newHead, ...snake];
            console.log("Ate food! Snake length:", newSnake.length);
            setSnake(newSnake);
            generateFood();
        } else {
            // Move snake: add new head, remove tail
            newSnake = [newHead, ...snake.slice(0, -1)];
            setSnake(newSnake);
        }
    };

    const queueDirection = (newDir) => {
        const lastDir = moveQueue.current.length > 0 
            ? moveQueue.current[moveQueue.current.length - 1]
            : lastDirection.current;
        
        // Prevent reversing
        if (newDir[0] === -lastDir[0] && newDir[1] === -lastDir[1]) {
            return;
        }
        
        // Prevent duplicate directions
        if (newDir[0] === lastDir[0] && newDir[1] === lastDir[1]) {
            return;
        }
        
        // Limit queue size to prevent over-queuing
        if (moveQueue.current.length < 3) {
            moveQueue.current.push(newDir);
        }
    };

    const up = () => queueDirection([0, -1]);
    const down = () => queueDirection([0, 1]);
    const left = () => queueDirection([-1, 0]);
    const right = () => queueDirection([1, 0]);

    const restart = () => {
        setSnake([[Math.floor(num_cells_x/2), Math.floor(num_cells_y/2)]]);
        setDirection([0, 0]);
        lastDirection.current = [0, 0];
        moveQueue.current = [];
        setGameOver(false);
        generateFood();
    };

    // Handle keyboard input
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameOver && e.key === ' ') {
                e.preventDefault();
                restart();
                return;
            }
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    up();
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    down();
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    left();
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    right();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameOver]);

    // Game loop de loop
    useEffect(() => {
        const interval = setInterval(move, 150);
        return () => clearInterval(interval);
    }, [snake, food, gameOver]);

    return (
        <div style={{ 
            padding: '20px', 

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        }}>
            <h2 style={{ margin: 0 }}>Snake & Snake</h2>
            
            <DrawGame 
                x_l={num_cells_x} 
                y_l={num_cells_y} 
                snake={snake} 
                food={food} 
            />
            
            <div style={{ textAlign: 'center', fontSize: '14px', opacity: 0.7 }}>
                {gameOver ? (
                    <>
                        <p style={{ margin: '4px 0', fontSize: '18px', fontWeight: 'bold', color: '#ff4444' }}>
                            Game Over!
                        </p>
                        <p style={{ margin: '4px 0' }}>Final length: {snake.length}</p>
                        <p style={{ margin: '4px 0' }}>Press SPACE to restart</p>
                    </>
                ) : (
                    <>
                        <p style={{ margin: '4px 0' }}>Use Arrow Keys or WASD to move</p>
                        <p style={{ margin: '4px 0' }}>Snake length: {snake.length}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default SnakeGame;