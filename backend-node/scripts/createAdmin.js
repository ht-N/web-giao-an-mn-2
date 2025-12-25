const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createAdmin() {
    try {
        const email = 'admin';
        const password = '12345';
        const hashedPassword = await bcrypt.hash(password, 8);

        const existingAdmin = await prisma.user.findUnique({ where: { email } });
        if (existingAdmin) {
            // Update password if exists
            await prisma.user.update({
                where: { email },
                data: { password: hashedPassword, role: 'admin' }
            });
            console.log('Admin user updated successfully');
        } else {
            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: 'admin'
                }
            });
            console.log('Admin user created successfully');
        }
        console.log('Email: admin');
        console.log('Password: 12345');
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
