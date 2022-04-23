import socket
from typing import Any


class Arduino:
    def __init__(self, ip: str, port: int):

        self.address = (ip, port)
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)


    def send_message(self,message: bytes,):
        self.sock.sendto(message,self.address)

    def close_connection(self):
        self.sock.close()
