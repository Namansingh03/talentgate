"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { generateUsernameSuggestions } from "@/helpers/getUsernameSuggestions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";

const SetUsernameForm = () => {
  const { data: session, isPending } = authClient.useSession();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState<boolean>();

  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Unauthorized", { description: formatDate() });
      router.push("/signin");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session?.user) return;

    const displayName =
      session.user.name || session.user.email?.split("@")[0] || "";

    const loadSuggestions = async () => {
      try {
        const suggested = await generateUsernameSuggestions(displayName);
        setSuggestions(suggested);
      } catch (err) {
        console.log("Suggestion error:", err);
      }
    };

    loadSuggestions();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data: response, error } = await authClient.isUsernameAvailable({
        username,
      });

      if (response?.available) {
        const { error } = await authClient.updateUser({
          username,
        });

        if (error) {
          toast.error(
            error.message || "something went wrong while creating username ",
            { description: formatDate() },
          );
          setUsername("");
          return;
        }

        toast.success("Username created successfully", {
          description: formatDate(),
        });
        router.push("/setSkills");
      } else {
        setIsAvailable(false);
        toast.error(error?.message || "username not available", {
          description: formatDate(),
        });
      }

      console.log("Username set:", username);
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = username && !error;

  if (isPending || !session) return null;

  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">Talentgate</CardTitle>
        <CardDescription className="text-base">
          Choose your unique username
        </CardDescription>
      </CardHeader>

      <CardContent className="">
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="flex items-center justify-between"
          >
            Username
            {isAvailable ? (
              <span className="text-xs text-green-600">available</span>
            ) : (
              <span className="text-xs text-red-600">unavailable</span>
            )}
          </Label>
          <Input id="username" value={username} onChange={handleChange} />
        </div>

        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {suggestions.map((u) => (
              <p
                key={u}
                onClick={() => setUsername(u)}
                className="text-xs text-blue-700 cursor-pointer"
              >
                {u}
              </p>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-5">
          This will be your public identity.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Saving..." : "Continue"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SetUsernameForm;
