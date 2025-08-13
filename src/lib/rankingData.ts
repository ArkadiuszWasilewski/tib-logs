// fake data generator for user profiles
// This file generates a list of user profiles with random data using the Faker.js library
import vocations from "@/constants/vocations";
import tibiaWorlds from "@/constants/tibiaWorlds";
import { ReportData } from "@/components/DataForm/types";
import { faker } from "@faker-js/faker";

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
};

const createUsers = (numUser: number) => {
  const users: User[] = [];
  for (let i = 0; i < numUser; i++) {
    users.push({
      characterName: faker.person.firstName(),
      characterLevel: faker.number.int({ min: 500, max: 1000 }),
      characterVocation: faker.helpers.arrayElement(vocations),
      characterWorld: faker.helpers.arrayElement(
        tibiaWorlds.map((world) => world.world)
      ),
      rawXpHour: faker.number.int({ min: 0, max: 32000 }),
      dmgHour: faker.number.int({ min: 0, max: 5000 }),
      huntDuration: faker.number.int({ min: 0, max: 600 }), //duraion in minutes
      uploadDate: faker.date.recent(),
      comments: faker.lorem.words({ min: 0, max: 2 }),
    });
  }
  return users;
};

export const data: User[] = [...createUsers(100)];

// Just to test purpose
export const dataExample: ReportData[] = [
  {
    user: "jyNa4jB3wVdU2tFH0jvBlbYBtV63",
    sessionData: {
      Balance: 908448,
      Damage: 13246994,
      "Damage/h": 277198,
      Healing: 4233501,
      "Healing/h": 1357690,
      "Killed Monsters": [
        {
          Name: "cobra",
          Count: 1,
        },
        {
          Name: "cursed ape",
          Count: 1,
        },
        {
          Name: "iks yapunac",
          Count: 333,
        },
        {
          Name: "mitmah scout",
          Count: 608,
        },
        {
          Name: "mitmah seer",
          Count: 1948,
        },
      ],
      "Looted Items": [],
      "Raw XP Gain": 12310243,
      "Raw XP/h": 3272697,
      "Session end": 1751093351000,
      "Session length": "03:25h",
      "Session start": 1751081051000,
      Supplies: 1818361,
      "XP Gain": 27516160,
      "XP/h": 6236043,
    },
    reportDescription: "xd",
    characterVocation: "Monk",
    characterLevel: 310,
    characterGear: "MID",
    currentSpawn: "Iksupan Occupied Sanctuary",
    createdAt: new Date("2025-08-12T21:05:26.316+00:00"),
  },
  {
    user: "test",
    sessionData: {
      Balance: 908448,
      Damage: 13246994,
      "Damage/h": 277198,
      Healing: 4233501,
      "Healing/h": 1357690,
      "Killed Monsters": [
        {
          Name: "cobra",
          Count: 1,
        },
        {
          Name: "cursed ape",
          Count: 1,
        },
        {
          Name: "iks yapunac",
          Count: 333,
        },
        {
          Name: "mitmah scout",
          Count: 608,
        },
        {
          Name: "mitmah seer",
          Count: 1948,
        },
      ],
      "Looted Items": [],
      "Raw XP Gain": 12310243,
      "Raw XP/h": 3272697,
      "Session end": 1751093351000,
      "Session length": "03:25h",
      "Session start": 1751081051000,
      Supplies: 1818361,
      "XP Gain": 27516160,
      "XP/h": 6236043,
    },
    reportDescription: "xd",
    characterVocation: "Monk",
    characterLevel: 310,
    characterGear: "MID",
    currentSpawn: "Iksupan Occupied Sanctuary",
    createdAt: new Date("2025-08-12T21:05:26.316+00:00"),
  },
];
