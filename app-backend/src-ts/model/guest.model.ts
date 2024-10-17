export function getUser(username: string, password: string): { role: string } | null {
    if (username == 'worker') return { role: 'worker' }
    else if (username == 'admin') return { role: 'admin' }
    return null;
}