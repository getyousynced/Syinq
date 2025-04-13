/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Car` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FindRide` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OfferRide` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isPhoneNoVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNo` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Faculty');

-- DropForeignKey
ALTER TABLE "FindRide" DROP CONSTRAINT "FindRide_originAddressId_fkey";

-- DropForeignKey
ALTER TABLE "OfferRide" DROP CONSTRAINT "OfferRide_carId_fkey";

-- DropForeignKey
ALTER TABLE "OfferRide" DROP CONSTRAINT "OfferRide_destinationAddressId_fkey";

-- DropForeignKey
ALTER TABLE "OfferRide" DROP CONSTRAINT "OfferRide_originAddressId_fkey";

-- DropForeignKey
ALTER TABLE "_FindrideStops" DROP CONSTRAINT "_FindrideStops_A_fkey";

-- DropForeignKey
ALTER TABLE "_FindrideStops" DROP CONSTRAINT "_FindrideStops_B_fkey";

-- DropForeignKey
ALTER TABLE "_riders" DROP CONSTRAINT "_riders_A_fkey";

-- DropIndex
DROP INDEX "Address_userId_key";

-- DropIndex
DROP INDEX "User_id_key";

-- DropIndex
DROP INDEX "User_phoneNo_key";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
ALTER COLUMN "addressId" DROP DEFAULT,
ALTER COLUMN "addressId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId");
DROP SEQUENCE "Address_addressId_seq";

-- AlterTable
ALTER TABLE "Car" DROP CONSTRAINT "Car_pkey",
ALTER COLUMN "carId" DROP DEFAULT,
ALTER COLUMN "carId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Car_pkey" PRIMARY KEY ("carId");
DROP SEQUENCE "Car_carId_seq";

-- AlterTable
ALTER TABLE "FindRide" DROP CONSTRAINT "FindRide_pkey",
ALTER COLUMN "rideId" DROP DEFAULT,
ALTER COLUMN "rideId" SET DATA TYPE TEXT,
ALTER COLUMN "originAddressId" SET DATA TYPE TEXT,
ADD CONSTRAINT "FindRide_pkey" PRIMARY KEY ("rideId");
DROP SEQUENCE "FindRide_rideId_seq";

-- AlterTable
ALTER TABLE "OfferRide" DROP CONSTRAINT "OfferRide_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "originAddressId" SET DATA TYPE TEXT,
ALTER COLUMN "destinationAddressId" SET DATA TYPE TEXT,
ALTER COLUMN "carId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OfferRide_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OfferRide_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPhoneNoVerified",
DROP COLUMN "phoneNo",
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" BIGINT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "_FindrideStops" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_FindrideStops_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_FindrideStops_AB_unique";

-- AlterTable
ALTER TABLE "_riders" ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_riders_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_riders_AB_unique";

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

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
