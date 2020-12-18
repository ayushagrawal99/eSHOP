import bcrypt from "bcryptjs";

const user = [
    {
        name: "Ayush",
        email: "ayush@000gmail.com",
        password: bcrypt.hashSync("12346", 10),
        isAdmin: true,
    },
    {
        name: "Joe",
        email: "ayush@111gmail.com",
        password: bcrypt.hashSync("12346", 10),
        isAdmin: true,
    },
    {
        name: "Foo",
        email: "ayush@222gmail.com",
        password: bcrypt.hashSync("12346", 10),
        isAdmin: true,
    },
];

export default user;
