"use client";

import { usePayment } from "@/hooks/usePayment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, ArrowUpRight, History, Loader2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import Script from "next/script";
import { toast } from "sonner";

declare global {
  interface Window {
    snap: any;
  }
}

export default function PaymentsPage() {
  const { wallet, transactions, isLoadingWallet, isLoadingTransactions, createPayment, isCreatingPayment } = usePayment();
  const [amount, setAmount] = useState(50000);

  const handleTopUp = () => {
    createPayment(
      { amount, type: "topup" },
      {
        onSuccess: (data) => {
          if (window.snap) {
            window.snap.pay(data.payment_url, {
              onSuccess: (result: any) => {
                toast.success("Payment successful!");
              },
              onPending: (result: any) => {
                toast.info("Payment pending...");
              },
              onError: (result: any) => {
                toast.error("Payment failed!");
              },
              onClose: () => {
                toast.warning("Payment popup closed.");
              }
            });
          } else {
            toast.error("Midtrans Snap not loaded. Please try again.");
          }
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to initiate payment");
        }
      }
    );
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />
      
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payments & Wallet</h2>
        <p className="text-muted-foreground">Manage your student wallet and transaction history.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingWallet ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <div className="text-4xl font-bold">
                {formatCurrency(wallet?.balance || 0)}
              </div>
            )}
            <p className="text-primary-foreground/70 text-sm mt-2">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Top Up</CardTitle>
            <CardDescription>Select an amount to add to your wallet.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[50000, 100000, 250000, 500000].map((amt) => (
                <Button 
                  key={amt} 
                  variant={amount === amt ? "default" : "outline"}
                  onClick={() => setAmount(amt)}
                >
                  {formatCurrency(amt)}
                </Button>
              ))}
            </div>
            <Button 
              className="w-full h-12" 
              onClick={handleTopUp}
              disabled={isCreatingPayment}
            >
              {isCreatingPayment ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowUpRight className="mr-2 h-4 w-4" />}
              Top Up Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoadingTransactions ? (
              <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
            ) : transactions?.data?.length > 0 ? (
              transactions.data.map((tx: any) => (
                <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.type === 'topup' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm capitalize">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'topup' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'topup' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <div className="flex items-center justify-end gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                      {getStatusIcon(tx.status)}
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-muted-foreground italic">No transactions found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
