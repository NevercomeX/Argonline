/*
  Warnings:

  - You are about to drop the column `Name` on the `Character` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
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
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("agi", "attackPower", "baseExp", "baseLevel", "defense", "dex", "health", "id", "int", "jobExp", "jobLevel", "jobclassId", "luk", "magicDefense", "magicPower", "mana", "maxBaseExp", "maxHealth", "maxJobExp", "maxMana", "skillPoints", "str", "userId", "vit") SELECT "agi", "attackPower", "baseExp", "baseLevel", "defense", "dex", "health", "id", "int", "jobExp", "jobLevel", "jobclassId", "luk", "magicDefense", "magicPower", "mana", "maxBaseExp", "maxHealth", "maxJobExp", "maxMana", "skillPoints", "str", "userId", "vit" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
