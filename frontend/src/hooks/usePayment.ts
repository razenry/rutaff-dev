import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";

export const usePayment = () => {
  const queryClient = useQueryClient();

  const walletQuery = useQuery({
    queryKey: ["payment", "wallet"],
    queryFn: paymentService.getWallet,
  });

  const transactionsQuery = useQuery({
    queryKey: ["payment", "transactions"],
    queryFn: paymentService.getTransactions,
  });

  const createPaymentMutation = useMutation({
    mutationFn: paymentService.createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
  });

  return {
    wallet: walletQuery.data,
    isLoadingWallet: walletQuery.isLoading,
    transactions: transactionsQuery.data,
    isLoadingTransactions: transactionsQuery.isLoading,
    createPayment: createPaymentMutation.mutate,
    isCreatingPayment: createPaymentMutation.isPending,
  };
};
