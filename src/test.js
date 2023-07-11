// Tests that the options menu displays the correct options
it("test_options_menu_display", () => {
  const game = new Game();
  const options = game.showOptionsMenu();
  expect(options).toContain("1. Cambiar idioma");
  expect(options).toContain("2. Cambiar dificultad");
  expect(options).toContain("3. Volver al menu principal");
});

// Tests that the experience bars are properly displayed
it("test_experience_bars_displayed", () => {
  const character = {
    exp: 50,
    maxExp: 100,
    jobExp: 25,
    maxJobExp: 50,
    health: 75,
    maxHealth: 100,
    mana: 50,
    maxMana: 100,
  };
  const game = new Game(character, []);
  const spy1 = jest.spyOn(console, "log").mockImplementation();
  const spy2 = jest.spyOn(console, "clear").mockImplementation();
  game.showExperienceBar();
  expect(spy1).toHaveBeenCalledWith("Base Exp: [==========          ] 50/100");
  expect(spy1).toHaveBeenCalledWith("Job Exp:  [=======             ] 25/50");
  spy1.mockRestore();
  spy2.mockRestore();
});

// Tests that the character and inventory are properly initialized
it("test_character_and_inventory_initialization", () => {
  const character = {
    exp: 0,
    maxExp: 100,
    jobExp: 0,
    maxJobExp: 50,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
  };
  const inventory = { items: [] };
  const game = new Game(character, inventory);
  expect(game.character).toEqual(character);
  expect(game.inventory).toEqual(inventory);
});

// Tests that the health and mana bars are properly displayed
it("test_health_and_mana_bars_displayed_properly", () => {
  const character = {
    exp: 50,
    maxExp: 100,
    jobExp: 25,
    maxJobExp: 50,
    health: 75,
    maxHealth: 100,
    mana: 25,
    maxMana: 50,
  };
  const game = new Game(character, []);
  const consoleSpy = jest.spyOn(console, "log");
  game.showHealthBar();
  game.showManaBar();
  expect(consoleSpy).toHaveBeenCalledWith("HP:  [====================] 75/100");
  expect(consoleSpy).toHaveBeenCalledWith(
    "Mana:  [========              ] 25/50"
  );
  consoleSpy.mockRestore();
});

// Tests that the main bars are displayed properly when showMainMenu() is called
it("test_main_bars_displayed_properly", () => {
  const character = {
    exp: 50,
    maxExp: 100,
    jobExp: 25,
    maxJobExp: 50,
    health: 75,
    maxHealth: 100,
    mana: 50,
    maxMana: 75,
  };
  const inventory = {
    items: [],
  };
  const game = new Game(character, inventory);
  const spyHealthBar = jest.spyOn(game, "showHealthBar");
  const spyExperienceBar = jest.spyOn(game, "showExperienceBar");
  const spyConsoleLog = jest.spyOn(console, "log").mockImplementation();

  game.showMainMenu();

  expect(spyHealthBar).toHaveBeenCalledTimes(1);
  expect(spyExperienceBar).toHaveBeenCalledTimes(1);
  expect(spyConsoleLog).toHaveBeenCalledWith(
    "\nHP:  [====================] 75/100"
  );
  expect(spyConsoleLog).toHaveBeenCalledWith(
    "\nMana:  [==================  ] 50/75"
  );
  expect(spyConsoleLog).toHaveBeenCalledWith(
    "\nBase Exp: [==========          ] 50/100"
  );
  expect(spyConsoleLog).toHaveBeenCalledWith(
    "\nJob Exp:  [=======             ] 25/50"
  );

  spyHealthBar.mockRestore();
  spyExperienceBar.mockRestore();
  spyConsoleLog.mockRestore();
});

// Tests that the showEquipmentMenu method displays a message when there is no equipment in the character's inventory
it("test_show_equipment_no_equipment", () => {
  const character = {
    equipment: {},
  };
  const inventory = {
    items: [],
  };
  const game = new Game(character, inventory);
  const consoleSpy = jest.spyOn(console, "log");

  game.showEquipmentMenu();

  expect(consoleSpy).toHaveBeenCalledWith("No tienes equipamiento.");
});

// Tests that the showStatsMenu function displays negative stats correctly
it("test_show_stats_with_negative_stats", () => {
  const character = new Character("Test", -10, 0, 0, 0, 0, 0);
  const game = new Game(character, new Inventory());
  const consoleSpy = jest.spyOn(console, "log");
  game.showStatsMenu();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Name: Test\nLevel: -10\nBase Exp: 0/100\nJob Exp: 0/100\nHP: 0/100\nMana: 0/100\n"
  );
  consoleSpy.mockRestore();
});

