export class Course {
    id;
    name;
    description;
    clubHouseLocation;
    holesList = [];

    constructor(name, description, clubHouseLocation) {
        this.name = name;
        this.description = description;
        this.clubHouseLocation = clubHouseLocation;
    }

    addHole = (number,hole) => {
        this.holesList[number-1] = hole;
    }

    getPar = (holeNum ) => {
        let counter = 0;
        for (let i = 0; i < holeNum; i++) {
            counter += this.holesList[holeNum-9+i].par;
        }
        console.log(counter)
        return counter
    }

    getDistance = (holeNum ) => {
        let counter = 0;
        for (let i = 0; i < holeNum; i++) {
            counter += this.holesList[holeNum-9+i].distance;
        }
        return counter
    }
}



export class Hole {
    id;
    num;
    par;
    scoringIndex;
    distance;
    locationMidOfGreen;
    locationTeebox;


    constructor(id, num, par, scoringIndex, distance, locationMidOfGreen, locationTeebox) {
        this.id = id;
        this.num = num;
        this.par = par;
        this.scoringIndex = scoringIndex;
        this.distance = distance;
        this.locationMidOfGreen = locationMidOfGreen;
        this.locationTeebox = locationTeebox;
    }
}