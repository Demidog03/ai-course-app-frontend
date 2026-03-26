import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'
import { ColorSchemeScript } from '@mantine/core'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Providers from './provider'
import { MantineProviders } from './mantine-providers'
import { Notifications } from '@mantine/notifications'
import './globals.css'

export const metadata = {
    title: 'Курсы ИИ — образовательная платформа',
    description: 'Онлайн-курсы и обучение',
}

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-plus-jakarta',
    display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={plusJakarta.variable} suppressHydrationWarning>
            <head>
                <ColorSchemeScript defaultColorScheme="auto" />
            </head>
            <body>
                <MantineProviders>
                    <Notifications position="top-right" zIndex={1000} />
                    <Providers>{children}</Providers>
                </MantineProviders>
            </body>
        </html>
    )
}
