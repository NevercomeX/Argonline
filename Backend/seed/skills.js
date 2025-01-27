export async function skillSeed(prisma) {
  const skills = [
    // Novice (JobClassId: 1)
    { name: "Basic Attack", jobclassId: 1, description: "A simple melee attack." },
    { name: "Novice Heal", jobclassId: 1, description: "Restore a small amount of health." },
    { name: "First Aid", jobclassId: 1, description: "Heal yourself for a small amount." },
    { name: "Guard", jobclassId: 1, description: "Increase your defense temporarily." },
    { name: "Flee", jobclassId: 1, description: "Increase your agility to escape from battle." },

    // Swordsman (JobClassId: 2)
    { name: "Bash", jobclassId: 2, description: "A powerful melee attack that stuns the enemy." },
    { name: "Provoke", jobclassId: 2, description: "Taunt an enemy to attack you." },
    { name: "Endure", jobclassId: 2, description: "Temporarily increase your resistance to damage." },
    { name: "Magnum Break", jobclassId: 2, description: "A fiery attack that damages all nearby enemies." },
    { name: "Sword Mastery", jobclassId: 2, description: "Increase your proficiency with swords." },

    // Archer (JobClassId: 3)
    { name: "Double Strafe", jobclassId: 3, description: "Shoot two arrows at once." },
    { name: "Arrow Shower", jobclassId: 3, description: "Shoot multiple arrows in a wide area." },
    { name: "Owl's Eye", jobclassId: 3, description: "Increase your accuracy and range." },
    { name: "Vulture's Eye", jobclassId: 3, description: "Increase your critical hit rate." },
    { name: "Focus", jobclassId: 3, description: "Increase your concentration for better aim." },

    // Mage (JobClassId: 4)
    { name: "Fire Bolt", jobclassId: 4, description: "Launch a fire bolt at the enemy." },
    { name: "Cold Bolt", jobclassId: 4, description: "Launch a cold bolt at the enemy." },
    { name: "Lightning Bolt", jobclassId: 4, description: "Launch a lightning bolt at the enemy." },
    { name: "Energy Coat", jobclassId: 4, description: "Surround yourself with protective energy." },
    { name: "Fire Wall", jobclassId: 4, description: "Create a wall of fire to block enemies." },

    // Merchant (JobClassId: 5)
    { name: "Discount", jobclassId: 5, description: "Reduce the price of items when buying." },
    { name: "Overcharge", jobclassId: 5, description: "Increase the price of items when selling." },
    { name: "Pushcart", jobclassId: 5, description: "Increase your carrying capacity." },
    { name: "Cart Revolution", jobclassId: 5, description: "Use your cart to attack enemies." },
    { name: "Vending", jobclassId: 5, description: "Sell items directly to other players." },

    // Thief (JobClassId: 6)
    { name: "Steal", jobclassId: 6, description: "Attempt to steal an item from the enemy." },
    { name: "Hiding", jobclassId: 6, description: "Hide from enemies, becoming invisible." },
    { name: "Envenom", jobclassId: 6, description: "Poison your weapon to deal extra damage." },
    { name: "Detoxify", jobclassId: 6, description: "Remove poison from yourself or an ally." },
    { name: "Double Attack", jobclassId: 6, description: "Strike the enemy twice in quick succession." },

    // Acolyte (JobClassId: 7)
    { name: "Heal", jobclassId: 7, description: "Restore a moderate amount of health." },
    { name: "Blessing", jobclassId: 7, description: "Increase the stats of an ally." },
    { name: "Increase AGI", jobclassId: 7, description: "Increase the agility of an ally." },
    { name: "Decrease AGI", jobclassId: 7, description: "Reduce the agility of an enemy." },
    { name: "Ruwach", jobclassId: 7, description: "Reveal hidden enemies." },

    // Super Novice (JobClassId: 8)
    { name: "Super Heal", jobclassId: 8, description: "Restore a large amount of health." },
    { name: "Super Bash", jobclassId: 8, description: "A powerful melee attack with extra damage." },
    { name: "Super Provoke", jobclassId: 8, description: "Taunt all enemies in range." },
    { name: "Super Endure", jobclassId: 8, description: "Become immune to damage for a short time." },
    { name: "Super Flee", jobclassId: 8, description: "Dodge all attacks for a short time." },

    // Hunter (JobClassId: 9)
    { name: "Falcon Assault", jobclassId: 9, description: "Command your falcon to attack the enemy." },
    { name: "Blitz Beat", jobclassId: 9, description: "A rapid attack with your falcon." },
    { name: "Claymore Trap", jobclassId: 9, description: "Set a trap that explodes when triggered." },
    { name: "Freezing Trap", jobclassId: 9, description: "Set a trap that freezes enemies." },
    { name: "Detect", jobclassId: 9, description: "Reveal hidden enemies and traps." },

    // Ninja (JobClassId: 11)
    { name: "Throw Shuriken", jobclassId: 11, description: "Throw a shuriken at the enemy." },
    { name: "Shadow Jump", jobclassId: 11, description: "Teleport behind the enemy." },
    { name: "Venom Dust", jobclassId: 11, description: "Spread poison in an area." },
    { name: "Shadow Slash", jobclassId: 11, description: "A powerful melee attack from the shadows." },
    { name: "Illusion Dodge", jobclassId: 11, description: "Create illusions to dodge attacks." },

    // Alchemist (JobClassId: 12)
    { name: "Potion Pitcher", jobclassId: 12, description: "Throw a potion to heal an ally." },
    { name: "Homunculus", jobclassId: 12, description: "Summon a homunculus to aid you in battle." },
    { name: "Acid Terror", jobclassId: 12, description: "Throw acid to damage and reduce defense." },
    { name: "Demonstration", jobclassId: 12, description: "Create a powerful explosion." },
    { name: "Summon Flora", jobclassId: 12, description: "Summon a plant to fight for you." },

    // Assassin (JobClassId: 13)
    { name: "Sonic Blow", jobclassId: 13, description: "A fast and powerful melee attack." },
    { name: "Grimtooth", jobclassId: 13, description: "A deadly attack from the shadows." },
    { name: "Venom Knife", jobclassId: 13, description: "Throw a poisoned knife at the enemy." },
    { name: "Cloaking", jobclassId: 13, description: "Become invisible to enemies." },
    { name: "Enchant Deadly Poison", jobclassId: 13, description: "Enchant your weapon with deadly poison." },

    // Bard (JobClassId: 14)
    { name: "Lullaby", jobclassId: 14, description: "Put enemies to sleep with a soothing melody." },
    { name: "Arrow Vulcan", jobclassId: 14, description: "Shoot a barrage of arrows at the enemy." },
    { name: "Song of Lutie", jobclassId: 14, description: "Increase the stats of your party." },
    { name: "Dissonance", jobclassId: 14, description: "Disrupt enemy skills with a discordant melody." },
    { name: "Melody of Life", jobclassId: 14, description: "Heal your party over time." },

    // Blacksmith (JobClassId: 15)
    { name: "Weaponry Research", jobclassId: 15, description: "Increase your weapon proficiency." },
    { name: "Hammer Fall", jobclassId: 15, description: "A powerful hammer strike that knocks back enemies." },
    { name: "Adrenaline Rush", jobclassId: 15, description: "Increase your attack speed temporarily." },
    { name: "Power Thrust", jobclassId: 15, description: "A powerful thrust attack with your weapon." },
    { name: "Skin Tempering", jobclassId: 15, description: "Increase your defense temporarily." },

    // Crusader (JobClassId: 16)
    { name: "Grand Cross", jobclassId: 16, description: "A holy attack that damages all enemies in range." },
    { name: "Shield Charge", jobclassId: 16, description: "Charge at the enemy with your shield." },
    { name: "Holy Cross", jobclassId: 16, description: "A holy attack that damages undead enemies." },
    { name: "Shield Boomerang", jobclassId: 16, description: "Throw your shield to damage enemies." },
    { name: "Reflect Shield", jobclassId: 16, description: "Reflect damage back to the attacker." },

    // Dancer (JobClassId: 17)
    { name: "Dance of the Moon", jobclassId: 17, description: "A dance that increases your agility." },
    { name: "Dance of the Sun", jobclassId: 17, description: "A dance that increases your strength." },
    { name: "Dance of the Stars", jobclassId: 17, description: "A dance that increases your luck." },
    { name: "Dance of the Wind", jobclassId: 17, description: "A dance that increases your evasion." },
    { name: "Dance of the Earth", jobclassId: 17, description: "A dance that increases your defense." },

    // Gunslinger (JobClassId: 18)
    { name: "Rapid Shower", jobclassId: 18, description: "Fire a rapid barrage of bullets." },
    { name: "Desperado", jobclassId: 18, description: "A powerful gun attack that hits all enemies in range." },
    { name: "Tracking", jobclassId: 18, description: "Increase your accuracy and critical hit rate." },
    { name: "Dust", jobclassId: 18, description: "Blind enemies with a cloud of dust." },
    { name: "Full Buster", jobclassId: 18, description: "Fire a powerful blast that damages all enemies in front of you." },

    // Knight (JobClassId: 19)
    { name: "Bowling Bash", jobclassId: 19, description: "A powerful charge attack that knocks back enemies." },
    { name: "Spear Boomerang", jobclassId: 19, description: "Throw a spear that returns to you." },
    { name: "Pierce", jobclassId: 19, description: "A thrust attack that pierces through enemies." },
    { name: "Brandish Spear", jobclassId: 19, description: "A powerful spear attack that damages multiple enemies." },
    { name: "Cavalry Mastery", jobclassId: 19, description: "Increase your proficiency with mounted combat." },

    // Monk (JobClassId: 20)
    { name: "Asura Strike", jobclassId: 20, description: "A powerful strike that consumes all your spirit." },
    { name: "Fury", jobclassId: 20, description: "Increase your attack speed and power." },
    { name: "Iron Fist", jobclassId: 20, description: "Increase your melee damage." },
    { name: "Zen", jobclassId: 20, description: "Enter a state of focus to increase your stats." },
    { name: "Triple Attack", jobclassId: 20, description: "Strike the enemy three times in quick succession." },

    // Priest (JobClassId: 21)
    { name: "Sanctuary", jobclassId: 21, description: "Create a zone that heals allies over time." },
    { name: "Magnus Exorcismus", jobclassId: 21, description: "A holy attack that damages undead enemies." },
    { name: "Resurrection", jobclassId: 21, description: "Revive a fallen ally." },
    { name: "Gloria", jobclassId: 21, description: "Increase the luck of your party." },
    { name: "Lex Aeterna", jobclassId: 21, description: "Mark an enemy for divine punishment." },

    // Rogue (JobClassId: 22)
    { name: "Backstab", jobclassId: 22, description: "A powerful attack from behind." },
    { name: "Strip Weapon", jobclassId: 22, description: "Disarm the enemy, removing their weapon." },
    { name: "Divest Armor", jobclassId: 22, description: "Remove the enemy's armor." },
    { name: "Snatcher", jobclassId: 22, description: "Steal an item from the enemy." },
    { name: "Mug", jobclassId: 22, description: "Steal an item while attacking the enemy." },

    // Sage (JobClassId: 23)
    { name: "Earth Spike", jobclassId: 23, description: "Summon spikes from the ground to damage enemies." },
    { name: "Magic Rod", jobclassId: 23, description: "Summon a magic rod to attack the enemy." },
    { name: "Free Cast", jobclassId: 23, description: "Cast spells without consuming mana." },
    { name: "Spell Breaker", jobclassId: 23, description: "Dispel magical effects on the enemy." },
    { name: "Dispell", jobclassId: 23, description: "Remove buffs from the enemy." },

    // Wizard (JobClassId: 24)
    { name: "Meteor Storm", jobclassId: 24, description: "Summon a storm of meteors to damage enemies." },
    { name: "Storm Gust", jobclassId: 24, description: "Summon a freezing storm to damage and slow enemies." },
    { name: "Fire Pillar", jobclassId: 24, description: "Create a pillar of fire to damage enemies." },
    { name: "Jupiter Thunder", jobclassId: 24, description: "Summon a powerful lightning bolt." },
    { name: "Energy Drain", jobclassId: 24, description: "Drain mana from the enemy." },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
}
