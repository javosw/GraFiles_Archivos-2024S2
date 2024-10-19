db.createCollection("users");
db.users.createIndex({ username: 1 });

db.users.insertMany([
    {
        username: 'worker1',
        role: 'worker',
        password: '123123'
    },
    {
        username:'worker2',
        role:'worker',
        password:'123123'
    },
    {
        username:'admin1',
        role:'admin',
        password:'123123'
    },
    {
        username:'admin2',
        role:'admin',
        password:'123123'
    }
])