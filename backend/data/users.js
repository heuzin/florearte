import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Bruna Andrade',
        email: 'brunaribeiroandrade@gmail.com',
        password: bcrypt.hashSync('calaboca123', 10),
        isAdmin: true
    },
]

export default users