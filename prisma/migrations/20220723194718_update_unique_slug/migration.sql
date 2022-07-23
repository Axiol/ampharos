/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Link_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");
