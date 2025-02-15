"use client";

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import {
  showSuccessToast,
  showErrorToast,
} from "@/app/dashboard/components/utils/toastUtils";

import { useRouter } from "next/navigation";

export interface OrderItemProps {
  id: string;
  amount: number;
  orderId: string;
  productId: string;
  order: {
    id: string;
    table: number;
    name: string | null;
    status: boolean;
    draft: boolean;
  };
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
    categoryId: string;
    category: {
      id: string;
      name: string;
    };
  };
}

type OrderContexteData = {
  isOpen: boolean;
  onRquestOpen: (orderId: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handlerFinishOrder: (orderId: string) => Promise<void>;
};

type OrderProviderData = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContexteData);

export function OrderProvider({ children }: OrderProviderData) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  async function onRquestOpen(orderId: string) {
    const token = await getCookieClient();
    if (!token) return;
    const response = await api.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrder(response.data);
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  async function handlerFinishOrder(orderId: string) {
    try {
      const token = await getCookieClient();
      if (!token) return;

      const data = {
        orderId: orderId,
      };

      await api.put("/orders/finish", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
      showErrorToast({ message: "Erro ao finalizar pedido!" });
      return;
    }

    showSuccessToast({ message: "Pedido finalizado com sucesso!" });
    router.refresh();
    onRequestClose();
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRquestOpen,
        onRequestClose,
        order,
        handlerFinishOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
