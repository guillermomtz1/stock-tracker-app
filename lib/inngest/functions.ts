import { eventType } from "inngest";
import { z } from "zod";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

const userCreated = eventType("auth.user.created", {
  schema: z.object({
    data: z.object({
      user: z.object({
        name: z.string(),
        email: z.string(),
      }),
    }),
  }),
});

export const sendingWelcomeEmail = inngest.createFunction(
  { id: "sending-welcome-email", triggers: [userCreated] },
  async ({ event, step }) => {
    const data = event.data as unknown as {
      user: { name: string; email: string };
    };

    const userProfile = `Name: ${data.user.name}\nEmail: ${data.user.email}`;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile,
    );

    const response = await step.ai.infer("generating-welcome-email", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });
    await step.run("sending-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) || "Thanks for joining!";

      //! SENDING EMAIL LOGIC

      return {
        success: true,
        message: "Welcome email sent successfully",
      };
    });
  },
);
