class EquipmentSlot {
  constructor(name, inventory) {
    this.name = name;
    this.equippedItem = null;
    this.inventory = inventory;
  }

  equip(itemName) {
    const item = this.inventory.removeItem(itemName);

    if (item) {
      if (this.equippedItem === null) {
        this.equippedItem = item;
        console.log(`Equipped ${item.name} in ${this.name}`);
      } else {
        console.log(
          `${this.name} is already occupied. Unequipping ${this.equippedItem.name}`
        );
        this.unequip();
        this.equippedItem = item;
        console.log(`Equipped ${item.name} in ${this.name}`);
      }
    }
  }

  unequip() {
    if (this.equippedItem !== null) {
      this.inventory.addItem(this.equippedItem);
      console.log(`Unequipped ${this.equippedItem.name} from ${this.name}`);
      this.equippedItem = null;
    } else {
      console.log(`${this.name} is already empty.`);
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
