import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - SnippetLab",
  description: "Sign up for a new account",
};

export default function SignUnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
