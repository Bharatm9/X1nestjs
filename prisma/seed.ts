// prisma/seed.ts
import { PrismaClient, $Enums } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing child tables...");
  await prisma.image.deleteMany({});
  await prisma.spin360.deleteMany({});
  await prisma.video.deleteMany({});
  await prisma.vehicle.deleteMany({});
  await prisma.rooftop.deleteMany({});

  // Insert rooftops
  const rooftops = [
    {
      id: 1,
      name: "Downtown Motors",
      street: "100 Main St",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      phone: "217-555-0100",
      email: "contact@downtownmotors.com",
      site: "https://downtownmotors.example",
    },
    {
      id: 2,
      name: "Broadway Autos",
      street: "200 Broadway Ave",
      city: "Columbus",
      state: "OH",
      zip: "43085",
      phone: "614-555-0200",
      email: "info@broadwayautos.com",
      site: "https://broadwayautos.example",
    },
    {
      id: 3,
      name: "Cityline Cars",
      street: "300 Cityline Blvd",
      city: "Austin",
      state: "TX",
      zip: "73301",
      phone: "512-555-0300",
      email: "sales@citylinecars.com",
      site: "https://citylinecars.example",
    },
    {
      id: 4,
      name: "Harbor Auto Group",
      street: "400 Harbor Rd",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      phone: "206-555-0400",
      email: "hello@harborauto.com",
      site: "https://harborauto.example",
    },
    {
      id: 5,
      name: "Parkway Dealers",
      street: "500 Parkway Dr",
      city: "Miami",
      state: "FL",
      zip: "33101",
      phone: "305-555-0500",
      email: "contact@parkwaydealers.com",
      site: "https://parkwaydealers.example",
    },
  ];

  console.log("Seeding rooftops...");
  for (const r of rooftops) {
    await prisma.rooftop.create({ data: r });
  }

  // Vehicles (20)
  const vehicles = [
    { id:1, rooftop_id:1, make:"Toyota", model:"Camry", year:2021, veh_listing_type:$Enums.VehListingType.Used, trim:"LE", body_type:"Sedan", ext_color:"Super White", engine:"2.5L I4", miles:"35000", status:"Available" },
    { id:2, rooftop_id:1, make:"Honda", model:"Civic", year:2022, veh_listing_type:$Enums.VehListingType.New, trim:"EX", body_type:"Sedan", ext_color:"Crystal Black", engine:"2.0L I4", miles:"10", status:"Available" },
    { id:3, rooftop_id:2, make:"Ford", model:"F-150", year:2023, veh_listing_type:$Enums.VehListingType.New, trim:"XLT", body_type:"Truck", ext_color:"Oxford White", engine:"3.5L V6", miles:"5", status:"Available" },
    { id:4, rooftop_id:2, make:"Chevrolet", model:"Malibu", year:2020, veh_listing_type:$Enums.VehListingType.Used, trim:"LS", body_type:"Sedan", ext_color:"Silver", engine:"1.5L Turbo", miles:"42000", status:"Available" },
    { id:5, rooftop_id:3, make:"BMW", model:"3 Series", year:2021, veh_listing_type:$Enums.VehListingType.Used, trim:"330i", body_type:"Sedan", ext_color:"Alpine White", engine:"2.0L Turbo", miles:"30000", status:"Available" },
    { id:6, rooftop_id:3, make:"Mercedes-Benz", model:"C-Class", year:2022, veh_listing_type:$Enums.VehListingType.New, trim:"C300", body_type:"Sedan", ext_color:"Obsidian Black", engine:"2.0L Turbo", miles:"8", status:"Available" },
    { id:7, rooftop_id:4, make:"Tesla", model:"Model 3", year:2023, veh_listing_type:$Enums.VehListingType.New, trim:"Standard", body_type:"Sedan", ext_color:"Red Multi-Coat", engine:"Electric", miles:"5", status:"Available" },
    { id:8, rooftop_id:4, make:"Hyundai", model:"Elantra", year:2021, veh_listing_type:$Enums.VehListingType.Used, trim:"SEL", body_type:"Sedan", ext_color:"Blue", engine:"2.0L I4", miles:"28000", status:"Available" },
    { id:9, rooftop_id:5, make:"Kia", model:"Sorento", year:2022, veh_listing_type:$Enums.VehListingType.New, trim:"LX", body_type:"SUV", ext_color:"Dark Moss", engine:"2.5L I4", miles:"12", status:"Available" },
    { id:10, rooftop_id:5, make:"Nissan", model:"Altima", year:2020, veh_listing_type:$Enums.VehListingType.Used, trim:"S", body_type:"Sedan", ext_color:"Gun Metallic", engine:"2.5L I4", miles:"48000", status:"Available" },
    { id:11, rooftop_id:1, make:"Volkswagen", model:"Passat", year:2021, veh_listing_type:$Enums.VehListingType.Used, trim:"SE", body_type:"Sedan", ext_color:"Platinum Gray", engine:"2.0L Turbo", miles:"36000", status:"Available" },
    { id:12, rooftop_id:2, make:"Subaru", model:"Outback", year:2023, veh_listing_type:$Enums.VehListingType.New, trim:"Premium", body_type:"Wagon", ext_color:"Crystal White", engine:"2.5L H4", miles:"6", status:"Available" },
    { id:13, rooftop_id:3, make:"Mazda", model:"CX-5", year:2022, veh_listing_type:$Enums.VehListingType.New, trim:"Touring", body_type:"SUV", ext_color:"Polymetal Gray", engine:"2.5L I4", miles:"14", status:"Available" },
    { id:14, rooftop_id:4, make:"Audi", model:"A4", year:2021, veh_listing_type:$Enums.VehListingType.Used, trim:"Premium", body_type:"Sedan", ext_color:"Mythos Black", engine:"2.0L Turbo", miles:"25000", status:"Available" },
    { id:15, rooftop_id:5, make:"Jeep", model:"Wrangler", year:2023, veh_listing_type:$Enums.VehListingType.New, trim:"Sport", body_type:"SUV", ext_color:"Firecracker Red", engine:"2.0L Turbo", miles:"3", status:"Available" },
    { id:16, rooftop_id:1, make:"Lexus", model:"RX 350", year:2022, veh_listing_type:$Enums.VehListingType.New, trim:"Base", body_type:"SUV", ext_color:"Silver Lining", engine:"3.5L V6", miles:"7", status:"Available" },
    { id:17, rooftop_id:2, make:"Volvo", model:"XC60", year:2021, veh_listing_type:$Enums.VehListingType.Used, trim:"Momentum", body_type:"SUV", ext_color:"Onyx Black", engine:"2.0L Turbo", miles:"34000", status:"Available" },
    { id:18, rooftop_id:3, make:"Chevrolet", model:"Tahoe", year:2023, veh_listing_type:$Enums.VehListingType.New, trim:"LT", body_type:"SUV", ext_color:"Summit White", engine:"5.3L V8", miles:"2", status:"Available" },
    { id:19, rooftop_id:4, make:"GMC", model:"Sierra", year:2022, veh_listing_type:$Enums.VehListingType.Used, trim:"SLE", body_type:"Truck", ext_color:"Dark Bronze", engine:"5.3L V8", miles:"22000", status:"Available" },
    { id:20, rooftop_id:5, make:"Porsche", model:"Macan", year:2021, veh_listing_type:$Enums.VehListingType.New, trim:"Base", body_type:"SUV", ext_color:"Jet Black", engine:"2.0L Turbo", miles:"15000", status:"Available" },
  ];

  console.log("Seeding vehicles...");
  for (const v of vehicles) {
    await prisma.vehicle.create({
      data: {
        rooftopId: v.rooftop_id,
        make: v.make,
        model: v.model,
        year: v.year,
        vehListingType: v.veh_listing_type,
        trim: v.trim,
        bodyType: v.body_type,
        extColor: v.ext_color,
        engine: v.engine,
        miles: v.miles,
        status: v.status,
      },
    });
  }

  // Example videos, spins, images for vehicle id 7 (Tesla Model 3)
  console.log("Seeding videos/spins/images for vehicle 7...");
  await prisma.video.create({
    data: {
      vehicleId: 7,
      clipDuration: 45,
      clipUrl: "https://cdn.example.com/videos/tesla_model3_walkaround.mp4",
      thumbUrl: "https://cdn.example.com/videos/thumbs/tesla_model3.jpg",
      title: "Model 3 Exterior Walkaround",
      shortDesc: "Exterior walkaround of Tesla Model 3",
      desc: "Full exterior video showing all angles and features.",
    },
  });

  await prisma.spin360.create({
    data: {
      vehicleId: 7,
      playerUrl: "https://360.example.com/player/tesla-model3-ext",
      type: $Enums.SpinType.STITCHED,
      exteriorView: true,
      interiorView: false,
    },
  });

  await prisma.image.createMany({
    data: [
      { vehicleId: 7, imageGroupId: 1, imageUrl: "https://cdn.example.com/images/tesla_model3_front.jpg", imageWidth: 1920, imageHeight: 1080 },
      { vehicleId: 7, imageGroupId: 1, imageUrl: "https://cdn.example.com/images/tesla_model3_side.jpg", imageWidth: 1920, imageHeight: 1080 },
      { vehicleId: 7, imageGroupId: 2, imageUrl: "https://cdn.example.com/images/tesla_model3_interior.jpg", imageWidth: 1920, imageHeight: 1080 },
    ],
  });

  // final counts
  const counts = {
    rooftops: await prisma.rooftop.count(),
    vehicles: await prisma.vehicle.count(),
    videos: await prisma.video.count(),
    spins: await prisma.spin360.count(),
    images: await prisma.image.count(),
  };

  console.log("Seeding complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
