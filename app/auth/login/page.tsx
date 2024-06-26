"use client";
import { login, signup } from "@/app/_actions/auth";
import { FormError } from "@/app/_components/FormError";
import { SocialAccounts } from "@/app/_components/SocialAccounts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import logo from "@/public/mobilewaterbnblogo.png";
import { LoginSchema } from "@/schemas/LoginSchema";
import { wait } from "@/utils/wait";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      login(values).then((data) => {
        setError(data?.error);
        if (data?.error) toast.error(`Error: ${data.error}`);
      });
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center gap-2">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={60} height={60} />
        </Link>
        <CardTitle>Login form</CardTitle>
        <CardDescription>
          Fill out this form to get access to our content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormError message={error} />
            {isPending ? (
              <Button disabled type="submit" size={"lg"}>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" size={"lg"}>
                Login
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col justify-center">
        <Separator className="my-2" />
        <span className="text-black-500 mx-4 mb-2 ">or</span>
        <SocialAccounts />
        <Separator className="mt-4" />
        <small className="mt-2 italic hover:underline">
          <Link href={"/auth/register"} className="text-sm">
            Dont have an account?
          </Link>
        </small>
      </CardFooter>
    </Card>
  );
}
