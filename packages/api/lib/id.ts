import { customAlphabet } from "nanoid";

interface genIdProps {
  type?: "JOB" | "OTHER";
}

export default function genId({ type }: genIdProps) {
  if (type === "JOB") {
    const alphabet = "0123456789";
    const nanoid = customAlphabet(alphabet, 12);
    const id = nanoid();
    return id;
  } else {
    const alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nanoid = customAlphabet(alphabet, 24);
    const id = nanoid();
    return id;
  }
}
