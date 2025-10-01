import { useForm } from "react-hook-form";
import { useRegister } from "./hooks/useRegister";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerSchema } from "./zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@radix-ui/react-separator";

type FormData = {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  city: string;
};

export const Register = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      city: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        navigate("/login");
      },
      onError: (error: any) => {
        const errors = error.response?.data;
        console.log(error.response?.data);
        Object.entries(errors).forEach(([field, message]) => {
          form.setError(field as any, { message: message as string });
        });
      },
    });
  };

  return (
    <>
      <Card className="w-1/4 mx-auto mt-10 space-y-5 min-w-[200px]">
        <CardHeader>
          <CardTitle className="text-center">Blablabla cos tu bedzie</CardTitle>
        </CardHeader>

        <CardContent className="w-3/4 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>

        <Separator className="bg-pink-200 h-px w-2/3 mx-auto" />
        <CardFooter className="justify-center text-sm">
          Have an account already?
          <Link to="/login" className="ml-1 text-pink-800 hover:underline">
            Log in
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
