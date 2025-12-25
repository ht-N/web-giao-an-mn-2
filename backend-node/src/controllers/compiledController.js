const fs = require('fs');
const path = require('path');

const COMPILED_DIR = path.join(__dirname, '../../backend/data/mamnon/compiled');

const listCompiledFiles = (req, res) => {
    try {
        if (!fs.existsSync(COMPILED_DIR)) {
            return res.json({ files: [] });
        }
        const files = fs.readdirSync(COMPILED_DIR);
        // Filter for only files (optional, but good practice)
        const fileList = files.filter(file => {
            return fs.statSync(path.join(COMPILED_DIR, file)).isFile() && !file.startsWith('.');
        }).map(file => ({
            name: file,
            url: `/data/compiled/${encodeURIComponent(file)}`,
            size: fs.statSync(path.join(COMPILED_DIR, file)).size
        }));

        res.json({ files: fileList });
    } catch (error) {
        console.error("Error listing compiled files:", error);
        res.status(500).json({ error: "Failed to list files" });
    }
};

module.exports = {
    listCompiledFiles
};
