'use client'

import { Anchor, Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import Link from 'next/link'
import classes from './register.module.css'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useRegisterMutation from '@/modules/auth/queries/useRegisterMutation'

const registerSchema = z
    .object({
        fullName: z.string().min(1, 'Укажите имя'),
        email: z.email({ error: 'Некорректный email' }),
        password: z
            .string()
            .min(8, 'Пароль не короче 8 символов')
            .max(128)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Нужны строчная и заглавная буквы, цифра и символ из @$!%*?&',
            ),
        password_confirmation: z.string().min(8, 'Пароль не короче 8 символов'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Пароли не совпадают',
        path: ['password_confirmation'],
    })

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const { mutate } = useRegisterMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    })

    function submitForm(data: RegisterForm) {
        mutate(data)
    }

    return (
        <Container size={500} py={40} className={classes.container}>
            <Title ta="center">Добро пожаловать!</Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Уже есть аккаунт?{' '}
                <Anchor component={Link} href="/login" size="sm">
                    Войти
                </Anchor>
            </Text>

            <Paper withBorder shadow="sm" p={30} mt={30} radius="lg">
                <form onSubmit={handleSubmit(submitForm)}>
                    <TextInput
                        label="ФИО"
                        placeholder="Иван Иванов"
                        {...register('fullName')}
                        error={errors.fullName?.message}
                        required
                    />
                    <TextInput
                        mt={8}
                        label="Электронная почта"
                        placeholder="you@example.com"
                        {...register('email')}
                        error={errors.email?.message}
                        required
                    />
                    <PasswordInput
                        mt="md"
                        label="Пароль"
                        placeholder="Придумайте пароль"
                        {...register('password')}
                        error={errors.password?.message}
                        required
                    />
                    <PasswordInput
                        mt="md"
                        label="Пароль ещё раз"
                        placeholder="Повторите пароль"
                        {...register('password_confirmation')}
                        error={errors.password_confirmation?.message}
                        required
                    />
                    <Button type="submit" fullWidth mt="xl">
                        Зарегистрироваться
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}
