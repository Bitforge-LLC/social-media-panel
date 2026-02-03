"use client";

import { Button, Container, Input, Link, Text } from "@Bitforge-LLC/ui";
import { signIn } from "next-auth/react";
import { type FormEvent, useCallback } from "react";
import { useForm } from "react-hook-form";

import { env } from "@/env";

type FormValues = {
  email: string;
};

const Page = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>();

  const onSubmit = useCallback(async (data: FormValues): Promise<void> => {
    const { email } = data;

    const result = await signIn("forwardemail", {
      callbackUrl: "/",
      email,
      redirect: false,
    });

    // Development-only logging
    if (env.NODE_ENV === "development") {
      console.warn("Auth result:", result);
    }
  }, []);

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      void handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit]
  );

  return (
    <Container className="h-full max-h-[500px] justify-evenly gap-6">
      <Text size="xl" className="font-semibold">
        Login to {env.NEXT_PUBLIC_PROJECT_NAME}
      </Text>
      <Text size="lg">Login to start using {env.NEXT_PUBLIC_PROJECT_NAME}</Text>
      <Container as="form" onSubmit={handleFormSubmit} className="hug gap-6">
        <Input
          label="Email"
          labelPlacement="outside"
          placeholder="Email"
          type="email"
          {...register("email", {
            pattern: {
              message: "Invalid email address",
              value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
            },
            required: "Email is required",
          })}
        />
        {errors.email && (
          <Text size="sm" className="text-red-500">
            {errors.email.message}
          </Text>
        )}

        <Button type="submit" isLoading={isSubmitting} className="">
          Login
        </Button>
      </Container>
      <Text>
        Dont have an account? <Link href="/signup">Sign up</Link>
      </Text>
    </Container>
  );
};

export default Page;
