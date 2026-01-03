import { prisma } from "./prisma";

beforeEach(async () => {
    await prisma.bookingExtension.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.place.deleteMany({});
    await prisma.region.deleteMany({});
});

afterAll(async () => {
    await prisma.$disconnect();
});
