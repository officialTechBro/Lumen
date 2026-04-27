import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  console.log("Connecting to database...");

  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: "test-db-check@example.com",
      fullName: "DB Test User",
    },
  });
  console.log("✓ Created user:", user.id);

  // Query it back
  const found = await prisma.user.findUnique({ where: { id: user.id } });
  console.log("✓ Queried user:", found?.email);

  // Clean up
  await prisma.user.delete({ where: { id: user.id } });
  console.log("✓ Deleted user — database is working correctly.");
}

main()
  .catch((err) => {
    console.error("✗ Database test failed:", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
