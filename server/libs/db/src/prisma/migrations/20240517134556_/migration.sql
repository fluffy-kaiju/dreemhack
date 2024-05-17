-- CreateTable
CREATE TABLE "_IPToSubdomain" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IPToSubdomain_AB_unique" ON "_IPToSubdomain"("A", "B");

-- CreateIndex
CREATE INDEX "_IPToSubdomain_B_index" ON "_IPToSubdomain"("B");

-- AddForeignKey
ALTER TABLE "_IPToSubdomain" ADD CONSTRAINT "_IPToSubdomain_A_fkey" FOREIGN KEY ("A") REFERENCES "IP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IPToSubdomain" ADD CONSTRAINT "_IPToSubdomain_B_fkey" FOREIGN KEY ("B") REFERENCES "Subdomain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
