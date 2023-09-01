class Entity
{
    constructor(name, species, diet, baseHP, endurance, strength, perception)
    {
        this._name = name;
        this._species = species;
        this._diet = diet;
        this._baseHP = baseHP;
        this._hp = hp;
        this._endurance = endurance;
        this._strength = strength;
        this._perception = perception;
        this._hp = baseHP;
        this._location = {x: null, y: null};
    }

    getName() {return this._name}
    getBaseHP() {return this._baseHP}
    getHP() {return this._hp}
    getSpecies() {return this._species}
    getDiet() {return this._diet}
    getEND() {return this._endurance}
    getSTR() {return this._strength}
    getPER() {return this._perception}

    setBaseHP(newBaseHP) {this._baseHP = newBaseHP}
    modifyHP(amount) {
        if (this._hp + amount > this._baseHP) this._hp = this._baseHP;
        else if (this._hp + amount < 0) this._hp = 0;
        else this._hp += amount;
    }
    restoreHP() {this._hp = this._baseHP}
    setEND(newEndurance) {this._endurance = newEndurance}
    setSTR(newStrength) {this._strength = newStrength}
    setPER(newPerception) {this._perception = newPerception}

    setLocation(newLocation) {this._location = newLocation}
}

export class NPC extends Entity
{
    constructor(name, species, diet, baseHP, endurance, strength, perception,
                disposition, faction)
    {
        super(name, species, diet, baseHP, endurance, strength, perception);
        this._disposition = disposition;
        this._faction = faction;
    }

    modifyDisposition(amount){
        if (this.disposition + amount > 100) this.disposition = 100;
        else if (this.disposition + amount < 0) this.disposition = 0;
        else this.disposition += amount;
    }
}

export class PlayableCharacter extends Entity
{
    constructor(name, species, diet, baseHP, endurance, strength, perception,
                spirituality, dexterity, intelligence, discipline, personality,
                creativity)
    {
        super(name, species, diet, baseHP, endurance, strength, perception);
        this._dexterity = dexterity;
        this._spirituality = spirituality;
        this._intelligence = intelligence;
        this._discipline = discipline;
        this._personality = personality;
        this._creativity = creativity;
        this._karma = 0; // neutro

        this._skillset =
        {   // valores iniciais
            // bardo
            influence: creativity * 3 + discipline * 2,
            attraction: creativity * 2 + discipline * 3,
            // druida
            healing: spirituality * 5,
            alteration: spirituality * 3 + perception * 2,
            

            // inventor
            science: intelligence * 5,
            creation: dexterity * 2 + intelligence + creativity * 2,
            // explorador
            gathering: perception * 5,
            survival: endurance * 3 + intelligence * 2,
            // ladrão
            lockpicking: perception * 2 + dexterity * 3
        }
        
        this.knowledge = {
            // artesão
            wooden_arrows: false,
            // mecânico
            homemade_weapons: false,
            amateur_mechanic: false,
            // cartomante
            imprisonment: false,

        }
    }

    getDEX() {return this._dexterity}
    getSPT() {return this._spirituality}
    getINT() {return this._intelligence}
    getDSP() {return this._discipline}
    getPER() {return this._personality}
    getCRE() {return this._creativity}

    getSkillset() {return this._skillset}
    getKnowledge() {return this.knowledge}

    levelupInfluence() {this._skillset.influence++}
    levelupAttraction() {this._skillset.attraction++}
    levelupHealing() {this._skillset.healing++}
    levelupAlteration() {this._skillset.alteration++}
    levelupScience() {this._skillset.science++}
    levelupCreation() {this._skillset.creation++}
    levelupGathering() {this._skillset.gathering++}
    levelupSurvival() {this._skillset.survival++}
    }