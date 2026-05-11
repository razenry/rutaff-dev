<?php

namespace App\DTOs;

abstract class BaseDTO
{
    public function toArray(): array
    {
        return get_object_vars($this);
    }

    public static function fromRequest($request): static
    {
        return new static(...$request->validated());
    }
}
