export class Battle {
    constructor(team1Data, team2Data) {
        this.team1Queue = [...team1Data.members];
        this.team2Queue = [...team2Data.members];
        this.team1Name = team1Data.name;
        this.team2Name = team2Data.name;

        this.rounds = [];
        this.team1Fainted = [];
        this.team2Fainted = [];
    }

    simulate() {
        let current1 = this.team1Queue.shift();
        let current2 = this.team2Queue.shift();

        while (current1 && current2) {
            const result = this.resolveRound(current1, current2);

            this.rounds.push(result.log);

            if (result.winner === current1) {
                this.team2Fainted.push(current2);
                current2 = this.team2Queue.shift();
            } else {
                this.team1Fainted.push(current1);
                current1 = this.team1Queue.shift();
            }
        }

        const team1Survivors = current1 ? [current1, ...this.team1Queue] : [...this.team1Queue];
        const team2Survivors = current2 ? [current2, ...this.team2Queue] : [...this.team2Queue];

        return {
            rounds: this.rounds,
            team1Survivors,
            team2Survivors,
            team1Fainted: this.team1Fainted,
            team2Fainted: this.team2Fainted,
            winner: team1Survivors.length > 0 ? this.team1Name : this.team2Name
        };
    }

    resolveRound(p1, p2) {
        let winner = null;
        let reason = "";

        const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);

        //Chech speed
        const first = p1.isFasterThan(p2) ? p1 : p2;
        const second = first === p1 ? p2 : p1;

        //Check if attack > defender's defense, defender faints (Attacker wins).
        if (first.canBreakDefense(second)) {
            winner = first;
            reason = `${cap(first.name)} attacks first and breaks defense!`;
        }
        //Check if defender's attack > attacker's defense, attacker faints (Defender wins). Counter attack.
        else if (second.canBreakDefense(first)) {
            winner = second;
            reason = `${cap(first.name)}'s attack failed. ${cap(second.name)} counters and breaks defense!`;
        }
        //Check f neither breaks defense, faster wins.
        else {
            winner = first;
            reason = "Both defenses held. Faster Pokémon wins!";
        }

        return {
            winner,
            log: {
                pokemon1: p1,
                pokemon2: p2,
                winner,
                reason
            }
        };
    }
}
