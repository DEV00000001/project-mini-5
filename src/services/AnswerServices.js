import { get, post } from "../utils/request";
export const getListAnswer = async (id) => {
  const result = await get(`answers?userId=${id}`);
  return result;
}
export const getAnswer = async (id) => {
  const result = await get(`answers/${id}`);
  return result;
}
export const submitAnswer = async (data) => {
    const result = await post("answers",data);
    return result;
}