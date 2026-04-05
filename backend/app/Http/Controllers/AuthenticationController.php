<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request)
    {
        // Applying Validation.

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        } else {
            $credentials = [
                'email' => $request->email,
                'password' => $request->password,
            ];

            if (Auth::attempt($credentials)) {
                $user = User::find(Auth::user()->id);

               $token = $user->createToken('token')->plainTextToken;
            
                return response()->json([
                    'status' => true,
                    'token' => $token,
                    'id' => Auth::user()->id
                ]);

            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid Credentials'
                ], 401);
            }
        }
    }

    public function logout() {
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}
