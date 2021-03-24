const { StunHeader } = require("./StunHeader.js");
const { Container } = require("./Container.js");
const { Functions } = require("./Functions.js"); 

class Attributes {
	static ALIGN = 4;
	static TYPE_OFF = [0, 2]; 
	static LEN_OFF = [2, 4];
	static K_LEN_LEN = this.LEN_OFF[1] - this.LEN_OFF[0]; 
	static K_TYPE_LEN = this.TYPE_OFF[1] - this.TYPE_OFF[0];

	static K_ATTR_TYPE = {
		RESERVED_0000: 0,
		MAPPED_ADDRESS: 1,
		RESERVED_0002: 2,
		RESERVED_0003: 3,
		RESERVED_0004: 4,
		RESERVED_0005: 5,
		USERNAME: 6,
		RESERVED_0007: 7,
		MESSAGE_INTEGRITY: 8,
		ERROR_CODE: 9,
		UNKNOWN_ATTRIBUTES: 10,
		RESERVED_000B: 11,
		REALM: 12,
		NONCE: 13,
		XOR_MAPPED_ADDRESS: 14,
		SOFTWARE: 15,
		ALTERNATE_SERVER: 16,
		FINGERPRINT: 17,
		MALFORMED: 18
	};

	static K_ATTR_TYPE_TABLE = new Map([
		[new Buffer.from([0x00, 0x00]).toString("hex"), new Container(this.K_ATTR_TYPE.RESERVED_0000, new Buffer.from([0x00, 0x00]))],
		[new Buffer.from([0x00, 0x01]).toString("hex"), new Container(this.K_ATTR_TYPE.MAPPED_ADDRESS, new Buffer.from([0x00, 0x01]), this.enMappedAddr)],
		[new Buffer.from([0x00, 0x02]).toString("hex"), new Container(this.K_ATTR_TYPE.RESERVED_0002, new Buffer.from([0x00, 0x02]))],
		[new Buffer.from([0x00, 0x03]).toString("hex"), new Container(this.K_ATTR_TYPE.RESERVED_0003, new Buffer.from([0x00, 0x03]))],
		[new Buffer.from([0x00, 0x04]).toString("hex"), new Container(this.K_ATTR_TYPE.RESERVED_0004, new Buffer.from([0x00, 0x04]))],
		[new Buffer.from([0x00, 0x05]).toString("hex"), new Container(this.K_ATTR_TYPE.RESERVED_0005, new Buffer.from([0x00, 0x05]))],
		[new Buffer.from([0x00, 0x06]).toString("hex"), new Container(this.K_ATTR_TYPE.USERNAME, new Buffer.from([0x00, 0x06]))],
		[new Buffer.from([0x00, 0x07]).toString("hex"), new Container(this.K_ATTR_TYPE.RESERVED_0007, new Buffer.from([0x00, 0x07]))],
		[new Buffer.from([0x00, 0x08]).toString("hex"), new Container(this.K_ATTR_TYPE.MESSAGE_INTEGRITY, new Buffer.from([0x00, 0x08]))],
		[new Buffer.from([0x00, 0x09]).toString("hex"), new Container(this.K_ATTR_TYPE.ERROR_CODE, new Buffer.from([0x00, 0x09]), this.enErrorCode)],
		[new Buffer.from([0x00, 0x0A]).toString("hex"), new Container(this.K_ATTR_TYPE.UNKNOWN_ATTRIBUTES, new Buffer.from([0x00, 0x0A]), this.enUnknownAttr)],
		[new Buffer.from([0x00, 0x0B]).toString("hex"), new Container(this.K_ATTR_TYPE.RESERVED_000B, new Buffer.from([0x00, 0x0B]))],
		[new Buffer.from([0x00, 0x14]).toString("hex"), new Container(this.K_ATTR_TYPE.REALM, new Buffer.from([0x00, 0x14]))],
		[new Buffer.from([0x00, 0x15]).toString("hex"), new Container(this.K_ATTR_TYPE.NONCE, new Buffer.from([0x00, 0x15]))],
		[new Buffer.from([0x00, 0x20]).toString("hex"), new Container(this.K_ATTR_TYPE.XOR_MAPPED_ADDRESS, new Buffer.from([0x00, 0x20]), this.enMappedAddr)],
		[new Buffer.from([0x80, 0x22]).toString("hex"), new Container(this.K_ATTR_TYPE.SOFTWARE, new Buffer.from([0x80, 0x22]), this.enSoftware)],
		[new Buffer.from([0x80, 0x23]).toString("hex"), new Container(this.K_ATTR_TYPE.ALTERNATE_SERVER, new Buffer.from([0x80, 0x23]))],
		[new Buffer.from([0x80, 0x28]).toString("hex"), new Container(this.K_ATTR_TYPE.FINGERPRINT, new Buffer.from([0x80, 0x28]))]
	]);

