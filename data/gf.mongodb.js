use('gf');

db.createCollection("folders");

db.createCollection("users");
db.users.createIndex({ username: 1 });

const users = [
    { username: "worker1", password: "123123", role: "worker" },
    { username: "worker2", password: "123123", role: "worker" },
    { username: "worker3", password: "123123", role: "worker" },
    { username: "admin1", password: "123123", role: "admin" },
    { username: "admin2", password: "123123", role: "admin" },
    { username: "admin3", password: "123123", role: "admin" }
];

users.forEach(user => {
    const folderRoot = db.folders.insertOne({
        name: 'root',
        ancestor: null,
        folders: [],
        files: []
    });

    const folderShared = db.folders.insertOne({
        name: 'shared',
        ancestor: null,
        folders: [],
        files: []
    });

    db.users.insertOne({
        username: user.username,
        role: user.role,
        password: user.password,
        folderRoot: folderRoot.insertedId,
        folderShared: folderShared.insertedId
    });
});

db.folders.insertOne({
    _id: 'trash',
    name: 'trash',
    ancestor: null,
    folders: [],
    files: []
});


