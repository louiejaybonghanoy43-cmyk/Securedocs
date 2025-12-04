<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
        }
        
        .header h1 {
            font-size: 24px;
            margin: 0 0 10px 0;
            color: #333;
        }
        
        .header p {
            margin: 0;
            color: #666;
            font-size: 14px;
        }
        
        .summary {
            display: table;
            width: 100%;
            margin-bottom: 30px;
        }
        
        .summary-item {
            display: table-cell;
            width: 25%;
            text-align: center;
            padding: 15px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
        }
        
        .summary-item h3 {
            margin: 0 0 5px 0;
            font-size: 18px;
            color: #333;
        }
        
        .summary-item p {
            margin: 0;
            color: #666;
            font-size: 11px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            font-size: 18px;
            margin: 0 0 15px 0;
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background-color: #f5f5f5;
            font-weight: bold;
            font-size: 11px;
        }
        
        td {
            font-size: 10px;
        }
        
        .status-premium {
            background-color: #d4edda;
            color: #155724;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
        }
        
        .status-standard {
            background-color: #f8f9fa;
            color: #495057;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
        }
        
        .status-approved {
            background-color: #d4edda;
            color: #155724;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
        }
        
        .status-pending {
            background-color: #fff3cd;
            color: #856404;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $title }}</h1>
        <p>Generated on {{ $generated_at->format('F j, Y \a\t g:i A') }}</p>
    </div>

    <div class="summary">
        <div class="summary-item">
            <h3>{{ number_format($summary['total_users']) }}</h3>
            <p>Total Users</p>
        </div>
        <div class="summary-item">
            <h3>{{ number_format($summary['premium_users']) }}</h3>
            <p>Premium Users</p>
        </div>
        <div class="summary-item">
            <h3>{{ number_format($summary['standard_users']) }}</h3>
            <p>Standard Users</p>
        </div>
        <div class="summary-item">
            <h3>{{ $summary['premium_percentage'] }}%</h3>
            <p>Premium Percentage</p>
        </div>
    </div>  
  <div class="section">
        <h2>Monthly Registration Breakdown</h2>
        <table>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Total</th>
                    <th>Premium</th>
                    <th>Standard</th>
                    <th>Premium %</th>
                </tr>
            </thead>
            <tbody>
                @foreach($monthly_data as $month)
                <tr>
                    <td>{{ $month['month'] }}</td>
                    <td>{{ number_format($month['total']) }}</td>
                    <td>{{ number_format($month['premium']) }}</td>
                    <td>{{ number_format($month['standard']) }}</td>
                    <td>{{ $month['total'] > 0 ? round(($month['premium'] / $month['total']) * 100, 1) : 0 }}%</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="page-break"></div>

    <div class="section">
        <h2>Detailed User List</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Approved</th>
                    <th>Joined</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                <tr>
                    <td>{{ $user['id'] }}</td>
                    <td>{{ $user['name'] ?: 'Unknown User' }}</td>
                    <td>{{ $user['email'] }}</td>
                    <td>
                        @if($user['is_premium'])
                            <span class="status-premium">Premium</span>
                        @else
                            <span class="status-standard">Standard</span>
                        @endif
                    </td>
                    <td style="text-transform: capitalize;">{{ $user['role'] }}</td>
                    <td>
                        @if($user['is_approved'])
                            <span class="status-approved">Yes</span>
                        @else
                            <span class="status-pending">Pending</span>
                        @endif
                    </td>
                    <td>{{ $user['created_at']->format('M j, Y') }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p>SecureDocs Admin Report - Page <span class="pagenum"></span></p>
    </div>
</body>
</html>