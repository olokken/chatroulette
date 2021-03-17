try: 
    from flask import Flask
    from flask_socketio import SocketIO
    from flask_socketio import SocketIO, send
    import os
    import sys
    import json
except: 
    print("Som modules are missing")

app = Flask(__name__)
app.secret_key = 'secret-key'
socketio = SocketIO(app)

connected = []

def newConnected(username, stuninfo):
    #Trenger muligens en lock før man endrer verdien
    global connected
    x = {"name": username, "stunServerInfo": stuninfo}
    connected.append(x)

def client_disconnect(user):
    #Trenger muligens en lock før man endrer verdien 
    global connected
    connected.remove(user)

@socketio.on('dis')
def disconnect_message(data):
    print(data)


@socketio.on('message')
def handleMessage(username, stuninfo):
    print("Navn til bruker: " + username)
    print("Stun connection greie til brukeren: " + stuninfo)
    newConnected(username, stuninfo)
    send(connected, broadcast = True)

@socketio.on('connect')
def ws_connect():
    print("En klient koblet til")



@socketio.on('disconnect')
def ws_disconnect():
    print("En klient disconnected fra serveren")

if __name__ == '__main__':
    socketio.run(app, port = 8000)