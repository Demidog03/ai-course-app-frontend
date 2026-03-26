import { ThemeToggle } from '@/modules/ui/ThemeToggle'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 200,
                }}
            >
                <ThemeToggle />
            </div>
            {children}
        </>
    )
}
