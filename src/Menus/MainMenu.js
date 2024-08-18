import select, { Separator } from "@inquirer/select";
import { drawCharacterInfo } from "./Bars/CharacterBar.js ";
export async function MainMenu(character) {
  console.clear();
  await drawCharacterInfo(character);
  console.log(" ");
  const answer = await select({
    message: "Menu Princial",
    choices: [
      new Separator(" "),
      new Separator(" ╔" + "═".repeat(14) + "╗"),

      {
        name: "║ Combat       ║",
        value: 1,
        description: "Fight against monsters",
      },
      {
        name: "║ Stats        ║",
        value: 2,
        description: "View your stats",
      },
      {
        name: "║ Equipment    ║",
        value: 3,
        description: "View your equipment",
      },
      {
        name: "║ Inventory    ║",
        value: 4,
        description: "View your inventory",
      },
      {
        name: "║ Options      ║",
        value: 5,
        description: "View the options",
      },
      {
        name: "║ Save         ║",
        value: 6,
        description: "Save your progress",
      },
      {
        name: "║ Quit         ║",
        value: 7,
        description: "Quit the game",
      },
      new Separator(" ╚" + "═".repeat(14) + "╝"),
      new Separator(" "),
    ],
    pageSize: 15,
    loop: true,
  });
  return answer;
}
