/*
  Warnings:

  - You are about to drop the column `itemId` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `itemTemplateId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterId" INTEGER NOT NULL,
    "itemTemplateId" INTEGER NOT NULL,
    "itemInstanceId" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Inventory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_itemTemplateId_fkey" FOREIGN KEY ("itemTemplateId") REFERENCES "ItemTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_itemInstanceId_fkey" FOREIGN KEY ("itemInstanceId") REFERENCES "ItemInstance" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("characterId", "id", "itemInstanceId", "quantity") SELECT "characterId", "id", "itemInstanceId", "quantity" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
