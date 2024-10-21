export async function getFolder(req, res, next) {
    const { getFolder } = await import('../data/worker.data.js');
    const data = await getFolder(req.body);
    if (data) {
        res.status(200).json(data);
    }
    else {
        res.status(401).send();
    }
}
