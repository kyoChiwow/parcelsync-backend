import { QueryBuilder } from "../../utils/queryBuilder";
import { Division } from "./location.model";

const getAllDivisions = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Division.find(), query);

    const divisions = await queryBuilder
        .filter()
        .search([])
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        divisions.build(),
        divisions.getMeta(),
    ]);

    return { data, meta };
}

export const LocationServices = {
    getAllDivisions
}