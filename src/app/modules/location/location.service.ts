import { QueryBuilder } from "../../utils/queryBuilder";
import { Area, District, Division } from "./location.model";

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

const getAllAreas = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Area.find(), query);

    const areas = await queryBuilder 
        .filter()
        .search([])
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        areas.build(),
        areas.getMeta(),
    ])

    return { data, meta };
}

const getAllDistrict = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(District.find(), query);

    const districts = await queryBuilder
        .filter()
        .search([])
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        districts.build(),
        districts.getMeta(),
    ]);

    return { data, meta };
}

export const LocationServices = {
    getAllDivisions,
    getAllAreas,
    getAllDistrict
}