import { get } from "../utils/request";

export const getTopic = async () => {
    const result = await get("topics");
    return result;
}
export const getNameTopic = async (id) => {
    const result = await get(`topics?id=${id}`);
    return result;
}
export const getQuestion = async (id) => {
    const result = await get(`questions?topicId=${id}` );
    return result;
}

