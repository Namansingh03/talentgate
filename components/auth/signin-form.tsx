"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInSchema } from "@/schemas/authSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import Socials from "./Socials";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SignInFormValues = z.infer<typeof SignInSchema>;

const ROLE_REDIRECT: Record<string, string> = {
  CANDIDATE: "/candidate/profile",
  EMPLOYER: "/dashboard",
  ADMIN: "/admin/panel",
};

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onResetPassword = () => {
    startTransition(async () => {
      const email = getValues("email");
      await authClient.requestPasswordReset({
        email,
        redirectTo: `/reset-password/${email}`,
      });
    });
  };

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => {
    startTransition(async () => {
      setServerError("");

      const { data: signInData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setServerError(error.message ?? "Something went wrong");
        return;
      }

      if (!signInData?.user) {
        setServerError("Invalid response from server");
        return;
      }

      toast.success("Signed in successfully", { description: formatDate() });

      const { user } = signInData;

      if (!user.username) return router.push("/setUsername");

      const redirect = ROLE_REDIRECT[user.role];
      if (redirect) router.push(redirect);
    });
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)}
      {...props}
    >
      {/* Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-foreground" />
          <span className="font-serif text-lg tracking-tight">Talentgate</span>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-serif font-medium tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={cn(errors.email && "border-destructive")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
              >
                Password
              </label>
              <button
                type="button"
                onClick={onResetPassword}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={cn(errors.password && "border-destructive")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Server error */}
          {serverError && (
            <p className="text-sm text-destructive text-center">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={isPending} className="w-full mt-1">
            {isPending ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              "Sign in"
            )}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            or continue with
            <div className="flex-1 h-px bg-border" />
          </div>

          <Socials />
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-foreground font-medium hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-xs px-6 text-white">
        By signing in you agree to our{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
