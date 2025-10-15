import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lab02: xxxx-x" },
    { name: "description", content: "Welcome to React Lab02 xxxx-x!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
