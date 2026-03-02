'use client'

import {Anchor, Button, Container, Paper, PasswordInput, Text, TextInput, Title} from "@mantine/core";
import Link from "next/link";
import classes from "./register.module.css";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useRegisterMutation from "@/modules/auth/queries/useRegisterMutation";

const registerSchema = z.object({
    fullName: z.string(),
    email: z.email(),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(128)
        // Требуем как минимум: 1 строчную, 1 заглавную, 1 цифру и 1 спецсимвол
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    password_confirmation: z
        .string()
        .min(8, 'Password must be at least 8 characters')
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const { mutate } = useRegisterMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    })

    function submitForm(data: RegisterForm) {
        mutate(data)
    }

    return (
        <Container size={500} py={40} className={classes.container}>
            <Title ta="center">Welcome!</Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor component={Link} href="/login" size="sm">
                    Login
                </Anchor>
            </Text>

            <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
                <form onSubmit={handleSubmit(submitForm)}>
                    <TextInput
                        label="Full Name"
                        placeholder="Ivan Ivanov"
                        {...register('fullName')}
                        error={errors.fullName?.message}
                        required
                    />
                    <TextInput
                        mt={8}
                        label="Email"
                        placeholder="user@example.com"
                        {...register('email')}
                        error={errors.email?.message}
                        required
                    />
                    <PasswordInput
                        mt="md"
                        label="Password"
                        placeholder="Your password"
                        {...register('password')}
                        error={errors.password?.message}
                        required
                    />
                    <PasswordInput
                        mt="md"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        {...register('password_confirmation')}
                        error={errors.password_confirmation?.message}
                        required
                    />
                    <Button type="submit" fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}