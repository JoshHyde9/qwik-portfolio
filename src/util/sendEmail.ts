import { type EmailData } from "./schema";

export const sendEmail = async ({
  name,
  email,
  subject,
  message,
}: EmailData) => {
  const response = await fetch(
    "https://api.sparkpost.com/api/v1/transmissions/",
    {
      method: "POST",
      headers: {
        Authorization: import.meta.env.VITE_SPARKPOST_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipients: [
          {
            address: {
              email: import.meta.env.VITE_MY_EMAIL_ADDRESS,
              name: "Josh Hyde",
            },
          },
        ],
        content: {
          from: {
            name,
            email: import.meta.env.VITE_SPARKPOST_DOMAIN,
          },
          subject: subject,
          html: `<html><body><p>Contact email: ${email}</p><p>${message}</p></body></html>`,
        },
      }),
    }
  );

  await response.json();
  return { success: true };
};
