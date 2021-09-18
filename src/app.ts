enum Role { ADMIN, READ_ONLY, AUTHOR }

const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: Role
} = {
    name: 'Gibran',
    age: 29,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
}

person.role = Role.READ_ONLY