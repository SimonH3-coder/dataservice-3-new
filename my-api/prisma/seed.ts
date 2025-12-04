import bcrypt from "bcrypt";
import { prisma } from "../src/prisma";

// Asynkron main-funktion som kører vores seed-data
const main = async () => {
  // Sletter eksisterende data i bruger tabellen
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.fueltype.deleteMany();
  await prisma.car.deleteMany();

  // Opretter en testbruger i databasen
  const user = await prisma.user.create({
    data: {
      firstname: "Test",
      lastname: "Bruger",
      email: "test@example.com", // login-email
      password: await bcrypt.hash("password", 10), // Password hash
      role: "USER", //Bruger rolle
      isActive: true, // Bruger er aktiv og må logge ind
    },
  });

  // Opretter en testbruger i databasen
  const admin = await prisma.user.create({
    data: {
      firstname: "Test",
      lastname: "Bruger",
      email: "admin@example.com", // login-email
      password: await bcrypt.hash("password", 10), // Password hash
      role: "ADMIN", //Bruger rolle
      isActive: true, // Bruger er aktiv og må logge ind
    },
  });

  //Oprette kategorier i databasen
  const categories = await prisma.category.createMany({
    data: [{ name: "Personbil" }, { name: "Varebil" }, { name: "Lastbil" }, { name: "Motorcykel" }, { name: "Bus" }, { name: "Autocamper" }],
  });

  // Opretter mange brands i databasen
  const brands = await prisma.brand.createMany({
    data: [{ name: "Toyota" }, { name: "Ford" }, { name: "BMW" }, { name: "Tesla" }, { name: "Volvo" }],
  });

  //Opretter mange drivmidler i databasen
  const fueltypes = await prisma.fueltype.createMany({
    data: [{ name: "Benzin" }, { name: "Diesel" }, { name: "Hybrid" }, { name: "Electricity" }, { name: "Coffee" }],
  });

  // Opretter minimum 10 biler i databasen
  const cars = await prisma.car.createMany({
    data: [
      {
        model: "Model S",
        created: new Date("2020-01-15"),
        categoryId: 1,
        brandId: 4,
        fueltypeId: 4,
        year: 2020,
        price: 293924.99,
      },
      { model: "Mustang", created: new Date("2019-05-15"), categoryId: 1, brandId: 2, fueltypeId: 1, year: 2019, price: 55999.99 },
      { model: "X5", created: new Date("2018-03-20"), categoryId: 1, brandId: 3, fueltypeId: 2, year: 2018, price: 61999.99 },
      { model: "Camry", created: new Date("2021-07-30"), categoryId: 1, brandId: 1, fueltypeId: 3, year: 2021, price: 24999.99 },
      { model: "XC90", created: new Date("2017-11-11"), categoryId: 1, brandId: 5, fueltypeId: 2, year: 2017, price: 69999.99 },
      { model: "F-150", created: new Date("2020-09-09"), categoryId: 2, brandId: 2, fueltypeId: 1, year: 2020, price: 39999.99 },
      { model: "i8", created: new Date("2019-12-12"), categoryId: 1, brandId: 3, fueltypeId: 3, year: 2019, price: 147500.0 },
      { model: "RAV4", created: new Date("2021-04-04"), categoryId: 1, brandId: 1, fueltypeId: 3, year: 2021, price: 26999.99 },
      { model: "S60", created: new Date("2018-08-08"), categoryId: 1, brandId: 5, fueltypeId: 2, year: 2018, price: 35999.99 },
      { model: "Cybertruck", created: new Date("2022-02-02"), categoryId: 2, brandId: 4, fueltypeId: 4, year: 2022, price: 39999.99 },
    ],
  });

  // Udskriver i terminalen at brugeren er oprettet
  console.log("Seed completed for users:", user);

  // Udskriver i terminalen at kategorier er oprettet
  console.log("Seed completed for categories:", categories);

  // Udskriver i terminalen at brands er oprettet
  console.log("Seed completed for brands:", brands);

  // Udskriver i terminalen at drivemidler  er oprettet
  console.log("Seed completed for fueltypes:", fueltypes);

  // Udskriver i terminalen at biler er oprettet
  console.log("Seed completed for cars:", cars);
};

// Kører main-funktionen
main()
  .then(() => prisma.$disconnect()) //Lukker db forbindelsen når alt er ok
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
