-- AlterTable
ALTER TABLE "Preferences" ADD COLUMN     "defaultSource" TEXT NOT NULL DEFAULT 'server',
ALTER COLUMN "defaultProvider" SET DEFAULT 'ShuttleAi';
