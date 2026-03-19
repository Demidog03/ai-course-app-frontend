'use client'

import {useDisclosure} from "@mantine/hooks";
import {AppShell, Avatar, Burger, NavLink} from "@mantine/core";
import {ReactNode} from "react";
import classes from "./sidebar-wrappers.module.css";
import {IconCertificate, IconHome2, IconSchoolFilled} from "@tabler/icons-react";
import {usePathname, useRouter} from "next/navigation";
import useGetMeQuery from "@/modules/users/queries/useGetMeQuery";

const topLinksData = [
    {
        icon: IconSchoolFilled,
        label: 'Courses',
        route: '/courses'
    },
    {
        icon: IconCertificate,
        label: 'My Courses',
        route: '/my-courses'
    },
    {
        icon: IconHome2,
        label: 'Activity'
    },
];

const bottomLinksData = [
    {
        icon: IconHome2,
        label: 'Help',
        route: '/help'
    },
    {
        icon: IconHome2,
        label: 'Questions',
        route: '/questions'
    },
];

function WithSidebarWrapper({ children }: { children: ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const pathname = usePathname()
    const router = useRouter()
    const { data: profile } = useGetMeQuery()

    function openLink(route: string | undefined) {
        if (route) {
            router.push(route)
        }
    }

    const avatarInitials = profile?.fullName.split(' ').map(p => p[0]).join('')

    const topLinks = topLinksData.map((item) => (
        <NavLink
            key={item.label}
            active={pathname.startsWith(item.route || '___NOT_FOUND___')}
            label={item.label}
            leftSection={<item.icon size={16} stroke={1.5} />}
            onClick={() => openLink(item.route)}
        />
    ));

    const bottomLinks = bottomLinksData.map((item) => (
        <NavLink
            key={item.label}
            active={pathname.startsWith(item.route || '___NOT_FOUND___')}
            label={item.label}
            leftSection={<item.icon size={16} stroke={1.5} />}
            onClick={() => openLink(item.route)}
        />
    ));


    return (
        <AppShell
            padding="md"
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header className={classes.header}>
                <div className={classes.headerLeft}>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />

                    <img src="/logo.png" alt="logo"/>
                </div>

                <Avatar color="cyan" radius="xl">{avatarInitials}</Avatar>
            </AppShell.Header>

            <AppShell.Navbar className={classes.sidebar}>
                <div>
                    {topLinks}
                </div>
                <div>
                    {bottomLinks}
                </div>
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}

export default WithSidebarWrapper;
