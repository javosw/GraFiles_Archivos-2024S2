import multer from 'multer';
import fs from 'fs';
const diskStorageOptions = {
    destination: function (req, file, callback) {
        let folder = `files/${req.body.ancestor}`;
        fs.mkdirSync(folder, { recursive: true });
        callback(null, folder);
    },
    filename: function (req, file, callback) {
        callback(null, `${file.originalname}`);
    }
};
const storage = multer.diskStorage(diskStorageOptions);
const multerOptions = {
    storage: storage
};
export const customMulter = multer(multerOptions);
