import styles from "../page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function SignUp() {
  async function handlerRegister(formdata: FormData) {
    "use server";
    const name = formdata.get("name");
    const email = formdata.get("email");
    const password = formdata.get("password");

    if (!name || !email || !password) {
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    redirect("/");
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src="/assets/images/logo_xbizit_menor.png"
          width={190}
          height={60}
          priority={true}
          quality={100}
          alt="Logo XBizIT"
          className={styles.logoXBizIT}
        />

        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action={handlerRegister}>
            <input
              type="text"
              placeholder="Digite seu seu nome!"
              required
              name="name"
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Digite seu e-mail!"
              required
              name="email"
              className={styles.input}
            />

            <input
              type="password"
              placeholder="#########"
              required
              name="password"
              className={styles.input}
            />

            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>

          <Link href="/" className={styles.register}>
            Já possui uma conta? Faça login
          </Link>
        </section>
      </div>
    </>
  );
}
