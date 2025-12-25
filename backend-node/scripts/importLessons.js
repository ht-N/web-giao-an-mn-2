const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const sourceDir = path.join(__dirname, '../../backend/data/mamnon');
const destDir = path.join(__dirname, '../uploads');

// Ensure destination exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

async function importLessons() {
    try {
        const admin = await prisma.user.findFirst({ where: { role: 'admin' } });
        if (!admin) {
            console.error("Admin not found. Please run createAdmin.js first.");
            return;
        }

        console.log("Found source directory:", sourceDir);

        // Recursive walk
        async function scanAndImport(dir) {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    await scanAndImport(fullPath);
                } else {
                    // Filter extensions
                    const ext = path.extname(file).toLowerCase();
                    if (['.ppt', '.pptx'].includes(ext)) {
                        // Extract metadata from path
                        // Pattern: .../age_group/category/filename
                        const relativePath = path.relative(sourceDir, fullPath);
                        const parts = relativePath.split(path.sep);

                        let ageGroup = "Mầm non";
                        let category = "Bài giảng điện tử";

                        if (parts.length >= 2) {
                            // Simplify age group mapping
                            const folderAge = parts[0];
                            if (folderAge.includes('nhatre')) ageGroup = "Nhà trẻ (1-2 tuổi)";
                            if (folderAge.includes('mam')) ageGroup = "Lớp Mầm (2-3 tuổi)";
                            if (folderAge.includes('choi')) ageGroup = "Lớp Chồi (4-5 tuổi)";
                            if (folderAge.includes('la')) ageGroup = "Lớp Lá (5-6 tuổi)";

                            // Category
                            const folderCat = parts[1];
                            if (folderCat === 'giaoan') category = "Giáo án";
                            if (folderCat === 'baigiang') category = "Bài giảng";
                            if (folderCat === 'powerpoint') category = "PowerPoint";
                        }

                        const title = path.basename(file, ext).replace(/_/g, ' ').replace(/-/g, ' ');
                        const newFileName = `${Date.now()}-${file}`;
                        const newPath = path.join(destDir, newFileName);

                        // Copy file
                        fs.copyFileSync(fullPath, newPath);

                        // Database entry
                        await prisma.lesson.create({
                            data: {
                                title: title.charAt(0).toUpperCase() + title.slice(1),
                                description: `${category} cho ${ageGroup}`,
                                price: Math.floor(Math.random() * (200000 - 50000) + 50000), // Random price 50k-200k
                                fileUrl: path.join('uploads', newFileName), // Relative path for storage
                                createdBy: admin.id,
                                createdAt: new Date()
                            }
                        });

                        console.log(`Imported: ${title}`);
                    }
                }
            }
        }

        await scanAndImport(sourceDir);
        console.log("Import completed successfully!");

    } catch (error) {
        console.error("Import error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

importLessons();
