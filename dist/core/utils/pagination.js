"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationMeta = exports.calculateOffset = exports.validatePaginationParams = exports.MAX_PAGE_SIZE = exports.DEFAULT_PAGE_SIZE = void 0;
exports.DEFAULT_PAGE_SIZE = 10;
exports.MAX_PAGE_SIZE = 100;
const validatePaginationParams = (params) => {
    const page = Math.max(1, Math.floor(params.page || 1));
    const page_size = Math.min(exports.MAX_PAGE_SIZE, Math.max(1, Math.floor(params.page_size || exports.DEFAULT_PAGE_SIZE)));
    return { page, page_size };
};
exports.validatePaginationParams = validatePaginationParams;
const calculateOffset = (page, page_size) => {
    return (page - 1) * page_size;
};
exports.calculateOffset = calculateOffset;
const createPaginationMeta = (data, params) => {
    const { page, page_size, total_count } = params;
    const page_count = Math.ceil(total_count / page_size);
    const offset = (0, exports.calculateOffset)(page, page_size);
    return {
        data,
        pagination: {
            page,
            page_size,
            total_count,
            page_count,
            has_previous: page > 1,
            has_next: page < page_count,
            offset
        }
    };
};
exports.createPaginationMeta = createPaginationMeta;
