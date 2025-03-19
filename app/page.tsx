"use client"

import TopAppBar from "@/app/components/TopAppBar";
import Card from "./components/Card";
import FormItem from "./components/FormItem";
import Field from "./components/Field";
import { useState } from "react";

export default function Home() {
  const [fieldValue, setFieldValue] = useState<string>("");

  return (
    <div>
      <TopAppBar parentURL="#">Page name</TopAppBar>
      <main className="mt-16">
        <Card>
          <p>Hello, world!</p>
        </Card>
      </main>
    </div>
  );
}
