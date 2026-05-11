<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\StudentWallet;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TransactionService extends BaseService
{
    protected $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    public function createPayment(array $data)
    {
        return DB::transaction(function () use ($data) {
            $transaction = Transaction::create([
                'user_id' => $data['user_id'],
                'amount' => $data['amount'],
                'type' => $data['type'], // topup, syahriyah, etc
                'status' => 'pending',
                'external_id' => (string) Str::uuid(),
            ]);

            $params = [
                'transaction_details' => [
                    'order_id' => $transaction->external_id,
                    'gross_amount' => (int) $transaction->amount,
                ],
                'customer_details' => [
                    'first_name' => $data['user_name'],
                    'email' => $data['user_email'],
                ],
            ];

            $snapToken = $this->midtrans->getSnapToken($params);
            $transaction->update(['payment_url' => $snapToken]); // We store snap token in payment_url for simplicity in PWA

            return $transaction;
        });
    }

    public function handleWebhook(array $payload)
    {
        $orderId = $payload['order_id'];
        $transactionStatus = $payload['transaction_status'];
        $type = $payload['payment_type'];
        $fraudStatus = $payload['fraud_status'] ?? null;

        $transaction = Transaction::where('external_id', $orderId)->first();

        if (!$transaction) {
            return false;
        }

        if ($transactionStatus == 'capture') {
            if ($type == 'credit_card') {
                if ($fraudStatus == 'challenge') {
                    $transaction->update(['status' => 'challenge']);
                } else {
                    $this->markAsSuccess($transaction);
                }
            }
        } else if ($transactionStatus == 'settlement') {
            $this->markAsSuccess($transaction);
        } else if ($transactionStatus == 'pending') {
            $transaction->update(['status' => 'pending']);
        } else if ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
            $transaction->update(['status' => 'failed']);
        }

        return true;
    }

    protected function markAsSuccess($transaction)
    {
        DB::transaction(function () use ($transaction) {
            $transaction->update(['status' => 'success']);

            if ($transaction->type == 'topup') {
                $wallet = StudentWallet::firstOrCreate(
                    ['student_id' => $transaction->user_id],
                    ['balance' => 0]
                );
                $wallet->increment('balance', $transaction->amount);
            }
        });
    }
}
