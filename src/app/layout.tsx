import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import {MantineProvider, ColorSchemeScript, createTheme} from '@mantine/core'
import Providers from './provider'
import {Notifications} from "@mantine/notifications";

export const metadata = {
    title: 'My Adonis + Next App',
    description: 'Production ready stack',
}

const theme = createTheme({
    cursorType: 'pointer',
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru" suppressHydrationWarning>
        <head>
            <ColorSchemeScript />
        </head>
        <body>
        <MantineProvider defaultColorScheme="light" theme={theme}>
            <Notifications position="top-right" zIndex={1000} />
            <Providers>
                {children}
            </Providers>
        </MantineProvider>
        </body>
        </html>
    )
}