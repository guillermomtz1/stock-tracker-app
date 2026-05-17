"use client";

import FooterLink from "@/components/forms/footerLink";
import InputField from "@/components/forms/inputField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    const result = await signInWithEmailAndPassword(data);

    if (result.success) {
      router.push("/");
    } else {
      toast.error("Sign in failed", {
        description: result.error ?? "An unknown error occurred",
      });
    }
  };

  return (
    <div>
      <h1 className="form-title text-center">Sign in to your account</h1>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full -mt-5"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
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
