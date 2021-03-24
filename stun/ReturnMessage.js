const { StunHeader } = require("./StunHeader.js");
const { Attributes } = require("./Attributes.js");

class ReturnMessage {

	constructor({hdr = null, attrs = []} = {}) {
		this.hdr = hdr;
		this.attrs = attrs;
	}

	static from(buf) {

		const type = buf.slice(StunHeader.K_TYPE_OFF[0], StunHeader.K_TYPE_OFF[1]);

		const len = buf.slice(StunHeader.K_LEN_OFF[0], StunHeader.K_LEN_OFF[1]);
		
		const msglen = Attributes.decLen(len);

		const attrs = [];

		if (msglen > 0) {
			let attrptr = StunHeader.K_HDR_LEN;

			while (attrptr < buf.length) {
				const atype = buf.slice(attrptr + Attributes.TYPE_OFF[0], attrptr + Attributes.TYPE_OFF[1]);
				const alen = buf.slice(attrptr + Attributes.LEN_OFF[0], attrptr + Attributes.LEN_OFF[1]);
				const vlen = Attributes.decLen(alen);
				const aval = buf.slice(attrptr + Attributes.LEN_OFF[1], attrptr + Attributes.LEN_OFF[1] + vlen);
				attrs.push(Attributes.from({type: atype, len: alen, val: aval}));
				attrptr += (vlen + Attributes.K_TYPE_LEN + Attributes.K_LEN_LEN);
			}
		}

		const id = buf.slice(StunHeader.K_ID_OFF[0], StunHeader.K_ID_OFF[1]);
		const magic = buf.slice(StunHeader.K_MAGIC_OFF[0], StunHeader.K_MAGIC_OFF[1]);
		
		const msg = new this({
			hdr: StunHeader.from({type: type, len: len, id: id, magic: magic}),
			attrs: attrs,
		});
		return msg;
	}

	static attrByteLength(attrs) {
		return attrs.reduce((sum, attr) => {
			return sum + attr.length();
		}, 0);
	}

	serialize() {
		return Buffer.concat([this.hdr.serialize(), Buffer.concat(this.attrs.map((attr) => { 
			return attr.serialize(); 
		}))]);
	}
}

module.exports.ReturnMessage = ReturnMessage;
