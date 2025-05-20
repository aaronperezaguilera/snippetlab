import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - SnippetLab",
  description: "Sign in to your account",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
