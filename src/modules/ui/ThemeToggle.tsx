'use client'

import {
    ActionIcon,
    Menu,
    Tooltip,
    useComputedColorScheme,
    useMantineColorScheme,
} from '@mantine/core'
import { IconCheck, IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const computed = useComputedColorScheme('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // На сервере и при первом рендере на клиенте нет localStorage / системной темы как в браузере —
    // иконка зависит от темы → легко получить рассинхрон гидрации. До mount показываем стабильную.
    const TriggerIcon = !mounted
        ? IconDeviceDesktop
        : colorScheme === 'auto'
          ? IconDeviceDesktop
          : computed === 'dark'
            ? IconMoon
            : IconSun

    return (
        <Menu position="bottom-end" shadow="md" width={220}>
            <Menu.Target>
                <Tooltip label="Тема оформления" withArrow>
                    <ActionIcon variant="default" size="lg" radius="xl" aria-label="Выбор темы">
                        <TriggerIcon size={20} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Тема</Menu.Label>
                <Menu.Item
                    leftSection={<IconSun size={16} stroke={1.5} />}
                    rightSection={
                        colorScheme === 'light' ? <IconCheck size={14} /> : null
                    }
                    onClick={() => setColorScheme('light')}
                >
                    Светлая
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconMoon size={16} stroke={1.5} />}
                    rightSection={colorScheme === 'dark' ? <IconCheck size={14} /> : null}
                    onClick={() => setColorScheme('dark')}
                >
                    Тёмная
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconDeviceDesktop size={16} stroke={1.5} />}
                    rightSection={colorScheme === 'auto' ? <IconCheck size={14} /> : null}
                    onClick={() => setColorScheme('auto')}
                >
                    Как в системе
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
