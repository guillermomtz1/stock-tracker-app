"use server";

import { auth } from "@/lib/auth";
import { inngest } from "@/lib/inngest/client";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email: email, password: password, name: fullName },
    });
    if (response) {
      await inngest.send({
        name: "auth.user.created",
        data: { user: { name: fullName, email } },
      });
    }

    return { success: true, data: response, message: "Sign up successful" };
  } catch (e: any) {
    const message = e?.body?.message ?? e?.message ?? "Sign up failed";
    return { success: false, error: message };
  }
};

export const signInWithEmailAndPassword = async ({
  email,
  password,
}: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email: email, password: password },
    });
    return { success: true, data: response, message: "Sign in successful" };
  } catch (e: any) {
    const message = e?.body?.message ?? e?.message ?? "Sign in failed";
    return { success: false, error: message };
  }
};
