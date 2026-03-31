"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/schemas/authSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import React, { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { useRouter, useSearchParams } from "next/navigation";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [stateError, setStateError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const params = useSearchParams();
  const token = params.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  if (!token) {
    toast.error("Token not found", { description: formatDate() });
    return;
  }

  const onSubmit: SubmitHandler<z.infer<typeof ResetPasswordSchema>> = (
    data,
  ) => {
    startTransition(async () => {
      setStateError("");
      const { error: resetPassError } = await authClient.resetPassword({
        newPassword: data.newPassword,
        token,
      });

      if (resetPassError) {
        toast.error(resetPassError.message, { description: formatDate() });
      }

      router.push("/signin");
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-balance text-muted-foreground">
                  Create a new password
                </p>
              </div>
              <Field data-invalid={!!errors.newPassword}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                </div>
                <Input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  required
                />
                <FieldError errors={[errors.newPassword]} />
              </Field>
              <Field data-invalid={!!errors.confirmPassword}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  required
                />
                <FieldError errors={[errors.confirmPassword]} />
              </Field>
              <FieldError>{stateError}</FieldError>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : "reset"}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/signup">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
