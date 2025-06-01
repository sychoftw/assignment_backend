-- CreateTable
CREATE TABLE "t_Employee" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "Designation" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "Course" TEXT NOT NULL,
    "createdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "t_Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "t_Employee_username_key" ON "t_Employee"("username");
