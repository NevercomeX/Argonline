-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Player',
    "userId" INTEGER NOT NULL,
    "jobclassId" INTEGER NOT NULL,
    "str" INTEGER NOT NULL,
    "agi" INTEGER NOT NULL,
    "vit" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "luk" INTEGER NOT NULL,
    "baseLevel" INTEGER NOT NULL,
    "jobLevel" INTEGER NOT NULL,
    "baseExp" INTEGER NOT NULL,
    "jobExp" INTEGER NOT NULL,
    "maxBaseExp" INTEGER NOT NULL,
    "maxJobExp" INTEGER NOT NULL,
    "skillPoints" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "maxHealth" INTEGER NOT NULL,
    "maxMana" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "attackPower" INTEGER NOT NULL,
    "magicPower" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,
    "totalAttackPower" INTEGER NOT NULL DEFAULT 0,
    "totalMagicPower" INTEGER NOT NULL DEFAULT 0,
    "totalDefense" INTEGER NOT NULL DEFAULT 0,
    "totalMagicDefense" INTEGER NOT NULL DEFAULT 0,
    "totalHealth" INTEGER NOT NULL DEFAULT 0,
    "totalMana" INTEGER NOT NULL DEFAULT 0,
    "totalStr" INTEGER NOT NULL DEFAULT 0,
    "totalAgi" INTEGER NOT NULL DEFAULT 0,
    "totalVit" INTEGER NOT NULL DEFAULT 0,
    "totalInt" INTEGER NOT NULL DEFAULT 0,
    "totalDex" INTEGER NOT NULL DEFAULT 0,
    "totalLuk" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "Inventory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterId" INTEGER NOT NULL,
    "upperHeadSlot" INTEGER,
    "midHeadSlot" INTEGER,
    "lowerHeadSlot" INTEGER,
    "bodySlot" INTEGER,
    "rightHandSlot" INTEGER,
    "leftHandSlot" INTEGER,
    "robeSlot" INTEGER,
    "shoesSlot" INTEGER,
    "accessorySlot01" INTEGER,
    "accessorySlot02" INTEGER,
    "ammoSlot" INTEGER,
    CONSTRAINT "Equipment_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "attackType" TEXT NOT NULL,
    "giveBaseExpAmount" INTEGER NOT NULL,
    "giveJobExpAmount" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "maxHealth" INTEGER NOT NULL,
    "attackPower" INTEGER NOT NULL,
    "magicPower" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,
    "baseLevel" INTEGER NOT NULL,
    "monsterType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EnemyDrop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enemyId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "dropChance" REAL NOT NULL,
    CONSTRAINT "EnemyDrop_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EnemyDrop_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemType" TEXT NOT NULL DEFAULT 'None',
    "itemSubType" TEXT NOT NULL DEFAULT 'None',
    "equipmentSlot" TEXT NOT NULL DEFAULT 'None',
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "attackPower" INTEGER NOT NULL,
    "magicPower" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "str" INTEGER NOT NULL,
    "agi" INTEGER NOT NULL,
    "vit" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "luk" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,
    "weaponType" TEXT NOT NULL,
    "usable" BOOLEAN NOT NULL,
    "rarity" TEXT NOT NULL,
    "effect" TEXT,
    "equipable" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "JobClass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "str" INTEGER NOT NULL,
    "agi" INTEGER NOT NULL,
    "vit" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "luk" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "maxHealth" INTEGER NOT NULL,
    "maxMana" INTEGER NOT NULL,
    "attackPower" INTEGER NOT NULL,
    "magicPower" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,
    "baseLevel" INTEGER NOT NULL,
    "jobLevel" INTEGER NOT NULL,
    "baseExp" INTEGER NOT NULL,
    "jobExp" INTEGER NOT NULL,
    "maxBaseExp" INTEGER NOT NULL,
    "maxJobExp" INTEGER NOT NULL,
    "skillPoints" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Enemy_name_key" ON "Enemy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EnemyDrop_enemyId_itemId_key" ON "EnemyDrop"("enemyId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobClass_name_key" ON "JobClass"("name");
