import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Problem - Code Arena",
};

export default function ProblemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}