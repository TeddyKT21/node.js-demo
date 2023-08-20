import jsonfile from 'jsonfile';
const dbFile = './db.json'


export function getAll(cb) {
    jsonfile.readFile(dbFile)
        .then(cb)
        .catch(err => console.log(err));
}
export function getByDetails(email, password, cb) {
    jsonfile.readFile(dbFile)
        .then((userList) => {
            const user = userList.find((u) => u.email === email);
            cb(user);
        })
        .catch(err => console.log(err));
}

export function findById(id, cb) {
    jsonfile.readFile(dbFile)
        .then((userList) => {
            const user = userList.find((u) => u.id === id);
            if (!user) cb(null);
            else cb(user);
        })
        .catch(err => console.log(err));
}

export function addUser(user, cb) {
    console.log('in add user', user);
    jsonfile.readFile(dbFile)
        .then((users => {
            users.push(user);
            jsonfile.writeFile(dbFile, users)
                .then((user) => cb(user));
        }));
}

export function deleteUser(id, cb) {
    jsonfile.readFile(dbFile)
        .then((users => {
            const index = users.findIndex(u => u.id === id);
            if (index === -1) {
                console.log('user not found');
                cb(false);
                return;
            }
            users.splice(index, 1);

            jsonfile.writeFile(dbFile, users)
                .then(() => cb(true));
        }));
}

export function updateUser(user, cb) {
    jsonfile.readFile(dbFile)
        .then((users => {
            const index = users.findIndex(u => u.id === user.id);
            if (index === -1) {
                cb(null);
                return;
            }
            if (user.email) users[index].email = user.email;
            if (user.password) users[index].password = user.password;
            if (user.product) users[index].product = user.product

            jsonfile.writeFile(dbFile, users)
                .then(() => cb(user));
        }));
}