	static K_ADDR_FAMILY = {
		IPv4: 0,
		IPv6: 1,
		MALFORMED: 2
	};

	static K_ADDR_FAMILY_TABLE = new Map([
		[new Buffer.from([0x01]).toString("hex"), new Container(this.K_ADDR_FAMILY.IPv4, new Buffer.from([0x01]))],
		[new Buffer.from([0x02]).toString("hex"), new Container(this.K_ADDR_FAMILY.IPv6, new Buffer.from([0x02]))]
	]);

	static K_ERROR_CODE = {
		300: "Try Alternate",
		400: "Bad Request",
		401: "Unauthorized",
		420: "Unknown Attribute",
		438: "Stale Nonce",
		500: "Server Error"
	};

	constructor({type = null, args = []} = {}) {
		this.type = type ? Attributes.enType(type) : type;
		this.val = type ? Array.from(Attributes.K_ATTR_TYPE_TABLE.values())[type].f(...args) : null;
		this.len = type ? Attributes.enLen(this.val.length) : null;
	}

	static from({type = null, len = null, val = null} = {}) {
		const attr = new this;

		attr.type = type;
		attr.len = len;
		attr.val = val;

		return attr;
	}

	static isCompReq(type) {
		if (!Buffer.isBuffer(type) || type.length !== 2) {
			console.log("Må være en buffer med lengde 2");
		}
		
		if (type.readUInt16BE() < 0x8000) {
			return false;
		} 

		return true;
	}

	static decType(type) {
		const dtype = this.K_ATTR_TYPE_TABLE.get(type.toString("hex"));

		if (dtype !== undefined) {
			return dtype;
		}
		
		return new TypeData(this.K_ATTR_TYPE.MALFORMED);
	}

	static decLen(len) {
		const buf = Uint8Array.from(len);
		buf.reverse();

		const view = new Uint16Array(buf.buffer);
		return view[0];
	}

	static decFam(fam) {
		const dfam = this.K_ADDR_FAMILY_TABLE.get(fam.toString("hex"));

		if (dfam !== undefined) {
			return dfam;
		}

		return new TypeData(this.K_ADDR_FAMILY.MALFORMED);
	}

	static enType(type) {
		const tdata = Array.from(this.K_ATTR_TYPE_TABLE.values())[type];
		return Buffer.from(tdata.bin);
	}

	static enLen(len) {
		return Functions.fromIntToBuffer(len); 
	}

	static enFam(fam) {
		const tdata = Array.from(this.K_ADDR_FAMILY_TABLE.values())[fam];
		return Buffer.from(tdata.bin);
	}

	static enMappedAddr(famType, addrStr, portInt, xor = false, id = Buffer.alloc(12)) {
		const zero = Buffer.alloc(1);
		const fam = Attributes.enFam(famType);
		const port = Functions.fromIntToBuffer(portInt);
		let addr;

		if (famType === Attributes.K_ADDR_FAMILY.IPv4) {
			addr = Functions.ipv4StringToBuffer(addrStr);
		} else if (famType === Attributes.K_ADDR_FAMILY.IPv6) {
			addr = Functions.ipv6StringToBuffer(addrStr);
		}

		if (xor) {
			for (let i = 0; i < port.length; i += 1) {
				port[i] ^= StunHeader.K_MAGIC[i]; 
			}

			const c = Buffer.concat([StunHeader.K_MAGIC, id]);

			for (let i = 0; i < addr.length; i += 1) {
				addr[i] ^= c[i];
			}
		}

		return Buffer.concat([zero, fam, port, addr]);
	}

	// TODO: Validation
	static enErrorCode(code) {
		const resClass = Buffer.alloc(3);
		resClass[2] = Math.floor(code / 100);
		
		const num = Buffer.from([code % 100]); 
		const phrase = Buffer.from(Attributes.K_ERROR_CODE[code]);

		return Buffer.concat([resClass, num, phrase]);
	}

	// TODO: Validation 
	static enUnknownAttr(types) {
		const uknowns = Buffer.concat(types.map((type) => { 
			return Buffer.from(type);
		}));

		return Attributes.toPadded(uknowns);
	}

	static enSoftware(desc = "stun by bros") {
		return Attributes.toPadded(Buffer.from(desc));
	}	

	static toPadded(buf) {
		return Buffer.concat([
			buf,
			Buffer.alloc(Math.ceil(buf.length / Attributes.ALIGN) * Attributes.ALIGN - buf.length)
		]);
	}

	length() {
		return (this.type.length + this.len.length + this.val.length);
	}

	serialize() {
		return Buffer.concat([this.type, this.len, this.val]);
	}
}

module.exports.Attributes = Attributes;
