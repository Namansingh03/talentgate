"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/schemas/authSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [serverError, setServerError] = useState("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  if (!token) {
    toast.error("Token not found", { description: formatDate() });
    router.push("/signin");
    return null;
  }

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (data) => {
    startTransition(async () => {
      setServerError("");

      const { error } = await authClient.resetPassword({
        newPassword: data.newPassword,
        token,
      });

      if (error) {
        setServerError(error.message ?? "Something went wrong");
        return;
      }

      toast.success("Password reset successfully", {
        description: formatDate(),
      });
      router.push("/signin");
    });
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)}
      {...props}
    >
      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-foreground" />
          <span className="font-serif text-lg tracking-tight">Talentgate</span>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-serif font-medium tracking-tight">
            Reset password
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create a new secure password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="newPassword"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              New password
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              {...register("newPassword")}
              className={cn(errors.newPassword && "border-destructive")}
            />
            {errors.newPassword && (
              <p className="text-xs text-destructive">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={cn(errors.confirmPassword && "border-destructive")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-destructive text-center">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={isPending} className="w-full mt-1">
            {isPending ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              "Reset password"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Remember it?{" "}
          <Link
            href="/signin"
            className="text-foreground font-medium hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
