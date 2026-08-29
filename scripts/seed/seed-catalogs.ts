import fs from "fs";
import path from "path";
import { PrismaClient, CatalogSource } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Standard Procurement Catalogs...");

  const dataPath = path.join(__dirname, "catalogs.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const catalogs = JSON.parse(rawData);

  let insertedCount = 0;

  for (const item of catalogs) {
    const existing = await prisma.standardCatalog.findFirst({
      where: {
        source: item.source as CatalogSource,
        standardName: item.standardName,
      },
    });

    if (!existing) {
      await prisma.standardCatalog.create({
        data: {
          source: item.source as CatalogSource,
          sourceEdition: item.sourceEdition,
          category: item.category,
          itemCode: item.itemCode || null,
          standardName: item.standardName,
          unitPrice: item.unitPrice,
          unit: item.unit,
          documentPage: item.documentPage || null,
          specSummary: item.specSummary || null,
        },
      });
      insertedCount++;
    }
  }

  console.log(`✅ Seeding complete. Inserted ${insertedCount} new catalog items.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
