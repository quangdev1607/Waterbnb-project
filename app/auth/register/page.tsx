"use client";
import { login } from "@/app/_actions/auth";
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
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
export default function RegisterPage() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
  };

  const [isCredential, setIsCredentials] = useState(false);

  return (
    <Card className="my-4 w-full max-w-md">
      <CardHeader className="flex flex-col items-center gap-2">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={60} height={60} />
        </Link>
        <CardTitle>Register form</CardTitle>
        <CardDescription>
          Fill out this form to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isCredential ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
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
              <FormField
                name="passwordConfirm"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button className="mt-4 w-full text-base" type="submit">
                Register
              </Button>
              {isCredential && (
                <span
                  onClick={() => {
                    setIsCredentials(false);
                    form.reset();
                  }}
                  className="cursor-pointer self-center underline hover:text-primary"
                >
                  Cancel
                </span>
              )}
            </form>
          </Form>
        ) : (
          <Button
            onClick={() => setIsCredentials(true)}
            variant={"outline"}
            className="flex w-full gap-x-2"
          >
            <Mail width={14} height={14} />
            Continue with credentials
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex-col justify-center">
        {!isCredential && (
          <>
            <Separator className="my-2" />
            <span className="text-black-500 mx-4 mb-2 ">or</span>
            <SocialAccounts />
            <Separator className="mt-4" />
          </>
        )}

        <small className="mt-2 italic hover:underline">
          <Link href={"/auth/login"} className="text-sm">
            Already have an account?
          </Link>
        </small>
      </CardFooter>
    </Card>
  );
}
