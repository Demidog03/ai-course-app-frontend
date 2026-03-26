import { createTheme, type MantineColorsTuple } from '@mantine/core'

/** Кофейная палитра: крем, карамель, обжарка, эспрессо */
const brand: MantineColorsTuple = [
    '#faf7f3',
    '#f0e8df',
    '#e2d4c5',
    '#cdb79f',
    '#b08f6e',
    '#8f6a47',
    '#6b4a32',
    '#4d3525',
    '#35241a',
    '#1a120d',
]

/** Мёд и карамель — тёплый второй акцент для градиентов и бейджей */
const caramel: MantineColorsTuple = [
    '#fffbf7',
    '#fff4e8',
    '#ffe8d1',
    '#ffd4a8',
    '#f0b575',
    '#d4944a',
    '#b0782f',
    '#8a5f28',
    '#5c3f1a',
    '#3d2a12',
]

export const appTheme = createTheme({
    primaryColor: 'brand',
    colors: {
        brand,
        caramel,
    },
    primaryShade: { light: 6, dark: 5 },
    /** Мягче, «как в уютной кофейне» */
    defaultRadius: 'lg',
    cursorType: 'pointer',
    fontFamily:
        'var(--font-plus-jakarta, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
    headings: {
        fontWeight: '600',
        fontFamily:
            'var(--font-plus-jakarta, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
    },
    /** Тёплая «бумага» вместо холодного белого */
    white: '#fffdf9',
    /** Тёплый почти-чёрный для тёмной темы */
    black: '#0f0c0a',
    defaultGradient: {
        from: 'brand.5',
        to: 'caramel.4',
        deg: 128,
    },
})
