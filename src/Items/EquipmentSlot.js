class EquipmentSlot {
  constructor(name, character, inventory) {
    this.name = name;
    this.equippedItem = null;
    this.character = character;
    this.inventory = inventory;
  }

  equip(item) {
    if (this.equippedItem !== null) {
      this.unequip();
    }

    this.equippedItem = item;
    this.character.attackPower += item.attackPower;
    this.character.defensePower += item.defensePower;
    console.log(`Equipped ${item.name} in ${this.name}`);
  }

  unequip() {
    if (this.equippedItem !== null) {
      this.character.attackPower -= this.equippedItem.attackPower;
      this.character.defensePower -= this.equippedItem.defensePower;
      this.inventory.addItem(this.equippedItem);
      console.log(`Unequipped ${this.equippedItem.name} from ${this.name}`);
      this.equippedItem = null;
    }
  }
  getInfo() {
    if (this.equippedItem !== null) {
      return `${this.name}: ${this.equippedItem.getInfo()}`;
    } else {
      return `${this.name}: Empty`;
    }
  }
}

export default EquipmentSlot;
