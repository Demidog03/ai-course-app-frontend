'use client'

import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import useGetCoursesQuery from "@/modules/courses/queries/useGetCoursesQuery";
import CourseCard from "@/modules/courses/ui/CourseCard";
import classes from "../page.module.css";
import {Center, Loader} from "@mantine/core";

function CoursesPage() {
    const { data: coursesData, isLoading } = useGetCoursesQuery()

    const courses = coursesData?.courses || []

    if (isLoading) {
        return (
            <UserProfileWrapper>
                <WithSidebarWrapper>
                    <Center h="70vh">
                        <Loader color="blue" type="dots" />
                    </Center>
                </WithSidebarWrapper>
            </UserProfileWrapper>
        );
    }

    return (
        <UserProfileWrapper>
            <WithSidebarWrapper>
                <div className={classes.coursesGrid}>
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course}/>
                    ))}
                </div>
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}

export default CoursesPage;