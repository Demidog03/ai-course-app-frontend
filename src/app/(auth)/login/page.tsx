'use client'

import { Anchor, Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import Link from 'next/link'
import classes from './login.module.css'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useLoginMutation from '@/modules/auth/queries/useLoginMutation'

const loginSchema = z.object({
    email: z.email({ error: 'Некорректный email' }),
    password: z.string().min(8, 'Пароль не короче 8 символов'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
    const { mutate } = useLoginMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    })

    function submitForm(data: LoginForm) {
        mutate(data)
    }

    return (
        <Container size={500} py={40} className={classes.container}>
            <Title ta="center">С возвращением!</Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Нет аккаунта?{' '}
                <Anchor component={Link} href="/register" size="sm">
                    Зарегистрироваться
                </Anchor>
            </Text>

            <Paper withBorder shadow="sm" p={30} mt={30} radius="lg">
                <form onSubmit={handleSubmit(submitForm)}>
                    <TextInput
                        label="Электронная почта"
                        placeholder="you@example.com"
                        {...register('email')}
                        error={errors.email?.message}
                        required
                    />
                    <PasswordInput
                        mt="md"
                        label="Пароль"
                        placeholder="Введите пароль"
                        {...register('password')}
                        error={errors.password?.message}
                        required
                    />
                    <Button type="submit" fullWidth mt="xl">
                        Войти
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}
