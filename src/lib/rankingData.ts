// fake data generator for user profiles
// This file generates a list of user profiles with random data using the Faker.js library
import vocations from '@/constants/vocations';
import tibiaWorlds from '@/constants/tibiaWorlds';

import { faker } from '@faker-js/faker';

export type User = {
    characterName: string;
    characterLevel: number;
    characterVocation: string;
    characterWorld: string;
    rawXpHour: number;
    dmgHour: number;
    huntDuration: number;
    uploadDate: Date;
    comments: string;

    
}

const createUsers = (numUser: number) => {
    const users: User[] = [];
    for (let i = 0; i < numUser; i++) {
        users.push({
            characterName: faker.person.firstName(),
            characterLevel: faker.number.int({ min: 500, max: 1000 }),
            characterVocation: faker.helpers.arrayElement(vocations),
            characterWorld: faker.helpers.arrayElement(tibiaWorlds.map(world => world.world)),
            rawXpHour: faker.number.int({ min: 0, max: 32000 }), 
            dmgHour: faker.number.int({ min: 0, max: 5000 }), 
            huntDuration: faker.number.int({ min: 0, max: 600 }), //duraion in minutes
            uploadDate: faker.date.recent(),
            comments: faker.lorem.words({ min: 0, max: 2 }),
        });
    }
    return users;
}

export const data: User[] = [...createUsers(5)];