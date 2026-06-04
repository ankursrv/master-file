import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShadcnPracticePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">Shadcn UI Practice Playground</h1>
      
      <section className="flex flex-col items-center gap-4 w-full max-w-2xl p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold self-start mb-4">Cards & Buttons</h2>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to your clean branch!</CardTitle>
            <CardDescription>All JioInstitute components have been removed.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              You can now safely add, modify, and test Shadcn UI components here without affecting the main project.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Learn More</Button>
            <Button>Get Started</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="flex flex-col items-center gap-4 w-full max-w-2xl p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold self-start mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2 self-start">
          <Badge>Default Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </main>
  );
}
