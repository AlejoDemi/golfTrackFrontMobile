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

    addPlayedHole = (num,score,putts,fairway) => {
        const aux = this.holesScore.filter(h => h.num === num);
        if (aux.length > 0){
            this.holesScore[0] = new PlayedHole(num,score,putts,fairway);
        }else{
            this.holesScore.push(new PlayedHole(num,score,putts,fairway));
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
            counter += this.holesScore[holeNum-9+1].putts;
        }
        return counter
    }

    getPercentageFairways = (holeNum) => {
        let counter = 0;
        for (let i = 0; i < holeNum; i++) {
            if (this.holesScore[holeNum-9+1].fairway === 'middle'){
                counter++;
            }
        }
        const percentage = counter/9;
        console.log(percentage);
        return (percentage).toFixed(2);
    }
}

export class PlayedHole {
    num;
    score;
    putts;
    fairway;

    constructor(num, score, putts, fairway) {
        this.num = num;
        this.score = score;
        this.putts = putts;
        this.fairway = fairway;
    }
}
