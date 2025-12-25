const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function count() {
    const count = await prisma.lesson.count();
    console.log(`LESSON_COUNT: ${count}`);
    process.exit(0);
}
count();
