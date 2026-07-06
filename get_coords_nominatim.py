import urllib.parse
import urllib.request
import json

queries = [
    'Calle 50 entre 116 y 117 La Plata Buenos Aires',
    'Calle 120 entre 61 y 62 1439 La Plata Buenos Aires',
    'Calle 14 entre 63 y 64 La Plata Buenos Aires',
]

for q in queries:
    params = urllib.parse.urlencode({'q': q, 'format': 'json'})
    url = f'https://nominatim.openstreetmap.org/search?{params}'
    print('QUERY:', q)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            data = response.read().decode('utf-8')
            arr = json.loads(data)
            if not arr:
                print('  NO RESULTS')
            else:
                for i, item in enumerate(arr[:10]):
                    print(i, item.get('lat'), item.get('lon'), item.get('display_name'))
    except Exception as e:
        print('ERROR:', e)
    print()
