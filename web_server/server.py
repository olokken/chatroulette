try: 
    from flask import Flask, request
    from flask_socketio import SocketIO, send, emit
    import os
    import sys
    import json
except: 
    print("Som modules are missing")

app = Flask(__name__)
app.secret_key = 'secret-key'
socketio = SocketIO(app)

connected = []

def newConnected(username, sessionID):
    #Trenger muligens en lock før man endrer verdien
    global connected
    x = {"name": username, "sessionID": sessionID}
    connected.append(x)

def client_disconnect(user):
    #Trenger muligens en lock før man endrer verdien 
    global connected
    connected.remove(user)

@socketio.on('dis')
def disconnect_message(data):
    print(data)


@socketio.on('message')
def handleMessage(username):
    sessionID = request.sid
    print(f'Dette er {username} sin SessionID: {sessionID}')
    newConnected(username, sessionID)
    send(connected, broadcast = True)

@socketio.on('connect')
def ws_connect():
    print("En klient koblet til")

@socketio.on('disconnect')
def ws_disconnect():
    print("En klient disconnected fra serveren")

@socketio.on('privateMessage')
def offer_to_klient(payLoad):
    recipient_session_id = payLoad['sessionID']
    offer = payLoad['offer']
    emit('offer', offer, room=recipient_session_id)


if __name__ == '__main__':
    socketio.run(app, port = 8000)