import { addMinutes } from 'date-fns';
import { BookingService } from "../../src/packages/booking/booking.service";
import { BookingRepository } from "../../src/packages/booking/booking.repo";
import { prisma } from "../prisma";
import { BookingStatus } from '@prisma/client';

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);


describe('booking_rules', () => {
    it('should not accept invalid duration', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'test@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const place = await prisma.place.create({
            data: {
                name: 'test@vira.no',
                price_per_hour: 10,
                min_duration_minutes: 30,
            }
        })

        await expect(bookingService.createBooking(
            user!.id,
            place!.id,
            new Date(),
            10
        )).rejects.toThrow();
    })

    it('should accept valid duration', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'test@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const place = await prisma.place.create({
            data: {
                name: 'test@vira.no',
                price_per_hour: 10,
                min_duration_minutes: 30,
            }
        })

        await expect(bookingService.createBooking(
            user!.id,
            place!.id,
            new Date(),
            30
        )).resolves.not.toThrow();
    })

    test('that immediate booking status is ACTIVE', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'test@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const place = await prisma.place.create({
            data: {
                name: 'test@vira.no',
                price_per_hour: 10,
                min_duration_minutes: 30,
            }
        })

        const booking = await bookingService.createBooking(
            user!.id,
            place!.id,
            new Date(),
            30
        )

        expect(booking.status).toBe(BookingStatus.ACTIVE)
    })
    
    test('that upcoming booking status is INIITAL', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'test@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const place = await prisma.place.create({
            data: {
                name: 'test@vira.no',
                price_per_hour: 10,
                min_duration_minutes: 30,
            }
        })

        const booking = await bookingService.createBooking(
            user!.id,
            place!.id,
            addMinutes(new Date(), 20),
            30
        )

        expect(booking.status).toBe(BookingStatus.INITIAL)
    })

    test('two users can book same place with 2 different time ranges', async () => {
        const john = await prisma.user.create({
            data: {
                email: 'john@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const doe = await prisma.user.create({
            data: {
                email: 'doe@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const place = await prisma.place.create({
            data: {
                name: 'test@vira.no',
                price_per_hour: 10,
                min_duration_minutes: 30,
            }
        })

        const john_booking = bookingService.createBooking(
            john.id, place.id, new Date(), 30
        )

        const doe_booking = bookingService.createBooking(
            doe.id, place.id, addMinutes(new Date(), 30), 30
        )

        expect(john_booking).resolves.not.toThrow();
        expect(doe_booking).resolves.not.toThrow();
    })


    test('cannot cancel active booking', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'test@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const place = await prisma.place.create({
            data: {
                name: 'test@vira.no',
                price_per_hour: 10,
                min_duration_minutes: 30,
            }
        })

        const booking = await bookingService.createBooking(
            user!.id,
            place!.id,
            new Date(),
            30
        )

        const cancel = bookingService.cancelBooking(booking.id)

        expect(cancel).rejects.toThrow();
    })
    
    test('can cancel booking before it is started', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'test@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const place = await prisma.place.create({
            data: {
                name: 'test@vira.no',
                price_per_hour: 10,
                min_duration_minutes: 30,
            }
        })

        const booking = await bookingService.createBooking(
            user!.id,
            place!.id,
            addMinutes(new Date(), 20),
            30
        )

        const cancel = bookingService.cancelBooking(booking.id)

        expect(cancel).resolves.not.toThrow();
    })


    test('that booking expires on time', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'test@vira.no',
                name: 'Test User',
                password: 'test',
            }
        })

        const place = await prisma.place.create({
            data: {
                name: 'test@vira.no',
                price_per_hour: 10,
                min_duration_minutes: 1,
            }
        })

        const booking = await bookingService.createBooking(
            user!.id,
            place!.id,
            new Date(),
            1
        )


        expect(booking.status).toBe(BookingStatus.ACTIVE)
    })
})