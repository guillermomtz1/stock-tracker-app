"use client";

import FooterLink from "@/components/forms/footerLink";
import InputField from "@/components/forms/inputField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log("Signing in with data:", data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <h1 className="form-title text-center">Sign in to your account</h1>
      <form className="space-y-5">
        <InputField
          label="Email Address"
          name="email"
          placeholder="Enter your email address"
          type="email"
          register={register}
          error={errors.email}
          validation={{ required: "Email address is required" }}
        />
        <InputField
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required" }}
        />

        <Button type="submit" className="yellow-btn w-full -mt-5">
          Sign in
        </Button>
      </form>

      <FooterLink
        text="Don't have an account?"
        linkText="Sign up"
        href="/sign-up"
      />
    </div>
  );
};

export default SignIn;
