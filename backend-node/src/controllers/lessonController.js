const prisma = require('../prisma');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me-in-production';

const getAllLessons = async (req, res) => {
    try {
        const { search, age_group, category } = req.query;

        const where = {};

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } }
            ];
        }

        if (age_group) {
            // Map frontend IDs to keywords in description
            const ageMap = {
                'nhatre1_2': 'Nhà trẻ',
                'mam2_3': 'Mầm',
                'choi4_5': 'Chồi',
                'la5_6': 'Lá'
            };
            const keyword = ageMap[age_group] || age_group;
            where.description = { ...where.description, contains: keyword };
        }

        if (category) {
            // Map frontend IDs to category names
            const catMap = {
                'giaoan': 'Giáo án',
                'baigiang': 'Bài giảng',
                'powerpoint': 'PowerPoint'
            };
            const keyword = catMap[category] || category;
            where.description = { ...where.description, contains: keyword };
        }

        const lessons = await prisma.lesson.findMany({
            where: Object.keys(where).length > 0 ? where : undefined,
            orderBy: { createdAt: 'desc' }
        });
        res.json(lessons);
    } catch (error) {
        console.error("Fetch lessons error:", error);
        res.status(500).json({ error: error.message });
    }
};

const createLesson = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const file = req.file;

        if (!title || !price || !file) {
            return res.status(400).json({ error: 'Title, price, and file are required' });
        }

        const lesson = await prisma.lesson.create({
            data: {
                title,
                description: description || '',
                price: parseFloat(price),
                fileUrl: file.path,
                createdBy: req.user.id
            }
        });

        res.status(201).json(lesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await prisma.lesson.findUnique({ where: { id: parseInt(id) } });

        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // Add fileExtension for frontend convenience
        const extension = path.extname(lesson.fileUrl);
        const lessonWithExt = { ...lesson, fileExtension: extension.replace('.', '') };

        res.json({ file: lessonWithExt }); // Wrap in { file: ... } to match frontend expectation
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;

        const lesson = await prisma.lesson.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                price: price ? parseFloat(price) : undefined
            }
        });

        res.json(lesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await prisma.lesson.findUnique({ where: { id: parseInt(id) } });

        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // Delete file from filesystem
        if (lesson.fileUrl && fs.existsSync(lesson.fileUrl)) {
            fs.unlinkSync(lesson.fileUrl);
        }

        await prisma.lesson.delete({ where: { id: parseInt(id) } });

        res.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const downloadLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const lessonId = parseInt(id);

        const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // Permission check for paid items
        if (lesson.price > 0) {
            const authHeader = req.header('Authorization');
            const token = authHeader ? authHeader.replace('Bearer ', '') : req.query.token;

            if (!token) {
                return res.status(403).json({ error: 'Đây là tài liệu trả phí. Vui lòng mua hoặc đăng nhập để tải.' });
            }

            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                const user = await prisma.user.findUnique({ where: { id: decoded.id } });
                if (!user) throw new Error();

                if (user.role !== 'admin') {
                    const order = await prisma.order.findFirst({
                        where: {
                            userId: user.id,
                            lessonId: lesson.id,
                            status: 'paid'
                        }
                    });
                    if (!order) {
                        return res.status(403).json({ error: 'Bạn cần mua giáo án này trước khi tải xuống.' });
                    }
                }
            } catch (e) {
                return res.status(401).json({ error: 'Yêu cầu xác thực không hợp lệ.' });
            }
        }

        // Serve file
        const filePath = path.resolve(lesson.fileUrl);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found on server' });
        }

        const extension = path.extname(lesson.fileUrl) || '.pdf';
        const safeTitle = lesson.title
            .replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s-]/gi, '')
            .replace(/\s+/g, '-')
            .toLowerCase();

        const fileName = `${safeTitle}${extension}`;
        res.download(filePath, fileName);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const viewLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const lessonId = parseInt(id);

        const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // Permission check for paid items - only allow full viewing if owned
        if (lesson.price > 0) {
            const authHeader = req.header('Authorization');
            const token = authHeader ? authHeader.replace('Bearer ', '') : req.query.token;

            if (!token) {
                return res.status(403).json({ error: 'Vui lòng mua hoặc đăng nhập để xem đầy đủ tài liệu.' });
            }

            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                const user = await prisma.user.findUnique({ where: { id: decoded.id } });
                if (!user) throw new Error();

                if (user.role !== 'admin') {
                    const order = await prisma.order.findFirst({
                        where: {
                            userId: user.id,
                            lessonId: lesson.id,
                            status: 'paid'
                        }
                    });
                    if (!order) {
                        return res.status(403).json({ error: 'Bạn cần mua giáo án này để xem bản đầy đủ.' });
                    }
                }
            } catch (e) {
                return res.status(401).json({ error: 'Yêu cầu xác thực không hợp lệ.' });
            }
        }

        const filePath = path.resolve(lesson.fileUrl);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found on server' });
        }

        // Set content type based on extension
        const extension = path.extname(lesson.fileUrl).toLowerCase();
        const contentTypes = {
            '.pdf': 'application/pdf',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.doc': 'application/msword',
            '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            '.ppt': 'application/vnd.ms-powerpoint',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.xls': 'application/vnd.ms-excel'
        };

        const contentType = contentTypes[extension] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://view.officeapps.live.com");

        res.sendFile(filePath);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllLessons,
    createLesson,
    updateLesson,
    deleteLesson,
    downloadLesson,
    viewLesson,
    getLessonById
};
