<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Services\PaymentService;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TransactionController extends Controller
{
    use ApiResponser;

    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function index(Request $request): JsonResponse
    {
        $transactions = $this->paymentService->getById($request->user()->id); // Simplified for example
        return $this->successResponse($transactions, 'Transactions retrieved');
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:1000',
            'type' => 'required|in:syahriyah,donation,topup,lazis',
        ]);

        try {
            $data = $request->all();
            $data['user_id'] = $request->user()->id;
            $data['status'] = 'pending';
            
            $transaction = $this->paymentService->createTransaction($data);
            
            return $this->successResponse($transaction, 'Transaction created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function webhook(Request $request): JsonResponse
    {
        try {
            $this->paymentService->handleNotification($request->all());
            return $this->successResponse(null, 'Webhook handled');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
