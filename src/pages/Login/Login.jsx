import { Button, Form, Input } from "@heroui/react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../components/shareComponents/AppButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider/AuthContextProvider";

const schema = zod.object({
  email: zod.email().nonempty("email is required"),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .nonempty("password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});


export default function Login() {
  const { login } = useContext(AuthContext);
  const myNavigate = useNavigate();

  const { handleSubmit, register } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "all",
    resolver: zodResolver(schema),
  });

  function logged(data) {
    toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`, data),
      {
        loading: "logging in...",
        success: function (res) {
          const token = res.data.data.token;
          login(token);
          myNavigate("/posts");
          return <b className="text-green-500">{res.data.message}</b>;
        },
        error: function (error) {
          return (
            <b className="text-red-500">
              {error.response?.data?.errors || "Login failed"}
            </b>
          );
        },
      }
    );
  }

  return (
    <section className="w-full h-7/12 flex flex-col gap-2 items-center pt-16 justify-center">
      <h1 className="text-4xl font-bold bg-linear-to-r from-violet-700 to-purple-500 p-1.5 bg-clip-text text-transparent">
        Login
      </h1>

      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleSubmit(logged)}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          {...register("email")}
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage="Please enter your password"
          label="Password"
          labelPlacement="outside"
          {...register("password")}
          placeholder="Enter your password"
          type="password"
        />

        <Link to="/register">
          <p className="font-semibold text-fuchsia-900 hover:underline">
            Don't have an account? Register
          </p>
        </Link>

        <div className="flex gap-2">
          <AppButton color="primary" type="submit">
            Submit
          </AppButton>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>
    </section>
  );
}