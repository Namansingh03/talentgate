"use client";

import React, { useState, useTransition } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";

const VerifyEmailForm = () => {
  const router = useRouter();
  const [stateError, setStatError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const rawEmail = Array.isArray(params?.email)
    ? params.email[0]
    : params?.email;
  const email = rawEmail ? decodeURIComponent(rawEmail) : "";

  const sendOtp = () => {
    startTransition(async () => {
      setStatError("");
      const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "email-verification",
      });

      if (!data?.success) {
        setStatError(
          error?.message || "Something went wrong while sending otp",
        );
      }

      toast.success("Verification otp sent successfully", {
        description: formatDate(),
      });

      router.push(`/verify-otp/${encodeURIComponent(email)}`);
    });
  };

  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Talentgate</CardTitle>
        <CardDescription className="text-base mt-2">
          Verification email sent successfully
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-center text-sm px-4 text-muted-foreground">
          A verification link has been sent to{" "}
          <span className="text-blue-600 font-medium">{email}</span>. Click on
          it to verify your account.
        </p>
      </CardContent>
      {stateError ?? (
        <CardDescription className="text-red-500">{stateError}</CardDescription>
      )}
      <CardFooter className="flex flex-col gap-3 text-center">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t get the email?
        </p>
        <Button className="w-full" onClick={sendOtp} disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Send OTP instead"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmailForm;
