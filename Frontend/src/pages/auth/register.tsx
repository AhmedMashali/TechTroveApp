import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import useRegister from "@/hooks/auth/useRegister";
import { useAuthStore } from "@/store/auth";
import { useFormik } from "formik";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters")
    .regex(/^[A-Za-z]+$/, "Username must contain letters only"),
  password: z
    .string()
    .max(32, "Password must be at most 32 characters")
    .min(8, "Password must be at least 8 characters"),
});

export function Register() {
  const { mutateAsync: register } = useRegister();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const result = schema.safeParse(values);
      const errors: Record<string, string> = {};
      if (!result.success) {
        for (const issue of result.error.issues) {
          const key = String(issue.path[0]);
          errors[key] = issue.message;
        }
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { token, user } = await register(values);
        login(token, user);
        toast("Account created successfully.");
        resetForm();
        navigate("/");
      } catch (error) {
        toast.error("Registration failed", {
          description:
            error instanceof Error ? error.message : "An unexpected error occurred.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-full flex justify-center items-center">
      <section className="flex justify-center items-center grow">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create new account</CardTitle>
            <CardDescription>
              Enter your data to create new account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign In</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="newuser"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-red-500 text-sm">{formik.errors.username}</div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Already have an account? Sign In
            </a>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
