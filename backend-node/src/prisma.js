const { PrismaClient } = require('@prisma/client');
const path = require('path');

// Ensure DATABASE_URL is set for Prisma
if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = `file:${path.join(__dirname, '../prisma/dev.db')}`;
}

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        },
    },
});

module.exports = prisma;
