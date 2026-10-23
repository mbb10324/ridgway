-- CreateTable
CREATE TABLE "samples" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "samples_pkey" PRIMARY KEY ("id")
);
