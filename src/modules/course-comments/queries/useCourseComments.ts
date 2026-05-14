import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import courseCommentsApi from "@/modules/course-comments/api/course-comments.api";

export const useCourseComments = (courseId: number) => {
    const queryClient = useQueryClient()
    const queryKey = ['comments', courseId]

    const {data: comments = [], isLoading, isError} = useQuery({
        queryKey,
        queryFn: () => courseCommentsApi.getCourseComments(courseId),
    })

    const createMutation = useMutation({
        mutationFn: (content: string) => courseCommentsApi.createCourseComment(courseId, {content}),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey})
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({commentId, content}: { commentId: number; content: string }) =>
            courseCommentsApi.updateCourseComment(courseId, commentId, {content}),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey})
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (commentId: number) => courseCommentsApi.deleteCourseComment(courseId, commentId),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey})
        }
    })

    return {
        comments,
        isLoading,
        isError,
        createComment: createMutation.mutateAsync,
        updateComment: updateMutation.mutateAsync,
        deleteComment: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: createMutation.isPending,
        isDeleting: deleteMutation.isPending,
    }
}