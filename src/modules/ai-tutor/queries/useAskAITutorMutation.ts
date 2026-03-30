import { useMutation } from "@tanstack/react-query";
import aiTutorApi from "../api/ai-tutor.api";
import { AskAIBody } from "../api/ai-tutor.api.types";
import { AI_TUTOR_QUERY_KEYS } from "./ai-tutor.query.types";

export default function useAskAITutorMutation() {
    return useMutation({
        mutationKey: AI_TUTOR_QUERY_KEYS.askAI(),
        mutationFn: (body: AskAIBody) => aiTutorApi.askAI(body),
    })
}