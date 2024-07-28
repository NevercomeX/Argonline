import select, { Separator } from "@inquirer/select";

export async function CombatMenu() {
  console.log(" ");
  const answer = await select({
    message: "Combat Menu",
    choices: [
      new Separator(" "),
      new Separator(" ╔" + "═".repeat(14) + "╗"),

      {
        name: "║ Attack       ║",
        value: 1,
        description: "Fight against monsters",
      },
      {
        name: "║ Defence        ║",
        value: 2,
        description: "View your stats",
      },
      {
        name: "║ Items    ║",
        value: 3,
        description: "View your equipment",
      },
      {
        name: "║ RunAway    ║",
        value: 4,
        description: "View your inventory",
      },

      new Separator(" ╚" + "═".repeat(14) + "╝"),
      new Separator(" "),
    ],
    pageSize: 15,
  });
  return answer;
}
