class Battle {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
  }

  start() {
    while (this.player.health > 0 && this.enemy.health > 0) {
      this.player.attack(this.enemy);
      if (this.enemy.health > 0) {
        this.enemy.attack(this.player);
      }
    }

    if (this.player.health > 0) {
      console.log("Player wins!");
    } else {
      console.log("Enemy wins!");
    }
  }
}

class Character {
  constructor(name, health, attackPower) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
  }
}
