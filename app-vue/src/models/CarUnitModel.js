export default class CarUnitModel {
    constructor(floors, currentFloorIdx, carId) {
        this.floors = floors;
        this.currentFloorIdx = currentFloorIdx;
        this.door = 'closed';
        this.isSelected = false;
        this.carId = carId;
    }
}