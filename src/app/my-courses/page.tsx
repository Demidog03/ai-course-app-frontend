'use client'

import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import useGetMyCoursesQuery from "@/modules/courses/queries/useGetMyCoursesQuery";
import {Center, Loader} from "@mantine/core";
import classes from "@/app/page.module.css";
import CourseCard from "@/modules/courses/ui/CourseCard";

function Page() {
    const { isLoading, data: coursesData } = useGetMyCoursesQuery()

    const courses = coursesData?.courses || []

    return (
        <UserProfileWrapper>
            <WithSidebarWrapper>
                <h1 className={classes.pageTitle}>Мои курсы</h1>
                {isLoading && (
                    <Center h="70vh">
                        <Loader color="brand" type="dots" />
                    </Center>
                )}
                {!isLoading && courses?.length < 1 && (
                    <Center h="70vh">
                        <h2>Курсов пока нет</h2>
                    </Center>
                )}
                {!isLoading && courses?.length > 0 && (
                    <div className={classes.coursesGrid}>
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course}/>
                        ))}
                    </div>
                )}
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}

export default Page;
