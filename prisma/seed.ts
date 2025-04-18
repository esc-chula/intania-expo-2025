import { Competition } from "@/lib/backend/types/competition";
import { Event, EventTag } from "@/lib/backend/types/event";
import { IntaniaLocation } from "@/lib/backend/types/intaniaLocation";
import { Major } from "@/lib/backend/types/major";
import { Building, Floor, Room } from "@/lib/backend/types/map";
import { ExpoStaff, Visitor, WorkshopStaff } from "@/lib/backend/types/user";
import { Workshop, WorkshopSlot } from "@/lib/backend/types/workshop";
import { generateSixDiditCode } from "@/lib/backend/utils";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import * as dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config({ path: ".env" });
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  await prisma.intaniaLocation.deleteMany();
  await prisma.intaniaLocation.createMany({ data: locations });

  await prisma.building.deleteMany();
  await prisma.building.createMany({ data: buildings });

  await prisma.floor.deleteMany();
  await prisma.floor.createMany({ data: floors });

  await prisma.room.deleteMany();
  await prisma.room.createMany({ data: rooms });

  await prisma.registeredWorkshopSlotOnVisitor.deleteMany();

  await prisma.workshop.deleteMany();
  await prisma.workshop.createMany({
    data: workshops.map((obj) => {
      const { slots: _, ...newObj } = obj;
      return newObj;
    }),
  });

  await prisma.workshopSlot.deleteMany();
  await prisma.workshopSlot.createMany({ data: workshopSlots });

  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: events.map((obj) => {
      const { tagsId: _, ...newObj } = obj;
      return newObj;
    }),
  });

  await prisma.eventTag.deleteMany();
  await prisma.eventTag.createMany({ data: eventTags });

  await prisma.competition.deleteMany();
  await prisma.competition.createMany({ data: competitions });

  await prisma.major.deleteMany();
  await prisma.major.createMany({ data: majors });

  await prisma.token.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: expoStaffs,
  });
  await prisma.user.createMany({
    data: workshopStaffs,
  });
  await prisma.user.createMany({
    data: visitors,
  });
  visitors.forEach(async (visitor) => {
    const data = await prisma.user.findFirst({
      where: { id: visitor.id },
      select: { incrementCode: true },
    });
    const sixDigitCode = generateSixDiditCode(
      visitor.category,
      data!.incrementCode,
    );
    await prisma.user.update({
      where: { id: visitor.id },
      data: { sixDigitCode: sixDigitCode },
    });
  });
}

const expoStaffs: ExpoStaff[] = [
  {
    id: randomUUID(),
    email: "staff1_expo@chula.ac.th",
    role: "EXPO_STAFF",
  },
];

const workshopsId = [randomUUID(), randomUUID()];

const workshopStaffs: WorkshopStaff[] = [
  {
    id: randomUUID(),
    email: "staff1_workshop@chula.ac.th",
    workshopId: workshopsId[0],
    role: "WORKSHOP_STAFF",
  },
];

const visitors: Visitor[] = [
  {
    id: randomUUID(),
    email: "user1@gmail.com",
    sixDigitCode: "",
    name: "name1",
    surname: "surname1",
    gender: "male",
    phone: "0123456789",
    category: "STUDENT",
    visitDates: [],
    interestedActivities: [],
    referralSources: [],
    studentLevel: "",
    studyStream: "",
    school: "",
    province: "",
    interestLevel: "",
    interestedFields: [],
    emergencyContact: "",
    universityYear: "",
    faculty: "",
    university: "",
    alumniBatch: "",
    teacherSchool: "",
    teacherProvince: "",
    subjectTaught: "",
    role: "VISITOR",
  },
];

const buildings: Building[] = [
  {
    id: randomUUID(),
    name: "ENG3",
    slug: "eng3",
    images: [],
  },
  {
    id: randomUUID(),
    name: "ENG1",
    slug: "eng1",
    images: [],
  },
  {
    id: randomUUID(),
    name: "ENG2",
    slug: "eng2",
    images: [],
  },
  {
    id: randomUUID(),
    name: "ENG100",
    slug: "eng100",
    images: [],
  },
  {
    id: randomUUID(),
    name: "ENG4",
    slug: "eng4",
    images: [],
  },
];

