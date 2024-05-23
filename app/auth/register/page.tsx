"use client";
import { signup } from "@/app/_actions/auth";
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
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { wait } from "@/utils/wait";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader2Icon, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
export default function RegisterPage() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      signup(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
          if (data.error) toast.error(`Error: ${data.error}`);
          if (data.success)
            toast.success(
              `🎉🎉🎉 ${data.success}, you will soon be back to homepage`,
              { duration: 2000 },
            );
        })
        .finally(async () => {
          await wait(2000);
          router.push("/");
        });
    });
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
              <FormError message={error} />
              {isPending ? (
                <Button disabled type="submit" size={"lg"}>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <>
                  {success ? (
                    <Button
                      disabled
                      className="mt-2 w-full bg-primary text-base"
                    >
                      <span className="flex items-center gap-1">
                        <CheckIcon /> {success}
                      </span>
                    </Button>
                  ) : (
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="mt-2 w-full text-base"
                    >
                      Register
                    </Button>
                  )}
                </>
              )}

              {/* {success ? (
                <Button disabled className="mt-2 w-full bg-primary text-base">
                  
                  <span className="flex items-center gap-1">
                    <CheckIcon /> {success}
                  </span>
                </Button>
              ) : (
                <Button
                  disabled={isPending}
                  type="submit"
                  className="mt-2 w-full text-base"
                >
                  Register
                </Button>
              )} */}
              {isCredential && (
                <span
                  onClick={() => {
                    setIsCredentials(false);
                    setSuccess("");
                    setError("");
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
