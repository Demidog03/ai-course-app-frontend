import {useCourseComments} from '../queries/useCourseComments'
import CourseCommentForm from './components/CourseCommentForm';
import React from "react";
import CourseCommentItem from './components/CourseCommentItem';

export default function CourseCommentCard({courseId}: { courseId: number }) {
    const {
        comments,
        isLoading,
        isError,
        createComment,
        updateComment,
        deleteComment,
        isCreating
    } = useCourseComments(courseId)

    if (isLoading) return <div>Загрузка комментариев...</div>

    if (isError) return <div>Не удалось загрузить комментарии</div>

    return (
        <>
            <CourseCommentForm onSubmit={createComment} isPending={isCreating}/>
            {comments.length > 0 ? (
                [...comments].map((comment) => (
                    <CourseCommentItem
                        key={comment.id}
                        comment={comment}
                        onUpdate={(content) =>
                            updateComment({commentId: comment.id, content})
                        }
                        onDelete={() => deleteComment(comment.id)}
                    />
                ))
            ) : (
                <p>Пока нет комментариев. Будьте первым!</p>
            )
            }
        </>
    )
}