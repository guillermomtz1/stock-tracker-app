"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/inputField";
import FooterLink from "@/components/forms/footerLink";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "",
      investmentGoals: "",
      riskTolerance: "",
      preferredIndustry: "",
    },
    mode: "onBlur",
  }); // react-hook-form hook to manage form state and validation

  const onSubmit = async (data: SignUpFormData) => {
    const result = await signUpWithEmail(data);
    if (result.success) {
      router.push("/");
    } else {
      toast.error("Sign up failed", {
        description: result.error ?? "An unknown error occurred",
      });
    }
  };

  return (
    <>
      <h1 className="form-title text-center">Creat an account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Inputs */}
        <InputField
          label="Full Name"
          name="fullName"
          placeholder="Enter your full name"
          register={register}
          error={errors.fullName}
          validation={{
            required: "Full name is required",
            minLength: 3,
            maxLength: 50,
          }}
        />

        <InputField
          label="Email Address"
          name="email"
          placeholder="Enter your email address"
          register={register}
          error={errors.email}
          validation={{
            required: "Email address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
        />

        <InputField
          label="Password"
          name="password"
          placeholder="Enter your password"
          register={register}
          type="password"
          error={errors.password}
          validation={{
            required: "Password is required",
            minLength: 8,
            maxLength: 50,
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full -mt-5"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <FooterLink
        text="Already have an account?"
        linkText="Login"
        href="/sign-in"
      />
    </>
  );
};

export default SignUp;
