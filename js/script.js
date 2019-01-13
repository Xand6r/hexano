const app=new Vue({
    el:"#app",
    data:{
        gameStatus:"notStarted",
        board:["x","o","x","x","x","o","o","o","o"],
        playable:["x","o"],
        headerInfo:"X and O",
        turn:"",
        playerId:null,
        computerId:null,
        firstPlay:true,
        userScore:0,
        computerScore:0,
        level:null
    },
    methods:{
        error(str,t){
            let time=t||1500
            Materialize.toast(str,time)
        },
        reset(){
            this.board=["","","","","","","","",""];
            this.error("game has been reset",1500);
            this.currentPlayer=null;
            this.playerId=null;
            this.computerId=null;
            this.firstPlay=true;
            
        },
        restart(){
            this.board=["","","","","","","","",""];
            this.gameStatus="started"
        },
        start(){
            let player=prompt("do you want to play first(y/n)").toLowerCase();
            if(player!="y" && player!="n"){
                this.error("please enter 'y' or 'n'");
                return;
            }
            let level=Number(prompt("enter the level you'ld like to play on (1-3)"));
            if(level<1 || level>3){
                this.error("enter a level between 1 and 3");
                return;
            }
            this.level=level;
            this.reset();
            this.gameStatus="started";
            this.playerId=(player=="y")?1:2;
            this.computerId=(player=="y")?2:1
            if (player=="n"){
                this.turn="computer";
                this.computerPlay();
            }
            else{
                this.turn="human";
            }
            
        },
        play(index){
            if(this.gameStatus=="notStarted"){
                this.error("please start a game first");
                return;
            }
            if(this.gameStatus=="ended"){
                this.error("the current game has ended please start another one");
                return;
            }

            else if(this.turn=="human"){
                if(this.isPlayable(index)){
                    this.board[index]=this.playable[this.playerId-1];
                    this.checkForWinner();
                    if(this.gameStatus!="ended"){
                        this.turn="computer";
                        setTimeout(()=>this.computerPlay(),500);
                    }
                }
                else{
                    this.error("you cannot play here");
                }
            }
            else{
                this.error("not your turn to play");
                return;
            }

        },
       isPlayable(index){
           return this.board[index]=="";
       },
        checkForWinner(){
            if(this.board[0]==this.board[1] && this.board[1]==this.board[2] && this.board[0]!=""){
                winner=(this.playable.indexOf(this.board[0])+1==this.playerId)?"you":"computer";
                if(winner=="you"){
                    this.userScore+=1;
                }
                else{
                    this.computerScore+=1;
                }
                this.headerInfo=`winner:${winner}`;
                this.gameStatus="ended";
            }
            else if(this.board[4]==this.board[5] && this.board[5]==this.board[3] && this.board[3]!=""){
                winner=(this.playable.indexOf(this.board[4])+1==this.playerId)?"you":"computer";
                if(winner=="you"){
                    this.userScore+=1;
                }
                else{
                    this.computerScore+=1;
                }
                this.headerInfo=`winner:${winner}`;
                this.gameStatus="ended";
            }
            else if(this.board[7]==this.board[6] && this.board[8]==this.board[6] && this.board[6]!=""){
                winner=(this.playable.indexOf(this.board[7])+1==this.playerId)?"you":"computer";
                if(winner=="you"){
                    this.userScore+=1;
                }
                else{
                    this.computerScore+=1;
                }
                this.headerInfo=`winner:${winner}`;
                this.gameStatus="ended";
            }
            else if(this.board[0]==this.board[3] && this.board[3]==this.board[6] && this.board[6]!=""){
                winner=(this.playable.indexOf(this.board[0])+1==this.playerId)?"you":"computer";
                if(winner=="you"){
                    this.userScore+=1;
                }
                else{
                    this.computerScore+=1;
                }
                this.headerInfo=`winner:${winner}`;
                this.gameStatus="ended";
            }
            else if(this.board[1]==this.board[4] && this.board[4]==this.board[7] && this.board[1]!=""){
                winner=(this.playable.indexOf(this.board[1])+1==this.playerId)?"you":"computer";
                if(winner=="you"){
                    this.userScore+=1;
                }
                else{
                    this.computerScore+=1;
                }
                this.headerInfo=`winner:${winner}`;
                this.gameStatus="ended";
            }
            else if(this.board[2]==this.board[5] && this.board[5]==this.board[8] && this.board[8]!=""){
                winner=(this.playable.indexOf(this.board[2])+1==this.playerId)?"you":"computer";
                if(winner=="you"){
                    this.userScore+=1;
                }
                else{
                    this.computerScore+=1;
                }
                this.headerInfo=`winner:${winner}`;
                this.gameStatus="ended";
            }
            else if(this.board[0]==this.board[4] && this.board[4]==this.board[8] && this.board[8]!=""){
                winner=(this.playable.indexOf(this.board[0])+1==this.playerId)?"you":"computer";
                if(winner=="you"){
                    this.userScore+=1;
                }
                else{
                    this.computerScore+=1;
                }
                this.headerInfo=`winner:${winner}`;
                this.gameStatus="ended";
            }
            else if(this.board[2]==this.board[4] && this.board[4]==this.board[6] && this.board[2]!=""){
                winner=(this.playable.indexOf(this.board[2])+1==this.playerId)?"you":"computer";
                if(winner=="you"){
                    this.userScore+=1;
                }
                else{
                    this.computerScore+=1;
                }
                this.headerInfo=`winner:${winner}`;
                this.gameStatus="ended";
            }
            if(this.board.indexOf("")==-1){
                this.headerInfo="its a  draw"
                this.gameStatus="ended";
            }
    
        },
       computerPlay1(){
            do {
                randPoint=Math.floor(Math.random()*9);
            } while (!this.isPlayable(randPoint));
            this.board[randPoint]=this.playable[this.computerId-1];
            this.checkForWinner();
            this.turn="human";
       },
       calcVertical(start,myToken,otherToken){
            points=[start%9,(start+3)%9,(start+6)%9];
            return this.calcScore(points,myToken,otherToken);
       },
       calcDiagonal(start,myToken,otherToken){
            let leftDiag=[2,4,6];
            let rightDiag=[0,4,8];
            let points=[];

            if (leftDiag.some(e=>e===start)){
                points=leftDiag.slice();
                return this.calcScore(points,myToken,otherToken)
            }
            else if(rightDiag.some(e=>e===start)){
                points=rightDiag.slice()
                return this.calcScore(points,myToken,otherToken)
            }
            else return 0;
            
       },
       calcHorizontal(start,myToken,otherToken){
           let top=[0,1,2];
           let middle=[3,4,5];
           let bottom=[6,7,8];

           if(top.some(e=>e===start)){
               return this.calcScore(top.slice(),myToken,otherToken);
           }
           else if(middle.some(e=>e===start)){
               return this.calcScore(middle.slice(),myToken,otherToken)
           }
           else{
               return this.calcScore(bottom.slice(),myToken,otherToken)
           }
       }
       ,
       calcScore(points,myToken,otherToken){
            let Urgency=points.reduce((aggr,current)=>{
                aggr.myCount+=(this.board[current]==myToken);
                aggr.otherCount+=(this.board[current]==otherToken);
                return aggr;
            },{myCount:0,otherCount:0});

            if(Urgency.myCount==2){
                return 3;
            }
            else if(Urgency.otherCount==2){
                return 2;
            }
            else if(Urgency.otherCount==1){
                return -1
            }
            else if(Urgency.myCount==1){
                return 1;
            }
            else{
                return 0;
            }
       },
       computerPlay2(){
           let bestScore=-Infinity;
           let bestIndex=0;

           let myToken=this.playable[this.computerId-1];
           let otherToken=this.playable[this.playerId-1];
            if(this.firstPlay){
                this.computerPlay1();
                this.firstPlay=false;
            }
            else{
                for(let index=0;index<this.board.length;index++){
                    if(this.isPlayable(index)){
                        let vt=this.calcVertical(index,myToken,otherToken);
                        let dg=this.calcDiagonal(index,myToken,otherToken);
                        let hr=this.calcHorizontal(index,myToken,otherToken);

                        let tempScore=Math.max(vt,dg,hr);
                        // loss function is the total loss across the board;
                        if(tempScore>bestScore){
                            bestScore=tempScore;
                            bestIndex=index;
                        }
                        // console.log(`index:${index},v-point:${vt},h-point:${hr},d-point:${dg}`,vt+hr+dg)
                    }
                    
                }
                // console.log(bestIndex);
                this.board[bestIndex]=this.playable[this.computerId-1];
                this.checkForWinner();
                this.turn="human";
            }
       },
       computerPlay3(){
           let bestScore=-Infinity;
           let bestIndex=0;

           let myToken=this.playable[this.computerId-1];
           let otherToken=this.playable[this.playerId-1];
            if(this.firstPlay){
                this.computerPlay1();
                this.firstPlay=false;
            }
            else{
                for(let index=0;index<this.board.length;index++){
                    if(this.board[index]==""){
                        let vt=this.calcVertical(index,myToken,otherToken);
                        let dg=this.calcDiagonal(index,myToken,otherToken);
                        let hr=this.calcHorizontal(index,myToken,otherToken);

                        // loss function is the total loss across the board;
                        let tempScore=vt+dg+hr;
                        if(tempScore>bestScore){
                            bestScore=tempScore;
                            bestIndex=index;
                        }
                        // console.log(`index:${index},v-point:${vt},h-point:${hr},d-point:${dg}`,vt+hr+dg)
                    }
                    
                }
                // console.log(bestIndex);
                this.board[bestIndex]=this.playable[this.computerId-1];
                this.checkForWinner();
                this.turn="human";
            }
       },
       computerPlay(){
           let plays=[this.computerPlay1,this.computerPlay2,this.computerPlay3];
           plays[this.level-1]();
       }

    }
})