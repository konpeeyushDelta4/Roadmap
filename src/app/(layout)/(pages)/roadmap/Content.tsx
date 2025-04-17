"use client";

import { Button } from "@nextui-org/react";
import { Lightbulb, Plus } from "lucide-react";
import Link from "next/link";

export default function Content() {
  return (
    <div
      style={{ height: "70px" }}
      className="flex items-center justify-between"
    >
      <Button
        as={Link}
        href="/roadmap/submissions"
        startContent={<Lightbulb width={16} />}
        radius="sm"
        color="primary"
      >
        All Features
      </Button>
      <Button
        as={Link}
        className="border-[0.05rem] hover:bg-primary/20"
        variant="bordered"
        href="/roadmap/submissions"
        startContent={<Plus width={16} />}
        radius="sm"
        color="primary"
      >
        Create Submission
      </Button>
    </div>
  );
} 