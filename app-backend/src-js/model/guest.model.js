export function getUser(username, password) {
    if (username == 'worker')
        return { role: 'worker' };
    else if (username == 'admin')
        return { role: 'admin' };
    return null;
}
