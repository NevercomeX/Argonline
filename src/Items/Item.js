class Item {
  constructor(name, statBonuses) {
    this.name = name;
    this.statBonuses = statBonuses;
  }

  getStatBonuses() {
    return this.statBonuses;
  }
  getName() {
    return this.name;
  }

  getInfo() {
    return `Item: ${this.name}`;
  }
}
