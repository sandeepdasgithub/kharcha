<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // This method will return users only if the user is authenticated
    public function users(Request $request)
    {
        // Authenticate the user using Sanctum
        if ($request->user()) {
            $users = User::all();

            return response()->json([
                'users' => $users,
                'token' => $request->bearerToken(),
            ], 200);
        } else {
            // Return a 401 Unauthorized response if the user is not authenticated
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
