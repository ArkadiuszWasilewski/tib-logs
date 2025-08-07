// fake data generator for user profiles
// This file generates a list of user profiles with random data using the Faker.js library


import { faker } from '@faker-js/faker';

export type User = {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    comments: string;
    
}

const createUsers = (numUser: number) => {
    const users: User[] = [];
    for (let i = 0; i < numUser; i++) {
        users.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            age: faker.number.int({ min: 18, max: 65 }),
            email: faker.internet.email(),
            comments: faker.lorem.sentence(3),
        });
    }
    return users;
}

export const data: User[] = [...createUsers(1000)];