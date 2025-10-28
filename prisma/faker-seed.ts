import { PrismaClient, VehListingType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {

  // Fetch existing rooftops from DB
  const rooftops = await prisma.rooftop.findMany({ select: { id: true } });
  if (!rooftops.length) throw new Error("No rooftops found! Add rooftops first.");

  const vehicles: any[] = [];
  // const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Tesla', 'Hyundai', 'Kia', 'Nissan', 'Volkswagen', 'Subaru', 'Mazda', 'Audi', 'Jeep', 'Lexus', 'Volvo', 'GMC', 'Porsche'];

  const uniqueSet = new Set<string>();

  console.log("Generating 10,000 unique vehicles...");
  while (vehicles.length < 50000) {
    const make = faker.vehicle.manufacturer();
    const model = faker.vehicle.model();
    const year = faker.number.int({ min: 1985, max: 2026 });
    const rooftopId = faker.helpers.arrayElement(rooftops).id;
    const listingType = faker.helpers.arrayElement([VehListingType.New, VehListingType.Used]);

    const key = `${make}-${model}-${year}`;
    if (uniqueSet.has(key)) continue;
    uniqueSet.add(key);

    vehicles.push({
      make,
      model,
      year,
      rooftopId,
      vehListingType: listingType,
      guid: faker.string.uuid(),
      stock: faker.string.alphanumeric(8),
      vin: faker.vehicle.vin(),
      active: faker.datatype.boolean(),
      certified: faker.datatype.boolean(),
      trim: faker.vehicle.type(),
      bodyType: faker.vehicle.type(),
      extColor: faker.color.human(),
      intColor: faker.color.human(),
      miles: faker.number.int({ min: 0, max: 200000 }).toString(),
      status: faker.helpers.arrayElement(['Available', 'Sold', 'Pending']),
      engine: faker.vehicle.fuel(),
    });
  }

  console.log("Inserting records to the database...");
  const batchSize = 1000;
  for (let i = 0; i < vehicles.length; i += batchSize) {
    const batch = vehicles.slice(i, i + batchSize);
    await prisma.vehicle.createMany({ data: batch });
    console.log(`Inserted ${i + batch.length} / ${vehicles.length}`);
  }

  console.log("Seeding completed!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
