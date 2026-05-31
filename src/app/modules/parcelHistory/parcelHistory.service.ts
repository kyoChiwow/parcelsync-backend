import { ParcelHistory } from "./parcelHistory.model";

const getSingleParcelhistoryService = (parcelId: string) => {
    return ParcelHistory.findOne({ parcelId });
}

export const ParcelHistoryServices = {
    getSingleParcelhistoryService
}