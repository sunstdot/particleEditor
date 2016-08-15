import Vector from './vector'
export default class Field {
    constructor(point, mass,id) {
        this.position = point;
        this.size = 15;
        this.mass = 0;
        this.drawColor = '#b00';
        this.type = "field";
        this.setMass(mass);
    }

    setMass(mass) {
        this.mass = mass;
        this.drawColor = mass < 0 ? "#f00" : "#0f0";
        return this;
    }

    moveTo(point) {
        this.position = point;
    }

    toString() {
        let coreAttributes = [
            this.position.toString(),
            this.mass
        ];
        return 'F' + coreAttributes.join(':');
    }

}
Field.fromString = (string) => {
    let parts = string.substr(1).split(':');
    let field = new Field(Vector.fromString(parts.shift()),parseInt(parts.shift(),10));
    return field;
}
Field.drawColor = "#0000FF";
Field.drawColor2 = "#000000";