import OpenAI from "openai";

const apiKey = process.env.KKU_INTELSPHERE_API_KEY || "dummy-key";
const baseURL = process.env.KKU_INTELSPHERE_BASE_URL || "https://intelsphere.kku.ac.th/v1";

export const intelSphereClient = new OpenAI({
  apiKey,
  baseURL,
  timeout: 30000,
});

export const INTELSPHERE_MODEL = process.env.KKU_INTELSPHERE_MODEL || "llama-3.3-70b-instruct";
