let users = [[(email = "josh@gmail.com"), (fullName = "Joshua Riangkamang"), (username = "josh_riang2"), (password = `jhosua0504.,*#`)]];

const getData = () => {
    return users;
}

const setData = (data) => {
    users.push(data);
}