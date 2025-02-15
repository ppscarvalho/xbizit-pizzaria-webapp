"use client";
import styles from "./styles.module.scss";
import { X } from "lucide-react";
import { useContext } from "react";
import { OrderContext } from "@/providers/order";
import { calculateTotalOrder } from "@/lib/helper";
import Image from "next/image";

export function ModalOrder() {
  const { onRequestClose, order, handlerFinishOrder } =
    useContext(OrderContext);

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={34} color="#Ff3f4b" />
        </button>

        <article className={styles.orderDetails}>
          <h2>Detalhes do pedido</h2>
          <span>
            Mesa: <b>{order[0]?.order.table}</b>
          </span>

          {order[0]?.order?.name && (
            <span className={styles.name}>
              Cliente: {order[0]?.order?.name}
            </span>
          )}

          {order.map((item) => (
            <section className={styles.item} key={item.id}>
              <Image
                src={item.product.banner}
                alt="Foto do produto"
                width={50}
                height={50}
                quality={100}
                priority={true}
              />
              <span>
                Qtd: {item.amount} - <b>{item.product.name}</b> - R${" "}
                {parseFloat(item.product.price).toFixed(2)}
              </span>
              <span className={styles.description}>
                Descrição: {item.product.description}
              </span>
            </section>
          ))}

          <h3 className={styles.total}>
            Valor Total: R$ {calculateTotalOrder(order).toFixed(2)}
          </h3>
          <button
            className={styles.confirmOrder}
            onClick={() => handlerFinishOrder(order[0]?.order.id)}
          >
            Confirmar pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
