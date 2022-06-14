
export class Round {
    options = {
        mode: 'gross',
        handicap: 0,
        options: 'scoring',
    }
    player;
    courseId;
    playDate;
    holesScore = [];

    constructor(playerId, courseId, playDate, options) {
        this.player = playerId;
        this.courseId = courseId;
        this.playDate = playDate;
        this.options = options;
    }

    addPlayedHole = (num,score,putts,gir,fairway) => {
        const aux = this.holesScore.filter(h => h.num === num);
        if (aux.length > 0){
            this.holesScore[num - 1] = new PlayedHole(num,score,putts,gir,fairway);
        }else{
            this.holesScore.push(new PlayedHole(num,score,putts,gir,fairway));
        }
    }

    getScore = (holeNum) => {
        let counter = 0;
        for (let i = 0; i < holeNum; i++) {
            counter += this.holesScore[holeNum-9+i].score;
        }
        return counter
    }

    getPutts = (holeNum ) => {
        let counter = 0;
        for (let i = 0; i < holeNum; i++) {
            counter += this.holesScore[holeNum-9+i].putts;
        }
        console.log(counter)

        return counter
    }

    getRoundPutts = (num ) => {
        if (num === 9){
            return this.getPercentagePutts(9);
        }else{
            return this.getPercentagePutts(9) + this.getPercentagePutts(18);
        }
    }

    getPercentagePutts = (holeNum) => {
        let counter = 0;
        for (let i = 0; i < holeNum; i++) {
            if (this.holesScore[holeNum-9+i].putts <= 2){
                counter++;
            }
        }
        return counter/9;
    }

    getRoundFW = (num ) => {
        if (num === 9){
            return this.getPercentageFairways(9);
        }else{
            return this.getPercentageFairways(9) + this.getPercentageFairways(18);
        }
    }

    getPercentageFairways = (holeNum) => {
        let counter = 0;
        for (let i = 0; i < holeNum; i++) {
            if (this.holesScore[holeNum-9+i].fairway === 'middle'){
                counter++;
            }
        }
        return counter/9;
    }

    getRoundGIR = (num ) => {
        if (num === 9){
            return this.getPercentageGIR(9);
        }else{
            return this.getPercentageGIR(9) + this.getPercentageGIR(18);
        }
    }

    getPercentageGIR = (holeNum) => {
        let counter = 0;
        for (let i = 0; i < holeNum; i++) {
            if (this.holesScore[holeNum-9+i].gir){
                counter++;
            }
        }
        return counter/9;
    }

    saveRound = () => {

    }
}

export class PlayedHole {
    num;
    score;
    putts;
    fairway;
    gir;

    constructor(num, score, putts, gir, fairway) {
        this.num = num;
        this.score = score;
        this.putts = putts;
        this.gir = gir;
        this.fairway = fairway;
    }
}
