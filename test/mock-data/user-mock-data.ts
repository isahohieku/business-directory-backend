
const validLoginDetails = {
    email: 'isahohieku@gmail.com',
    password: 'password'
};

const invalidLoginDetails = {
    email: 'isahohieku@gmail.co',
    password: 'password'
};

const validRegistrationDetails = {
    fullName: 'Isah Ohieku',
    email: 'isahohieku@email.com',
    password: 'password'
};

const userData = {
    fullName: 'Isah Ohieku',
    email: 'isahohieku@email.com',
    createdAt: '',
    updatedAt: ''
};

const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IklzYWggT2'
+ 'hpZWt1IiwiaWQiOjEsImNyZWF0ZWRBdCI6IjIwMTktMDctMjJUMTM6MjU6NTUuNTY3WiIsInVwZGF0ZWRBdCI6IjIw'
+ 'MTktMDctMjJUMTM6MjU6NTUuNTcyWiIsImVtYWlsIjoiaXNhaG9oaWVrdUBnbWFpbC5jb20iLCJpYXQiOjE1NjQwODE2'
+ 'MTAsImV4cCI6MTU2NDE2ODAxMH0._OJ7YjD5fXMNL4NfCjxxpRbA5lY7quNN4G5ncC5qu3';

export {
    validLoginDetails,
    invalidLoginDetails,
    validRegistrationDetails,
    userData,
    invalidToken
};