-- CreateTable
CREATE TABLE "ProductLine" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "link" VARCHAR(2000) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "userCreatedId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUpdatedId" INTEGER,
    "updatedAt" TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductLine" ADD FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLine" ADD FOREIGN KEY ("userCreatedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLine" ADD FOREIGN KEY ("userUpdatedId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
