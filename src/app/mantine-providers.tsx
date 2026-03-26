'use client'

import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core'
import { appTheme } from '@/theme/mantine-theme'

const colorSchemeManager = localStorageColorSchemeManager({
    key: 'mantine-color-scheme-value',
})

export function MantineProviders({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider
            theme={appTheme}
            defaultColorScheme="auto"
            colorSchemeManager={colorSchemeManager}
        >
            {children}
        </MantineProvider>
    )
}
