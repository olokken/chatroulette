import socket, random

#STUN HEADER BESTÅ AV:
#STUN-message-types
BINDING_REQUEST = 0x0001
BINDING_RESPONSE = 0x0101
BINDING_ERROR_RESPONE = 0x0111
SHARED_SECRET_REQUEST = 0x0002
SHARED_SECRET_RESPONSE = 0x0102
SHARED_SECRET_ERROR_RESPONSE = 0x0112

#MESSAGE LENGTH

#TRANSACTION ID (RANDOM 96-bit nummer)
def get_transaction_id():
    return random.getrandbits(96)

#STUN Attributes
MAPPED_ADDRESS = 0x0001 #Inneholder IP-adresse og Port og plasseres i BINDING_RESPONSE
RESPONSE_ADDRESS = 0x0002 #Inneholder IP-adresse og port og er optional
CHANGE_REQUEST = 0x0003 #Kun tillatt i BINDING_REQUEST og inneholder to flag: kontrollere IP-adressen og porten som sendes
SOURCE_ADDRESS = 0x0004 #Indikerer IP-adressen og porten som responsen var sendt fra, for eksempel IP-adressen til maskinen klienten kjøres på
CHANGED_ADDRESS = 0x0005 #Informerer klienten om 
USERNAME = 0x0006 #Valgfri
PASSWORD = 0x0007 #Valgfri
MESSAGE_INTEGRITY = 0x0008 #Må være siste attributen i en STUN melding
ERROR_CODE = 0x0009 #Er kun i BINDING_ERROR_RESPONSE og SHARED_SECRET_ERROR_RESPONSE og indikerer at en error har oppstått, samt type error
UNKNOWN_ATTRIBUTES = 0X000a #Når error-koden er 420
