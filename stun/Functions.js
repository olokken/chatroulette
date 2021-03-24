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
		console.log("ip: " + str)
		return Buffer.from(str.split(".").map((n) => { 
			return parseInt(n); 
		}));
	}

	static ipv6StringToBuffer(str) {
		console.log(str)
		const arr = str.split(":");
		const len = arr.length - 1;

		if (net.isIPv4(arr[len]) && arr[len - 1].toUpperCase() === "FFFF") {
			arr[len] = arr[len].split(".").map((n) => {
				return parseInt(n).toString(16).padStart(2, "0");
			}).join("");
		}

		const hs = arr.join("").padStart(16, "0");
		const buf = Buffer.alloc(16);

		let i = hs.length - 2;
		let j = buf.length - 1;

		while (i >= 0) {
			buf[j] = parseInt(hs.substring(i, i + 2), 16);
			i -= 2;
			j -= 1;
		}

		return buf;
	}
	
}

module.exports.Functions = Functions;
