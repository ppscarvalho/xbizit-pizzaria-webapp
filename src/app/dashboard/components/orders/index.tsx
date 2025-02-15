"use client";
import { use } from "react";
import styles from "./styles.module.scss";
import { RefreshCcw } from "lucide-react";
import { OrderProps } from "@/lib/order.type";
import { ModalOrder } from "@/app/dashboard/components/modal";
import { OrderContext } from "@/providers/order";
import { useRouter } from "next/navigation";
import { showSuccessToast } from "@/app/dashboard/components/utils/toastUtils";
interface Props {
  orders: OrderProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRquestOpen } = use(OrderContext);
  const router = useRouter();

  async function handlerDetailOrder(orderId: string) {
    await onRquestOpen(orderId);
  }

  async function handlerRefresh() {
    router.refresh();
    showSuccessToast({ message: "Pedidos atualizados com sucesso!" });
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          {orders.length > 0 && (
            <button onClick={handlerRefresh}>
              <RefreshCcw size={24} color="#fff" />
            </button>
          )}
        </section>

        <section className={styles.listOrders}>
          {!orders.length && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto no momento
            </span>
          )}
          {orders.map((order, index) => (
            <button
              className={styles.orderItem}
              key={order.id}
              onClick={() => handlerDetailOrder(order.id)}
            >
              <div className={styles.tag}></div>
              <span>
                Mesa: {order.table} - {order.name}
              </span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}
