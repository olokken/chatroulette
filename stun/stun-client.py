import socket

DEFAULTS = {
    'stun_port': 3478,
    'source_ip': '0.0.0.0',
    'source_port': 5432
}

klient_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
print("Client: Socket Created")
melding = "Hei fra klient"

try:
    print("Client: " + melding)
    klient_socket.sendto(melding.encode(), (('0.0.0.0', 5432)))

    data, server = klient_socket.recvfrom(1024)
    data = data.decode()
    print("Klient: " + data)

finally:
    print("Klient lukker Socket")
    klient_socket.close()