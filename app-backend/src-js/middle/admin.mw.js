//
import { modelMessage } from "../model/guest.model.js";
export const getTrashFolder = async (req, res, next) => {
    const { getTrashFolder } = await import('../data/admin.data.js');
    const value = await getTrashFolder(req.db);
    if (value) {
        let files = [];
        value.files.forEach((file) => { files.push(file.toString()); });
        let bodyRes = {
            _id: value._id.toString(),
            name: value.name,
            files
        };
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMessage('400@getTrashFolder'));
        return;
    }
};
export const addUser = async (req, res, next) => {
    const { addUser } = await import('../data/admin.data.js');
    const { username, password, role } = req.body;
    const value = await addUser(req.db, { username, password, role });
    if (value) {
        res.status(200).json({ idUser: value.toString() });
    }
    else {
        res.status(400).json(modelMessage('400@getTrashFolder'));
        return;
    }
};
