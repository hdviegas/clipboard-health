const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
	const TRIVIAL_PARTITION_KEY = "0";
	const MAX_PARTITION_KEY_LENGTH = 256;
    const HASH_ALGORITHM = "sha3-512";
    const HASH_ENCODING = "hex";

	if (!event) {
		return TRIVIAL_PARTITION_KEY;
	} else {
		if (event.partitionKey) {
			if (typeof event.partitionKey !== "string") {
				event.partitionKey = JSON.stringify(event.partitionKey);
			}

			if (event.partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
              event.partitionKey = crypto.createHash(HASH_ALGORITHM).update(event.partitionKey).digest(HASH_ENCODING);
			}

			return event.partitionKey;
		} else {
			const data = JSON.stringify(event);
			return crypto.createHash(HASH_ALGORITHM).update(data).digest(HASH_ENCODING);
		}
	}
};