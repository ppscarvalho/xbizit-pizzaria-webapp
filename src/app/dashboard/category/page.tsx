import styles from "./styles.module.scss";
import { Button } from "../components/button";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { getCookieServer } from "@/lib/cookieServer";

export default function Category() {
  async function handlerRegisterCategory(formData: FormData) {
    "use server";

    const name = formData.get("name");

    if (!name) {
      return;
    }
    // TODO: Implementar chamada para o backend para cadastrar a categoria
    const data = {
      name: name,
    };

    const token = await getCookieServer();
    try {
      await api.post("/categories", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      return;
    }

    redirect("/dashboard");
  }

  return (
    <main className={styles.container}>
      <h1>Nova de Categoria</h1>
      <form className={styles.form} action={handlerRegisterCategory}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Digite um Nome da categoria, ex: Pizza, Sobremesa, etc."
          required
          className={styles.input}
        />
        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
