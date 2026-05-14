"use client";

import React from "react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Socials() {
  const handleClick = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      newUserCallbackURL: "/setUsername",
      callbackURL: "/redirect",
    });
  };

  return (
    <Field>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={() => handleClick("google")}
          className="w-full flex items-center justify-center gap-2"
        >
          <FaGoogle />
          Google
        </Button>

        <Button
          variant="outline"
          type="button"
          onClick={() => handleClick("github")}
          className="w-full flex items-center justify-center gap-2"
        >
          <FaGithub />
          GitHub
        </Button>
      </div>
    </Field>
  );
}
