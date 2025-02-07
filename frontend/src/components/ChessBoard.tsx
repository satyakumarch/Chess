// import { Chess, Color, PieceSymbol, Square } from 'chess.js';
// import { useState } from 'react';
// import { MOVE } from '../screens/Game';


// export const ChessBoard = ({ chess, board, socket, setBoard }: {
//     chess: any;
//     setBoard: any;
//     board: ({
//         square: Square;
//         type: PieceSymbol;
//         color: Color;
//     } | null)[][]
//     socket: WebSocket;
// }) => {
//     const [from, setFrom] = useState<null | Square>(null);
//     const [to, setTo] = useState<null | Square>(null);

//     return <div className='text-white-200'>
//         {board.map((row, i) => (
//             return <div key={i} className='flex'>
//             {row.map((square, j) => {
//                 const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;

//                 return <div onClick={() => {
//                     if (!from) {
//                         setFrom(squareRepresentation);

//                     } else {
//                         setTo(square?.square ?? null);
//                         socket.send(JSON.stringify({
//                             type: MOVE,
//                             payload: {
//                                 from,
//                                 to: squareRepresentation
//                             }
//                         }))
//                         setFrom(null)
//                         Chess.move(move);
//                         setBoard(Chess.board());
//                         console.log({
//                             from,
//                             to: squareRepresentation

//                         })
//                     }
//                 } key={j} className={`w-16 h-16 ${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-white'}`}>
//                     <div className='w-full justify-center flex'>
//                         <div className='h-full justify-center flex flex-col '>

//                             {square ? square.type : ""}
//                         </div>
//                     </div>
//                 </div>
//             })}
//         </div>
//         })}
//     </div>
// }
// export default ChessBoard

import { Chess, Color, PieceSymbol, Square } from 'chess.js';
import { useState } from 'react';
import { MOVE } from '../screens/Game';

export const ChessBoard = ({ chess, board, socket, setBoard }: {
    chess: any;
    setBoard: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) => {
    const [from, setFrom] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    return (
        <div className='text-white-200'>
            {board.map((row, i) => (
                <div key={i} className='flex'>
                    {row.map((square, j) => {
                        const squareRepresentation = String.fromCharCode(97 + (j % 8)) + (8 - i) as Square;

                        return (
                            <div
                                key={j}
                                onClick={() => {
                                    if (!from) {
                                        setFrom(squareRepresentation);
                                    } else {
                                        setTo(square?.square ?? null);
                                        socket.send(
                                            JSON.stringify({
                                                type: MOVE,
                                                payload: {
                                                    from,
                                                    to: squareRepresentation,
                                                },
                                            })
                                        );
                                        // setFrom(null);
                                        // chess.move({ from, to: squareRepresentation });
                                        setBoard(chess.board());
                                        console.log({ from, to: squareRepresentation });
                                    }
                                }} key={j} className={`w-16 h-16 ${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-slate-500' }`} >
                                <div className='w-full justify-center flex h-full'>
                                    <div className='h-full justify-center flex flex-col'>
                                        {square ?<img className='w-4' src={`/${square?.color==="b" ?
                                            square?.type: `${square?.type?.toUpperCase()} copy`}.png`}/>:null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;
