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

    getPar = () => {
        let counter = 0;
        for (const hole of this.holesList) {
            counter += hole.par;
        }
        return counter;
    }

    getDistance = () => {
        let counter = 0;
        for (const hole of this.holesList) {
            counter += hole.distance;
        }
        return counter;
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