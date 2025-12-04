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
        
        .filters {
            background-color: #f0f8ff;
            border: 1px solid #b3d9ff;
            padding: 15px;
            margin-bottom: 30px;
            border-radius: 5px;
        }
        
        .filters h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #0066cc;
        }
        
        .filter-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .filter-tag {
            background-color: #e6f3ff;
            color: #0066cc;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 11px;
            border: 1px solid #b3d9ff;
        }
        
        .summary {
            display: table;
            width: 100%;
            margin-bottom: 30px;
        }
        
        .summary-item {
            display: table-cell;
            width: 20%;
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
        
        .no-data {
            text-align: center;
            padding: 40px;
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $title }}</h1>
        <p>Generated on {{ $generated_at->format('F j, Y \a\t g:i A') }}</p>
    </div>

    <div class="filters">
        <h3>Applied Filters:</h3>
        <div class="filter-tags">
            @if($filters['date_from'])
                <span class="filter-tag">From: {{ $filters['date_from']->format('M j, Y') }}</span>
            @endif
            @if($filters['date_to'])
                <span class="filter-tag">To: {{ $filters['date_to']->format('M j, Y') }}</span>
            @endif
            <span class="filter-tag">Type: {{ ucfirst($filters['user_type']) }}</span>
            <span class="filter-tag">Status: {{ ucfirst($filters['user_status']) }}</span>
        </div>
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
            <h3>{{ number_format($summary['approved_users']) }}</h3>
            <p>Approved Users</p>
        </div>
        <div class="summary-item">
            <h3>{{ number_format($summary['pending_users']) }}</h3>
            <p>Pending Users</p>
        </div>
    </div>  
  <div class="section">
        <h2>Filtered User List ({{ number_format($users->count()) }} users)</h2>
        @if($users->count() > 0)
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
        @else
            <div class="no-data">
                <p>No users match the selected criteria.</p>
            </div>
        @endif
    </div>

    <div class="footer">
        <p>SecureDocs Custom Report - Page <span class="pagenum"></span></p>
    </div>
</body>
</html>