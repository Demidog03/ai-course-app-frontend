'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Фабрика для создания клиента
function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
                retry: 0,
            },
        },
    })
}

// Переменная для хранения клиента в браузере
let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (typeof window === 'undefined') {
        // На сервере (SSR) всегда создаем НОВЫЙ клиент для каждого запроса,
        // чтобы данные разных пользователей не перемешались.
        return makeQueryClient()
    } else {
        // В браузере создаем клиент только один раз
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

export default function Providers({ children }: { children: React.ReactNode }) {
    // Получаем инстанс QueryClient
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Devtools помогут отлаживать кэш. Они автоматически вырезаются в production-сборке */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}