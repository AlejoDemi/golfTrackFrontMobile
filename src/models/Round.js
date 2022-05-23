export class Round {
    roundId;
    player;
    courseId;
    playDate;
    holesScore = [];


    constructor(roundId, player, courseId, playDate) {
        this.roundId = roundId;
        this.player = player;
        this.courseId = courseId;
        this.playDate = playDate;
    }

    addPlayedHole = (num,score,putts,fairway) => {
        const aux = this.holesScore.filter(h => h.num === num);
        if (aux.length > 0){
            this.holesScore[0] = new PlayedHole(num,score,putts,fairway);
        }else{
            this.holesScore.push(new PlayedHole(num,score,putts,fairway));
        }
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
