class Strength {
  constructor(value) {
    this.value = value;
  }
}

class Agility {
  constructor(value) {
    this.value = value;
  }
}

class Vitality {
  constructor(value) {
    this.value = value;
  }
}

class Intelligence {
  constructor(value) {
    this.value = value;
  }
}

class Dexterity {
  constructor(value) {
    this.value = value;
  }
}

class Luck {
  constructor(value) {
    this.value = value;
  }
}

class Novice {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.className = "Novice";
    this.attributes = {
      str: new Strength(str),
      agi: new Agility(agi),
      vit: new Vitality(vit),
      int: new Intelligence(int),
      dex: new Dexterity(dex),
      luk: new Luck(luk),
    };
    this.skills = []; // Novice skills
  }
}

class Swordman {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.className = "Swordman";
    this.attributes = {
      str: new Strength(str),
      agi: new Agility(agi),
      vit: new Vitality(vit),
      int: new Intelligence(int),
      dex: new Dexterity(dex),
      luk: new Luck(luk),
    };
    this.skills = []; // Swordman skills
  }
}

class Mage {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.className = "Mage";
    this.attributes = {
      str: new Strength(str),
      agi: new Agility(agi),
      vit: new Vitality(vit),
      int: new Intelligence(int),
      dex: new Dexterity(dex),
      luk: new Luck(luk),
    };
    this.skills = []; // Mage skills
  }
}

class Archer {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.className = "Archer";
    this.attributes = {
      str: new Strength(str),
      agi: new Agility(agi),
      vit: new Vitality(vit),
      int: new Intelligence(int),
      dex: new Dexterity(dex),
      luk: new Luck(luk),
    };
    this.skills = []; // Archer skills
  }
}

class Merchant {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.className = "Merchant";
    this.attributes = {
      str: new Strength(str),
      agi: new Agility(agi),
      vit: new Vitality(vit),
      int: new Intelligence(int),
      dex: new Dexterity(dex),
      luk: new Luck(luk),
    };
    this.skills = []; // Merchant skills
  }
}

class Thief {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.className = "Thief";
    this.attributes = {
      str: new Strength(str),
      agi: new Agility(agi),
      vit: new Vitality(vit),
      int: new Intelligence(int),
      dex: new Dexterity(dex),
      luk: new Luck(luk),
    };
    this.skills = []; // Thief skills
  }
}

class Acolyte {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.className = "Acolyte";
    this.attributes = {
      str: new Strength(str),
      agi: new Agility(agi),
      vit: new Vitality(vit),
      int: new Intelligence(int),
      dex: new Dexterity(dex),
      luk: new Luck(luk),
    };
    this.skills = []; // Acolyte skills
  }
}

// Create instances of job classes
const novice = new Novice("Player", 1, 1, 1, 1, 1, 1);
const swordman = new Swordman("Player", 7, 2, 4, 0, 3, 2);
const mage = new Mage("Player", 2, 1, 3, 7, 2, 1);
const archer = new Archer("Player", 2, 7, 1, 1, 4, 2);
const merchant = new Merchant("Player", 3, 2, 6, 1, 1, 3);
const thief = new Thief("Player", 3, 6, 1, 1, 4, 3);
const acolyte = new Acolyte("Player", 2, 1, 3, 5, 2, 4);

console.log(novice);
console.log(swordman);
console.log(mage);
console.log(archer);
console.log(merchant);
console.log(thief);
console.log(acolyte);

export { Novice, Swordman, Mage, Archer, Merchant, Thief, Acolyte };
