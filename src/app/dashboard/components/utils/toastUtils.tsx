// toastUtils.ts
import { toast } from "sonner";

export const showSuccessToast = ({ message }: { message: string }) => {
  toast.success(message, {
    duration: 3000, // Duração da notificação
    style: {
      background: "#DFF6DD", // Fundo verde claro
      color: "#1A7F36", // Texto verde escuro
      border: "1px solid #A8E6A3", // Borda verde
    },
  });
};

export const showErrorToast = ({ message }: { message: string }) => {
  toast.error(message, {
    duration: 3000, // Duração da notificação
    style: {
      background: "#FDDCDC", // Fundo vermelho claro
      color: "#B22222", // Texto vermelho escuro
      border: "1px solid #F5A9A9", // Borda vermelha
    },
  });
};

// toastUtils.ts
export const showSuccessToast2 = ({
  message,
  duration = 3000,
  customStyles = {},
}: {
  message: string;
  duration?: number;
  customStyles?: React.CSSProperties;
}) => {
  toast.success(message, {
    duration,
    style: {
      background: "#DFF6DD",
      color: "#1A7F36",
      border: "1px solid #A8E6A3",
      ...customStyles,
    },
  });
};

export const showErrorToast2 = ({
  message,
  duration = 3000,
  customStyles = {},
}: {
  message: string;
  duration?: number;
  customStyles?: React.CSSProperties;
}) => {
  toast.error(message, {
    duration,
    style: {
      background: "#FDDCDC",
      color: "#B22222",
      border: "1px solid #F5A9A9",
      ...customStyles,
    },
  });
};
