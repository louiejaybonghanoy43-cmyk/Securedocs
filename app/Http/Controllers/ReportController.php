<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Display the reports dashboard
     */
    public function index()
    {
        return view('admin.reports.index');
    }

    /**
     * Generate user premium status report
     */
    public function userPremiumReport(Request $request)
    {
        $format = $request->get('format', 'html'); // html or pdf
        
        // Get user statistics
        $totalUsers = User::count();
        $premiumUsers = User::whereRaw('is_premium IS TRUE')->count();
        $standardUsers = $totalUsers - $premiumUsers;
        
        // Get detailed user data
        $users = User::select([
            'id',
            'firstname', 
            'lastname',
            'email',
            'is_premium',
            'is_approved',
            'role',
            'created_at'
        ])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => trim(($user->firstname ?? '') . ' ' . ($user->lastname ?? '')),
                'email' => $user->email,
                'is_premium' => $user->is_premium,
                'is_approved' => $user->is_approved,
                'role' => $user->role,
                'created_at' => $user->created_at,
                'status' => $user->is_premium ? 'Premium' : 'Standard'
            ];
        });

        // Premium users by month for the last 12 months
        $monthlyData = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthKey = $date->format('Y-m');
            $monthLabel = $date->format('M Y');
            
            $totalInMonth = User::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
                
            $premiumInMonth = User::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->whereRaw('is_premium IS TRUE')
                ->count();
                
            $monthlyData[] = [
                'month' => $monthLabel,
                'total' => $totalInMonth,
                'premium' => $premiumInMonth,
                'standard' => $totalInMonth - $premiumInMonth
            ];
        }

        $reportData = [
            'title' => 'User Premium Status Report',
            'generated_at' => Carbon::now(),
            'summary' => [
                'total_users' => $totalUsers,
                'premium_users' => $premiumUsers,
                'standard_users' => $standardUsers,
                'premium_percentage' => $totalUsers > 0 ? round(($premiumUsers / $totalUsers) * 100, 2) : 0
            ],
            'users' => $users,
            'monthly_data' => $monthlyData
        ];

        if ($format === 'pdf') {
            $pdf = Pdf::loadView('admin.reports.user-premium-pdf', $reportData);
            return $pdf->download('user-premium-report-' . date('Y-m-d') . '.pdf');
        }

        return view('admin.reports.user-premium', $reportData);
    }

    /**
     * Generate custom report based on filters
     */
    public function customReport(Request $request)
    {
        $request->validate([
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date|after_or_equal:date_from',
            'user_type' => 'nullable|in:all,premium,standard',
            'user_status' => 'nullable|in:all,approved,pending',
            'format' => 'nullable|in:html,pdf'
        ]);

        $format = $request->get('format', 'html');
        $dateFrom = $request->get('date_from') ? Carbon::parse($request->get('date_from')) : null;
        $dateTo = $request->get('date_to') ? Carbon::parse($request->get('date_to')) : null;
        $userType = $request->get('user_type', 'all');
        $userStatus = $request->get('user_status', 'all');

        // Build query
        $query = User::query();

        if ($dateFrom) {
            $query->where('created_at', '>=', $dateFrom->startOfDay());
        }
        if ($dateTo) {
            $query->where('created_at', '<=', $dateTo->endOfDay());
        }
        if ($userType === 'premium') {
            $query->whereRaw('is_premium IS TRUE');
        } elseif ($userType === 'standard') {
            $query->whereRaw('is_premium IS FALSE');
        }
        if ($userStatus === 'approved') {
            $query->whereRaw('is_approved IS TRUE');
        } elseif ($userStatus === 'pending') {
            $query->whereRaw('is_approved IS FALSE');
        }

        $users = $query->select([
            'id',
            'firstname',
            'lastname', 
            'email',
            'is_premium',
            'is_approved',
            'role',
            'created_at'
        ])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => trim(($user->firstname ?? '') . ' ' . ($user->lastname ?? '')),
                'email' => $user->email,
                'is_premium' => $user->is_premium,
                'is_approved' => $user->is_approved,
                'role' => $user->role,
                'created_at' => $user->created_at,
                'status' => $user->is_premium ? 'Premium' : 'Standard'
            ];
        });

        $reportData = [
            'title' => 'Custom User Report',
            'generated_at' => Carbon::now(),
            'filters' => [
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
                'user_type' => $userType,
                'user_status' => $userStatus
            ],
            'summary' => [
                'total_users' => $users->count(),
                'premium_users' => $users->where('is_premium', true)->count(),
                'standard_users' => $users->where('is_premium', false)->count(),
                'approved_users' => $users->where('is_approved', true)->count(),
                'pending_users' => $users->where('is_approved', false)->count()
            ],
            'users' => $users
        ];

        if ($format === 'pdf') {
            $pdf = Pdf::loadView('admin.reports.custom-pdf', $reportData);
            return $pdf->download('custom-user-report-' . date('Y-m-d') . '.pdf');
        }

        return view('admin.reports.custom', $reportData);
    }
}