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
import { LoginSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
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
            <Button className="mt-4 w-full text-base" type="submit">
              Login
            </Button>
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
            Don't have an account?
          </Link>
        </small>
      </CardFooter>
    </Card>
  );
}
