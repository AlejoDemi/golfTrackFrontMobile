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