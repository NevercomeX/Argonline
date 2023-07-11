class Inventory {
  constructor() {
    this.items = []; // Aquí se almacenan todos los objetos del inventario
  }

  // Método para añadir un objeto al inventario
  addItem(itemName) {
    this.items.push(itemName);
    console.log(`Se ha añadido el objeto: ${itemName} al inventario.`);
  }

  // Método para remover un objeto del inventario
  removeItem(itemName) {
    const itemIndex = this.items.findIndex((item) => item.name === itemName);

    if (itemIndex > -1) {
      const item = this.items.splice(itemIndex, 1);
      console.log(`Se ha removido el objeto: ${item.name} del inventario.`);
      return item; // Retornar el objeto removido en caso de que se quiera hacer algo más con él
    } else {
      console.log(
        "El objeto que intentas remover no se encuentra en el inventario."
      );
      return null;
    }
  }

  // Método para consultar el inventario actual
  listItems() {
    if (this.items.length === 0) {
      console.log("El inventario está vacío.");
      return;
    }

    console.log("Inventario actual:");
    this.items.forEach((item) => console.log(item.name));
  }
}

export default Inventory;
