import { useLogin } from "./hooks/useAuthenticate";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import type { AuthResponse } from "./types/AuthResponse";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { loginSchema } from "./zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
type FormData = {
  username: string;
  password: string;
};

export const Login = () => {
  const { loginMutation, error, isSuccess, isError } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response: AuthResponse) => {
        localStorage.setItem("token", response.token);
        form.reset();
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

  if (isSuccess === true) {
    return <Navigate to="/" />;
  }

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
                Log in
              </Button>
            </form>
          </Form>
        </CardContent>
        <Separator className="bg-pink-200 h-px w-2/3 mx-auto" />
        <CardFooter className="justify-center text-sm">
          Don't have an account?
          <Link to="/register" className="ml-1 text-pink-800 hover:underline">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
