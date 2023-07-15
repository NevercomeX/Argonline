/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "maxHealth" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "maxMana" INTEGER NOT NULL,
    "attackPower" INTEGER NOT NULL,
    "magicPower" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,
    "baseExpAmount" INTEGER NOT NULL,
    "jobExpAmount" INTEGER NOT NULL,
    "baseLevel" INTEGER NOT NULL,
    "jobLevel" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "maxHealth" INTEGER NOT NULL,
    "attackPower" INTEGER NOT NULL,
    "magicPower" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,
    "baseExpAmount" INTEGER NOT NULL,
    "jobExpAmount" INTEGER NOT NULL,
    "baseLevel" INTEGER NOT NULL,
    "monsterType" TEXT NOT NULL,
    "attackType" TEXT NOT NULL
);
