/*
  Warnings:

  - You are about to drop the column `baseExpAmount` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `jobExpAmount` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Player` table. All the data in the column will be lost.
  - Added the required column `agi` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attackType` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseExp` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dex` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `int` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobExp` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luk` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxBaseExp` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxJobExp` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillPoints` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `str` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vit` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "str" INTEGER NOT NULL,
    "agi" INTEGER NOT NULL,
    "vit" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "luk" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "maxHealth" INTEGER NOT NULL,
    "maxMana" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "baseLevel" INTEGER NOT NULL,
    "jobLevel" INTEGER NOT NULL,
    "baseExp" INTEGER NOT NULL,
    "jobExp" INTEGER NOT NULL,
    "maxBaseExp" INTEGER NOT NULL,
    "maxJobExp" INTEGER NOT NULL,
    "skillPoints" INTEGER NOT NULL,
    "attackType" TEXT NOT NULL,
    "attackPower" INTEGER NOT NULL,
    "magicPower" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL
);
INSERT INTO "new_Player" ("attackPower", "baseLevel", "defense", "health", "id", "jobLevel", "magicDefense", "magicPower", "mana", "maxHealth", "maxMana", "name") SELECT "attackPower", "baseLevel", "defense", "health", "id", "jobLevel", "magicDefense", "magicPower", "mana", "maxHealth", "maxMana", "name" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
