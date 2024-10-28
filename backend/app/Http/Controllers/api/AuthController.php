<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            // 'last_name' => 'required|string|max:255',
            'user_name' => 'required|string|max:255',
            'phone' =>'required|min:10',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
// dd($request->phone);

        // Create the user
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'user_name' => $request->user_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Optionally, generate a token upon registration
        $token = $user->createToken('API Token')->plainTextToken;

        // Return the user and token in the response
        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'User registered successfully!'
        ], 201);
    }
    public function login(Request $request)
    {
        // Validate login request
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Find user by email
        $user = User::where('email', $request->email)->first();
    
        // Check if user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        // Generate a token
        $token = $user->createToken('API Token')->plainTextToken;
    
        // Return the token and user details
        return response()->json(['user' => $user, 'token' => $token, 'message' => 'Login successful'], 200);
    }
    
    
    public function logout(Request $request)
    {
        // Revoke the user's token
        $request->user()->currentAccessToken()->delete();

        // Optionally, you can return a message confirming logout
        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }
}
