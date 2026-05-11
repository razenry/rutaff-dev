<?php

namespace App\Services;

use App\Interfaces\TransactionRepositoryInterface;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentService extends BaseService
{
    public function __construct(TransactionRepositoryInterface $repository)
    {
        parent::__construct($repository);
        
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function createTransaction(array $data)
    {
        $transaction = $this->repository->create($data);

        $params = [
            'transaction_details' => [
                'order_id' => $transaction->id,
                'gross_amount' => $transaction->amount,
            ],
            'customer_details' => [
                'first_name' => $transaction->user->name,
                'email' => $transaction->user->email,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);
        $transaction->update(['snap_token' => $snapToken]);

        return $transaction;
    }

    public function handleNotification(array $payload)
    {
        $orderId = $payload['order_id'];
        $status = $payload['transaction_status'];
        
        $transaction = $this->repository->find($orderId);
        
        if ($transaction) {
            $transaction->update(['status' => $status]);
            // Additional logic for wallet topup or syahriyah payment
        }
        
        return $transaction;
    }
}
