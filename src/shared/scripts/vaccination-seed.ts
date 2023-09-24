const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.vaccination.createMany({
      data: [
        { label: "Гепатит В" },
        { label: "Туберкулез" },
        { label: "Дифтерия" },
        { label: "Столбняк" },
        { label: "Пневмококковая инфекция" },
        { label: "Гемофильная инфекция" },
        { label: "Полиомиелит" },
        { label: "Краснуха" },
        { label: "Корь" },
        { label: "Паротит" },
        { label: "Грипп" },
        { label: "Коронавирус" },
      ],
    });

    console.log("Successfully seeded the database categories");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();
