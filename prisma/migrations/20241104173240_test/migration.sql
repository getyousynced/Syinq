/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Car" (
    "carId" SERIAL NOT NULL,
    "typeOfRide" TEXT NOT NULL,
    "carNumber" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "seatCapacity" INTEGER NOT NULL,
    "ownerId" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("carId")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "street1" TEXT NOT NULL,
    "street2" TEXT,
    "landmark" TEXT,
    "pincode" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "OfferRide" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "originAddressId" INTEGER NOT NULL,
    "destinationAddressId" INTEGER NOT NULL,
    "askForFair" BOOLEAN NOT NULL,
    "amount" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "OfferRide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindRide" (
    "rideId" SERIAL NOT NULL,
    "originAddressId" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "seat_capacity" INTEGER NOT NULL,
    "ask_for_fair" BOOLEAN NOT NULL,
    "amount_asked" INTEGER NOT NULL,

    CONSTRAINT "FindRide_pkey" PRIMARY KEY ("rideId")
);

-- CreateTable
CREATE TABLE "_FindrideStops" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_riders" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_carNumber_key" ON "Car"("carNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OfferRide_userId_key" ON "OfferRide"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_FindrideStops_AB_unique" ON "_FindrideStops"("A", "B");

-- CreateIndex
CREATE INDEX "_FindrideStops_B_index" ON "_FindrideStops"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_riders_AB_unique" ON "_riders"("A", "B");

-- CreateIndex
CREATE INDEX "_riders_B_index" ON "_riders"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferRide" ADD CONSTRAINT "OfferRide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferRide" ADD CONSTRAINT "OfferRide_originAddressId_fkey" FOREIGN KEY ("originAddressId") REFERENCES "Address"("addressId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferRide" ADD CONSTRAINT "OfferRide_destinationAddressId_fkey" FOREIGN KEY ("destinationAddressId") REFERENCES "Address"("addressId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferRide" ADD CONSTRAINT "OfferRide_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FindRide" ADD CONSTRAINT "FindRide_originAddressId_fkey" FOREIGN KEY ("originAddressId") REFERENCES "Address"("addressId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FindrideStops" ADD CONSTRAINT "_FindrideStops_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("addressId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FindrideStops" ADD CONSTRAINT "_FindrideStops_B_fkey" FOREIGN KEY ("B") REFERENCES "FindRide"("rideId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_riders" ADD CONSTRAINT "_riders_A_fkey" FOREIGN KEY ("A") REFERENCES "FindRide"("rideId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_riders" ADD CONSTRAINT "_riders_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
