import multer from 'multer'
import fs from 'fs';

const diskStorageOptions: multer.DiskStorageOptions = {
    destination: function (req, file, callback) {
        let folder: fs.PathLike = `files/${req.body.ancestor}`;
        fs.mkdirSync(folder, { recursive: true });
        callback(null, folder);
    },
    filename: function (req, file, callback) {
        callback(null, `${file.originalname}`);
    }
}
const storage: multer.StorageEngine = multer.diskStorage(diskStorageOptions);

const multerOptions: multer.Options = {
    storage: storage
};
export const customMulter = multer(multerOptions)
