// src/realtime/events.ts

export const RealtimeEvents = {
    BOOKING: {
        CREATED: "booking.created",
        EXTENDED: "booking.extended",
    },
    PLACE: {
        CREATED: "place.created",
        UPDATED: "place.updated",
        DELETED: "place.deleted",
    },
    AVAILABILITY: {
        UPDATED: "availability.updated",
    },
};


export const SOCKET_EVENTS = RealtimeEvents;
