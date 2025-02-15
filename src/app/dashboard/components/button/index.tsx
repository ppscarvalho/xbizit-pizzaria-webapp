"use client";
import styles from "./styles.module.scss";
import { useFormStatus } from "react-dom";

interface Props {
  name: string;
}

export function Button({ name }: Props) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? "Carregando..." : name}
    </button>
  );
}
