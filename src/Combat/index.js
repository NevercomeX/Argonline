import select from "@inquirer/select";
// import createBattle from "./CreateBattle";
import readlineSync from "readline-sync";

export async function startGame(character, enemies) {
  console.log(character)
  console.log(enemies)

  readlineSync.question(
    "Estas listo?."
  );

  await startCombat(character, enemies);
}

class CombatStateMachine {
  constructor(character, enemies) {
    this.character = character;
    this.enemies = enemies;
    this.continueFighting = true;
    this.currentEnemy = null;
  }



  async start() {
    console.clear();

  
    await this.combatLoop();
  }


  selectEnemy() {
    if (!this.enemies || this.enemies.length === 0) {
      throw new Error("No enemies available.");
    }
    const randomIndex = Math.floor(Math.random() * this.enemies.length);
    return this.enemies[randomIndex];
  }

  async combatLoop() {
    while (this.continueFighting == true && this.character.health > 0) {
      readlineSync.question(
        "A wild"
      );
    
      this.currentEnemy = this.selectEnemy();
      console.log(`A wild ${this.currentEnemy.name} has appeared!`);
      const battle = createBattle(this.character, this.currentEnemy);
      battle.start();

      if (this.character.health > 0) {
        readlineSync.question(
          "askContinueFighting"
        );
      
        this.continueFighting = await this.askContinueFighting();
      } else {
        readlineSync.question(
          "sido derrot"
        );
        console.log(
          "Has sido derrotado. Regresas al menú principal para recuperarte."
        );
        this.continueFighting = false;
      }
    }

    if (this.character.health <= 0) {
      readlineSync.question(
        " Regresas al menú principal para recuperart"
      );
      console.log(
        "Has sido derrotado. Regresas al menú principal para recuperarte."
      );
    } else {
      console.log(this.continueFighting);
      console.log(this.character.health);
      readlineSync.question(
        "aRegresas al menú principal."
      );
      console.log("Regresas al menú principal.");
    }
  }


  async askContinueFighting() {
    const answer = await select({
      message: "Has derrotado al enemigo. ¿Deseas continuar luchando?",
      choices: [
        { name: "Si", value: "si" },
        { name: "No", value: "no" },
      ],
    });
    return answer === "si";
  }
}

async function startCombat(character, enemies) {
  const combatStateMachine = new CombatStateMachine(character, enemies);

  console.log(combatStateMachine)

  await combatStateMachine.start();
}
