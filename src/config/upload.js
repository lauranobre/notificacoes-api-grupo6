const multer = require('multer');
const path = require('path');

// Configurar onde e como salvar os arquivos [cite: 22]
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define a pasta de destino [cite: 26]
    },
    filename: (req, file, cb) => {
        // Gerar nome único: timestamp + número aleatório + extensão original [cite: 30, 31, 32]
        const nomeUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extensao = path.extname(file.originalname);
        cb(null, nomeUnico + extensao); // [cite: 33]
    },
});

// Filtrar tipos de arquivo permitidos [cite: 34, 35]
const fileFilter = (req, file, cb) => {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']; // [cite: 36]
    
    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true); // Aceita o arquivo [cite: 37, 38]
    } else {
        cb(new Error('Tipo de arquivo não permitido. Use: JPEG, PNG, GIF ou WebP'), false); // [cite: 40]
    }
};

const upload = multer({
    storage, // [cite: 44]
    fileFilter, // [cite: 45]
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite máximo de 5MB [cite: 46, 47]
    },
});

module.exports = upload; // [cite: 50]
