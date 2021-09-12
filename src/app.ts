const button = document.querySelector('button')

button?.addEventListener('click', () => {
    console.log('Clicked')
})

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