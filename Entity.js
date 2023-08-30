class Entity
{
    constructor(name, species, diet, baseHP, endurance, strength, perception)
    {
        this._name = name;
        this._species = species;
        this._diet = diet;
        this._baseHP = baseHP;
        this._endurance = endurance;
        this._strength = strength;
        this._perception = perception;
    }
}

export class NPC extends Entity
{
    constructor(name, species, diet, baseHP, endurance, strength, perception,
                disposition, faction)
    {
        super(name, species, diet, baseHP, endurance, strength, perception);
        this.disposition = disposition;
        this.faction = faction;
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
                spirituality, dexterity, intelligence, discipline, personality)
    {
        super(name, species, diet, baseHP, endurance, strength, perception);
        this.dexterity = dexterity;
        this.spirituality = spirituality;
        this.intelligence = intelligence;
        this.discipline = discipline;
        this.personality = personality

        this.skillset =
        {
            healing: spirituality * 5,
            alteration: spirituality * 3 + perception * 2,
            science: intelligence * 5,
            creation: dexterity * 2 + creativity * 3
        }
        
    }
}