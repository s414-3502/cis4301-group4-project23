import { QueryHandler } from "./query_handler";

export const prepareOutputQ2 = async (query) => {
    const output = await QueryHandler(query)
    let X = [];
    let Y = [];

    let rows = output['rows'][0];
    for (let i = 0; i < output['metaData'].length; i = i + 3) {
        Y.push(rows[i + 1]);
        X.push(rows[i + 2]);
    }
    return [X,Y];
}