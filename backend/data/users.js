import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Effenril Agung',
    email: 'agung@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jhon Doe',
    email: 'Jhon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Afika',
    email: 'afika@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
