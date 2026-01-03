"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDTO = toUserDTO;
function toUserDTO(entity) {
    return {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        role: entity.role,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
    };
}
