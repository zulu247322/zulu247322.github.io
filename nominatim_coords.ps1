$queries = @(
    'Calle 50 entre 116 y 117 La Plata Buenos Aires',
    'Calle 120 entre 61 y 62 1439 La Plata Buenos Aires',
    'Calle 14 entre 63 y 64 La Plata Buenos Aires'
)

foreach ($q in $queries) {
    $url = "https://nominatim.openstreetmap.org/search?format=json&q=$([System.Web.HttpUtility]::UrlEncode($q))"
    Write-Host "QUERY: $q"
    try {
        $res = Invoke-RestMethod -Uri $url -Headers @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } -TimeoutSec 20
        if (-not $res -or $res.Count -eq 0) {
            Write-Host '  NO RESULTS'
        } else {
            for ($i = 0; $i -lt [Math]::Min(5, $res.Count); $i++) {
                $item = $res[$i]
                Write-Host $i $item.lat $item.lon $item.display_name
            }
        }
    } catch {
        Write-Host 'ERROR:' $_.Exception.Message
    }
    Write-Host ''
}
