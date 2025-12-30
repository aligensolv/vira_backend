"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toManagerDTO = toManagerDTO;
// Transform DB result to DTO
function toManagerDTO(entity) {
    return {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
    };
}