const floors: Floor[] = [
  {
    id: randomUUID(),
    buildingId: buildings[0].id,
    name: "1",
    slug: "floor 1",
    summary: "Hall of Legends, Innovation"
  },
  {
    id: randomUUID(),
    buildingId: buildings[0].id,
    name: "2",
    slug: "floor 2",
    summary: "Showcase & Sharing"
  },
  {
    id: randomUUID(),
    buildingId: buildings[0].id,
    name: "3",
    slug: "floor 3",
    summary: "S&S, Intania Arena"
  },
];

const rooms: Room[] = [
  {
    id: randomUUID(),
    floorId: floors[0].id,
    name: "101",
    event: "nothing here...",
    body: "",
  },
  {
    id: randomUUID(),
    floorId: floors[0].id,
    name: "102",
    event: "nothing here too...",
    body: "",
  },
  {
    id: randomUUID(),
    floorId: floors[1].id,
    name: "201",
    event: "something here...",
    body: "",
  },
  {
    id: randomUUID(),
    floorId: floors[2].id,
    name: "301",
    event: "everything here!!!",
    body: "555",
  },
];

const locations: IntaniaLocation[] = [
  {
    id: randomUUID(),
    room: "101",
    floor: "1",
    building: "ENG3",
  },
  {
    id: randomUUID(),
    room: "102",
    floor: "1",
    building: "ENG3",
  },
  {
    id: randomUUID(),
    room: "201",
    floor: "2",
    building: "ENG3",
  },
  {
    id: randomUUID(),
    room: "301",
    floor: "3",
    building: "ENG3",
  },
];

const eventTags: EventTag[] = [
  {
    id: randomUUID(),
    name: "gaming",
  },
  {
    id: randomUUID(),
    name: "chilling",
  },
];

const events: Event[] = [
  {
    id: randomUUID(),
    name: "play a game",
    body: "Just play whatever game you want",
    startTime: new Date(2025, 3, 30, 6, 0, 0, 0),
    endTime: new Date(2025, 3, 30, 8, 0, 0, 0),
    intaniaLocationId: locations[0].id,
    tagsId: [eventTags[0].id, eventTags[1].id],
    picture: "",
  },
];

const workshopSlots: WorkshopSlot[] = [
  {
    id: randomUUID(),
    workshopId: workshopsId[0],
    startTime: new Date(1900, 3, 30, 6, 0, 0, 0),
    endTime: new Date(1910, 3, 30, 8, 0, 0, 0),
    currentRegistrantCount: 0,
    maxRegistrantCount: 50,
  },
  {
    id: randomUUID(),
    workshopId: workshopsId[0],
    startTime: new Date(2025, 3, 30, 6, 0, 0, 0),
    endTime: new Date(2025, 3, 30, 8, 0, 0, 0),
    currentRegistrantCount: 0,
    maxRegistrantCount: 50,
  },
  {
    id: randomUUID(),
    workshopId: workshopsId[0],
    startTime: new Date(2025, 3, 30, 12, 0, 0, 0),
    endTime: new Date(2025, 3, 30, 14, 0, 0, 0),
    currentRegistrantCount: 0,
    maxRegistrantCount: 50,
  },
  {
    id: randomUUID(),
    workshopId: workshopsId[1],
    startTime: new Date(2025, 3, 30, 10, 0, 0, 0),
    endTime: new Date(2025, 3, 30, 12, 0, 0, 0),
    currentRegistrantCount: 0,
    maxRegistrantCount: 50,
  },
  {
    id: randomUUID(),
    workshopId: workshopsId[1],
    startTime: new Date(2025, 3, 30, 14, 0, 0, 0),
    endTime: new Date(2025, 3, 30, 16, 0, 0, 0),
    currentRegistrantCount: 0,
    maxRegistrantCount: 50,
  },
];

const workshops: Workshop[] = [
  {
    id: workshopsId[0],
    name: "workshop1",
    slots: [],
    intaniaLocationId: locations[0].id,
  },
  {
    id: workshopsId[1],
    name: "workshop2",
    slots: [],
    intaniaLocationId: locations[1].id,
  },
];

const competitions: Competition[] = [
  {
    id: randomUUID(),
    name: "TOI18",
  },
  {
    id: randomUUID(),
    name: "TOI19",
  },
];

const majors: Major[] = [
  {
    id: randomUUID(),
    name: "CP",
    description: "What is CP?\n..........",
  },
  {
    id: randomUUID(),
    name: "CEDT",
    description: "CEDT description here",
  },
  {
    id: randomUUID(),
    name: "ICE",
    description: "ICE description here",
  },
];
