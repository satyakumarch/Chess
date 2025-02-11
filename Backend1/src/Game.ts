import { WebSocket } from "ws";
import {Chess} from 'chess.js';
import { INIT_GAME,MOVE,GAME_OVER } from "./messages";


export  class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    public board:Chess
    private startTime:Date;
    private moveCount=0;

    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2;
        this.board= new Chess();
        this.startTime=new Date();
        // this.moves=[];
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }

        }));
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }));
    }
    makeMove(socket:WebSocket,move:{
        from:string;
        to:string;
    }){
        //validate the type of move using zod
         console.log(this.board.moves().length);
         console.log(this.board.board());
        if(this.moveCount % 2 === 0 && socket !== this.player1){
            return

        }
        if(this.moveCount % 2 === 1 && socket !== this.player2){
            return;
        }
        try{
            this.board.move(move);
        }catch(e){
            return;
        }
        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==="w"?"black":"white"
                }
            }))
            this.player2.emit(JSON.stringify({
                type:GAME_OVER,
                paylaod:{
                    winner:this.board.turn()==="w"?"black":"white"
                }
            }))
            return;
        }
        if(this.moveCount%2===0){

            this.player2.emit(JSON.stringify({
                type:MOVE,
                Payload:move
            }))
        }else{
            this.player1.emit(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        this.moveCount++;

    }
}
        //validation here
        //is it this users move
        //is the move valid

        //update the board
        //push the move

        //check of the game 