// Tests that the inventory is shown correctly when there are no items
it("test_show_inventory_no_items", () => {
  const inventory = new Inventory();
  const character = new Character("Test", 1, 1, 1, 1, 1, inventory);
  const game = new Game(character, inventory);
  const spy = jest.spyOn(console, "log");
  game.showInventory();
  expect(spy).toHaveBeenCalledWith("El inventario está vacío.");
  spy.mockRestore();
});

// Tests that selecting an invalid menu option prints an error message
it("test_invalid_menu_option", () => {
  const game = new Game();
  const consoleSpy = jest.spyOn(console, "log");
  const readlineSpy = jest
    .spyOn(readlineSync, "question")
    .mockReturnValueOnce("6");
  game.showMainMenu();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Opcion inválida, por favor intenta de nuevo."
  );
  consoleSpy.mockRestore();
  readlineSpy.mockRestore();
});

// Tests that the game quits when the user selects option 5
it("test_quit_game", () => {
  const game = new Game();
  const spy = jest.spyOn(console, "log");
  const quitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
  const option = "5";
  jest.spyOn(readlineSync, "question").mockReturnValueOnce(option);
  game.run();
  expect(spy).toHaveBeenCalledWith("Hasta pronto!");
  expect(quitSpy).toHaveBeenCalled();
  spy.mockRestore();
  quitSpy.mockRestore();
});

// Tests that the showStatsMenu and showEquipmentMenu methods display the correct information
it("test_show_stats_and_equipment_menus", () => {
  const character = {
    exp: 0,
    maxExp: 100,
    jobExp: 0,
    maxJobExp: 50,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    showStats: jest.fn(),
    showEquipment: jest.fn(),
  };
  const inventory = {
    listItems: jest.fn(),
  };
  const game = new Game(character, inventory);
  const spyStats = jest.spyOn(game.character, "showStats");
  const spyEquipment = jest.spyOn(game.character, "showEquipment");
  game.showStatsMenu();
  expect(spyStats).toHaveBeenCalled();
  game.showEquipmentMenu();
  expect(spyEquipment).toHaveBeenCalled();
});

// Tests that the inventory and options menus are displayed correctly
it("test_show_inventory_and_options_menus", () => {
  const character = {
    exp: 0,
    maxExp: 100,
    jobExp: 0,
    maxJobExp: 100,
    health: 50,
    maxHealth: 100,
    mana: 50,
    maxMana: 100,
    showStats: jest.fn(),
    showEquipment: jest.fn(),
  };
  const inventory = {
    listItems: jest.fn(),
  };
  const game = new Game(character, inventory);
  const consoleSpy = jest.spyOn(console, "log");
  const readlineSpy = jest.spyOn(readlineSync, "question");

  game.showInventory();
  expect(consoleSpy).toHaveBeenCalledWith("\n--- INVENTARIO ---");
  expect(inventory.listItems).toHaveBeenCalled();
  expect(readlineSpy).toHaveBeenCalledWith(
    "Presiona cualquier tecla para volver al menu principal."
  );

  game.showOptionsMenu();
  expect(consoleSpy).toHaveBeenCalledWith("\n--- OPCIONES ---");
  expect(readlineSpy).toHaveBeenCalledWith(
    "Presiona cualquier tecla para volver al menu principal."
  );

  consoleSpy.mockRestore();
  readlineSpy.mockRestore();
});

// Tests that the game menu options work as expected
it("test_game_menu_options", () => {
  const character = {
    exp: 0,
    maxExp: 100,
    jobExp: 0,
    maxJobExp: 50,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    showStats: jest.fn(),
    showEquipment: jest.fn(),
  };
  const inventory = {
    listItems: jest.fn(),
  };
  const game = new Game(character, inventory);
  const consoleSpy = jest.spyOn(console, "log");
  const readlineSpy = jest.spyOn(readlineSync, "question");
  readlineSpy.mockReturnValueOnce("1").mockReturnValueOnce("");
  game.showStatsMenu();
  expect(character.showStats).toHaveBeenCalled();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Presiona cualquier tecla para volver al menu principal."
  );
  readlineSpy.mockReturnValueOnce("2").mockReturnValueOnce("");
  game.showEquipmentMenu();
  expect(character.showEquipment).toHaveBeenCalled();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Presiona cualquier tecla para volver al menu principal."
  );
  readlineSpy.mockReturnValueOnce("3").mockReturnValueOnce("");
  game.showInventory();
  expect(inventory.listItems).toHaveBeenCalled();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Presiona cualquier tecla para volver al menu principal."
  );
  readlineSpy.mockReturnValueOnce("4").mockReturnValueOnce("");
  game.showOptionsMenu();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Presiona cualquier tecla para volver al menu principal."
  );
  readlineSpy.mockReturnValueOnce("5");
  game.showMainMenu();
  expect(consoleSpy).toHaveBeenCalledWith("Hasta pronto!");
  expect(readlineSync.question).toHaveBeenCalledTimes(5);
  consoleSpy.mockRestore();
  readlineSpy.mockRestore();
});
