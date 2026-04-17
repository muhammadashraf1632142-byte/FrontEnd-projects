import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const schema = zod
  .object({
    name: zod
      .string("enter name")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .nonempty("name si requiered"),
    username: zod
      .string("enter username")
      .regex(/^[a-zA-Z0-9_]{6,20}$/i, "enter valid name")
      .nonempty("name si requiered"),
    email: zod.email("Email is not valid").nonempty("email is required"),
    password: zod
      .string("enter password")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .nonempty("password is reqierd"),
    rePassword: zod
      .string("enter password")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .nonempty("confirm password is reqierd"),
    dateOfBirth: zod.coerce
      .date()
      .refine(
        function (value) {
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          if (age > 18) {
            return true;
          }
          return false;
        },
        {
          message: "You must be at least 18 years old",
        },
      )
      .transform(function (value) {
        return value.toISOString("en-US");
      }),
    gender: zod.enum(["male", "female"], "Please select a valid gender"),
  })
  .refine(
    function (data) {
      if (data.password === data.rePassword) {
        return true;
      }
      return false;
    },
    {
      message: "Passwords should match",
      path: ["rePassword"],
    },
  );

export default function Register() {
  const myNavigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });

  async function getRegisterdData(data) {
    console.log(data);
    toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, data),
      {
        loading: "Registering...",
        success: function (res) {
          myNavigate("/login");
          return <p className="text-green-500 ">{res.data.message}</p>;
        },
        error: (res) => (
          <p className="text-red-600">{res.response.data.errors}</p>
        ),
      },
    );
  }
  return (
    <>
      <section className="w-full h-full gap-1  flex flex-col pt-16 items-center justify-center">
        <h1 className="text-4xl font-bold bg-linear-to-r  from-violet-700 to-purple-500 p-1.5 bg-clip-text text-transparent">
          Register
        </h1>
        <Form
          className="w-full max-w-xs h-full flex  flex-col "
          onSubmit={handleSubmit(getRegisterdData)}
          onReset={() =>
            setAction("reset", setInError(false), setInSuccess(false))
          }
        >
          <div className="flex gap-0.5">
            <Input
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
              type="text"
              {...register("username")}
              //   , {
              //   required: "Username is required",
              //   pattern: {
              //     value: /^[a-zA-Z0-9_]{6,20}$/i,
              //     message:
              //       "Username must be 6-20 characters and can only contain letters, numbers, and underscores",
              //   },
              // })}
            />
            <Input
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter your name"
              type="text"
              {
                ...register("name")
                // , {
                // required: "Name is required",
                // minLength: {
                //   value: 2,
                //   message: "Name must be at least 2 characters",
                // },
                // maxLength: {
                //   value: 50,
                //   message: "Name must be less than 50 characters",
              }
            />{" "}
          </div>
          <Input
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            {...register("email")}
          />
          <Input
            id="password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            {
              ...register("password")
              // , {
              // required: "Password is required",
              // minLength: {
              //   value: 6,
              //   message: "Password must be at least 6 characters",
              // ,
            }
          />
          <Input
            isInvalid={!!errors.rePassword}
            errorMessage={errors.rePassword?.message}
            label="Confirm Password"
            labelPlacement="outside"
            name="rePassword"
            placeholder="Confirm your password"
            type="password"
            {...register("rePassword")}
            // , {
            //   required: "Please confirm your password",
            //   validate: (value) => {
            //     if (value !== watch("password")) {
            //       return "Passwords do not match";
            //     }
          />
          <Input
            isInvalid={!!errors.dateOfBirth}
            errorMessage={errors.dateOfBirth?.message}
            label="Date of Birth"
            labelPlacement="outside"
            name="dateOfBirth"
            placeholder="Enter your Date of Birth"
            type="date"
            {...register("dateOfBirth")}
            // , {
            //   required: "Date of Birth is required",
            //   valueAsDate: true,
            //   validate: (value) => {
            //     const today = new Date();
            //     const birthDate = (value);
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                aria-label="gender"
                {...field}
                className="max-w-xs"
                placeholder="Select your gender"
                selectedKeys={[field.value]}
              >
                <SelectItem key={"male"}>Male</SelectItem>
                <SelectItem key={"female"}>Female</SelectItem>
              </Select>
            )}
          />
         <Link to="/login">  <p className=" font-semibold text-fuchsia-900 hover:underline"> Already have an account?Login</p></Link>
          <div className="flex flex-col w-full gap-2 ">
            <Button color="primary" type="submit ">
              Submit
            </Button>
            <Button className=" w-full" type="reset" variant="flat">
              Reset
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
}
