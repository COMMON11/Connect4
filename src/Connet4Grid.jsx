import Blank from './assets/Blank.svg';
import YellowChip from './assets/Yellow_chip.svg'
import RedChip from './assets/Red_chip.svg'
import TransparentChip from './assets/Transparent_chip.svg';
import { useState, useEffect } from 'react';

function Connet4Grid() {

    const [turn, setTurn] = useState("P1")

    const [chip, setChip] = useState(new Array(7).fill(TransparentChip));
    const [board, setBoard] = useState([]);


    //* initialize blank board
    useEffect(() => {
        const initialBoard = new Array(6).fill().map((_, i) => 
                new Array(7).fill().map((_, j) => ({ id: `${i}-${j}`, value: Blank })
                )
            );
        setBoard(initialBoard);
    }, []);

    //* update/add chip to board
    const updateBoardValue = (id, newValue) => {
        setBoard(prevBoard => 
            prevBoard.map(row => 
                row.map(cell => 
                    cell.id === id ? { ...cell, value: newValue } : cell
                )  
            )
        );
    };

    //* Show chip when hovered
    const handleMouseEnter = (index) => {
        const chipColour = turn === "P1" ? RedChip : YellowChip
        setChip(prevChip => 
            prevChip.map((chip, i) => i === index ? chipColour : chip)
        );
    };
    //* Hide chip not hovered
    const handleMouseLeave = (index) => {
        setChip(prevChip => 
            prevChip.map((chip, i) => i === index ? TransparentChip : chip)
        );
    };

    const handleClick = (index) => {
        const chipColour = turn === "P1" ? RedChip : YellowChip;
        for (let i = 5; i >= 0; i--) {
            const id = `${i}-${index}`;
            if (board[i][index].value === Blank) {
                updateBoardValue(id, chipColour);
    
                setTurn(prevTurn => prevTurn === "P1" ? "P2" : "P1");
                
                const nextChipColour = turn === "P1" ? YellowChip : RedChip;
                setChip(prevChip => 
                    prevChip.map((chip, i) => i === index ? nextChipColour : chip)
                );
                break; //? Code still works after removing this.
            }
        }
    };

    return (
        <>
            <div className='grid grid-rows-1 grid-cols-7 w-[600px] h-[100px]  p-2'>
                {new Array(7).fill().map((_, i) => (
                    <button 
                        key={i}
                        onMouseEnter={() => handleMouseEnter(i)} 
                        onMouseLeave={() => handleMouseLeave(i)}
                        onClick={() => handleClick(i)}
                    >
                        <img src={chip[i]} alt={`chip-${i}`} />
                    </button>
                ))}
            </div>
                <div className="w-[600px] h-[520px] grid grid-rows-6 grid-cols-7 gap-2 bg-sky-700 p-2 rounded-lg shadow-2xl outline-8 outline-sky-900 outline-none outline-offset-0">                    
                    {board.flat().map(item => (
                    <img src={item.value} key={item.id} alt={item.id} />
                ))}
            </div>
            <input type='button' value="Click me" onClick={() => updateBoardValue("2-3", YellowChip)} />
            <input type='button' value="Click me" onClick={() => updateBoardValue("5-0", RedChip)} />
        </>
    );
}

export default Connet4Grid