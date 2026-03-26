'use client'

import { AppShell, Avatar, Box, Group, Menu, Text, UnstyledButton } from '@mantine/core'
import { ReactNode } from 'react'
import classes from './sidebar-wrappers.module.css'
import {
    IconActivity,
    IconCertificate,
    IconDoorExit,
    IconHelp,
    IconMessageQuestion,
    IconSchoolFilled,
} from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import useGetMeQuery from '@/modules/users/queries/useGetMeQuery'
import useLogoutMutation from '@/modules/auth/queries/useLogoutMutation'
import { ThemeToggle } from '@/modules/ui/ThemeToggle'

type NavItem = {
    icon: typeof IconSchoolFilled
    label: string
    route?: string
}

const navItems: NavItem[] = [
    { icon: IconSchoolFilled, label: 'Курсы', route: '/courses' },
    { icon: IconCertificate, label: 'Мои курсы', route: '/my-courses' },
    { icon: IconActivity, label: 'Активность' },
    { icon: IconHelp, label: 'Помощь', route: '/help' },
    { icon: IconMessageQuestion, label: 'Вопросы' },
]

function WithSidebarWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const { data: profile } = useGetMeQuery()
    const { mutate: logout } = useLogoutMutation()

    function openLink(route: string | undefined) {
        if (route) {
            router.push(route)
        }
    }

    const avatarInitials = profile?.fullName.split(' ').map((p) => p[0]).join('')

    return (
        <AppShell padding="md" header={{ height: 60 }}>
            <AppShell.Header className={classes.header}>
                <Link href="/courses" className={classes.siteBrand}>
                    <Text component="span" display="block" fw={700} size="lg" lh={1.15}>
                        Курсы ИИ
                    </Text>
                    <Text component="span" display="block" size="xs" c="dimmed" lh={1.15} mt={2}>
                        Образовательная платформа
                    </Text>
                </Link>

                <Group gap="sm" wrap="nowrap">
                    <ThemeToggle />
                    <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Avatar style={{ cursor: 'pointer' }} color="brand" radius="xl">
                            {avatarInitials}
                        </Avatar>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            color="red"
                            leftSection={<IconDoorExit size={14} />}
                            onClick={() => logout()}
                        >
                            Выйти
                        </Menu.Item>
                    </Menu.Dropdown>
                    </Menu>
                </Group>
            </AppShell.Header>

            <AppShell.Main className={classes.mainWithFloatingBar}>{children}</AppShell.Main>

            <div className={classes.floatingBarWrap} role="navigation" aria-label="Основная навигация">
                <Box className={classes.floatingBar}>
                    {navItems.map((item) => {
                        const active =
                            item.route != null && pathname.startsWith(item.route)
                        return (
                            <UnstyledButton
                                key={item.label}
                                className={classes.floatingTab}
                                data-active={active || undefined}
                                disabled={!item.route}
                                onClick={() => openLink(item.route)}
                            >
                                <item.icon
                                    size={22}
                                    stroke={1.5}
                                    className={classes.floatingTabIcon}
                                />
                                <Text size="xs" fw={500} className={classes.floatingTabLabel}>
                                    {item.label}
                                </Text>
                            </UnstyledButton>
                        )
                    })}
                </Box>
            </div>
        </AppShell>
    )
}

export default WithSidebarWrapper
