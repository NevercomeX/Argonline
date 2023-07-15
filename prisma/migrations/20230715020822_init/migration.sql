/*
  Warnings:

  - You are about to drop the column `monsterType` on the `Enemy` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enemy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "maxHealth" INTEGER NOT NULL,
    "baseLevel" INTEGER NOT NULL,
    "baseExpAmount" INTEGER NOT NULL,
    "jobExpAmount" INTEGER NOT NULL,
    "attackType" TEXT NOT NULL,
    "attackPower" INTEGER NOT NULL,
    "magicPower" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL
);
INSERT INTO "new_Enemy" ("attackPower", "attackType", "baseExpAmount", "baseLevel", "defense", "health", "id", "jobExpAmount", "magicDefense", "magicPower", "maxHealth", "name") SELECT "attackPower", "attackType", "baseExpAmount", "baseLevel", "defense", "health", "id", "jobExpAmount", "magicDefense", "magicPower", "maxHealth", "name" FROM "Enemy";
DROP TABLE "Enemy";
ALTER TABLE "new_Enemy" RENAME TO "Enemy";
CREATE UNIQUE INDEX "Enemy_name_key" ON "Enemy"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
