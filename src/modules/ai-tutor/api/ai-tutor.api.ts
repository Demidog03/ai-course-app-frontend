import { apiPrivate } from "@/shared/lib/api-private"
import { AskAIBody, AskAIResponse } from "./ai-tutor.api.types"

async function askAI(body: AskAIBody): Promise<AskAIResponse> {
    const response = await apiPrivate.post<AskAIResponse>('/ai-tutors/ask', body)
    return response.data
}

const aiTutorApi = {
    askAI
}

export default aiTutorApi