'use client'

import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import useGetCoursesQuery from "@/modules/courses/queries/useGetCoursesQuery";
import CourseCard from "@/modules/courses/ui/CourseCard";
import {SimpleGrid} from "@mantine/core";

function CoursesPage() {
    const { data: coursesData } = useGetCoursesQuery()

    const courses = coursesData?.courses || []

    return (
        <UserProfileWrapper>
            <WithSidebarWrapper>
                <SimpleGrid
                    cols={{ base: 1, sm: 1, md: 2, lg: 3 }}
                    spacing={{ base: 10, sm: 'xl' }}
                    verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course}/>
                    ))}
                </SimpleGrid>
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}

export default CoursesPage;