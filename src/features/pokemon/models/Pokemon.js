export class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.types = data.types;
        this.sprite = data.sprite;
        this.stats = data.stats;
        this.instanceId = data.instanceId || null;
    }

    getSpeed() {
        return this.stats.speed;
    }

    getAttack() {
        return this.stats.attack;
    }

    getDefense() {
        return this.stats.defense;
    }

    isFasterThan(opponent) {
        return this.getSpeed() >= opponent.getSpeed();
    }

    canBreakDefense(opponent) {
        return this.getAttack() > opponent.getDefense();
    }
}
