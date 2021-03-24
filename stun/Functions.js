const net = require("net");

class Functions {
	
	static fromIntToBuffer(int) {
		const buf = Buffer.alloc(2);

		buf[0] = 0xFF & (int >>> 8);
		buf[1] = 0xFF & int;

		return buf;
	}

	static getBit(buffer, idx, off) {
		let mask = Buffer.alloc(1);

		mask[0] = 0x01;
		mask[0] <<= off;

		return (buffer[idx] & mask[0]) !== 0 ? 1 : 0;
	}

	static ipv4StringToBuffer(str) {
		return Buffer.from(str.split(".").map((n) => { 
			return parseInt(n); 
		}));
	}
	
}

module.exports.Functions = Functions;
