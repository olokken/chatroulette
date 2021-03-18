x = [{"username":"pris", "id":"pris2"}, {"username":"snis", "id":"snis2"}]

for t in x:
    y = t['id']
    if y == 'pris2':
        x.remove(t)

y = 2

