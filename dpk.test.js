const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns string when event.partitionKey provided as string", () => {
    const partitionKey = "KEY_TEST"
    const event = {
      partitionKey
    };
    const response = deterministicPartitionKey(event);
    expect(response).toBe(partitionKey);
  });
  it("Returns json formated string when event.partitionKey provided as array", () => {
    const partitionKey = [1,2,3]
    const event = {
      partitionKey
    };
    const response = deterministicPartitionKey(event);
    expect(response).toBe(JSON.stringify(partitionKey));
  });
  it("Returns json formated string when event.partitionKey provided as integer", () => {
    const partitionKey = 12345
    const event = {
      partitionKey
    };
    const response = deterministicPartitionKey(event);
    expect(response).toBe(JSON.stringify(partitionKey));
  });
  it("Returns hash when event provided but no event.partitionKey given", () => {
    const event = {
      randomKey: '123456'
    };
    const data = JSON.stringify(event);
    const expected = crypto.createHash("sha3-512").update(data).digest("hex");
    const response = deterministicPartitionKey(event);
    expect(response).toBe(expected);
  });
  it("Returns hash when event.partitionKey provided has length bigger than 256", () => {
    //260 length key
    const partitionKey = "Xgwe2cY77plEwWdwEFS6os3kfkxAPl5W9WS3jYWmRkYqyo405R7RWS232TZ07W9fk7B8He545ZG6jHOvSVn1xMc24KCFH1Ml6vynu3F87udMRsPv66b14Y8o6UgwvzgYGxKL3VjqSLxkrd89SD0HmQLhvmLovyBYf8G3w5156I2bR0dHPhRfC9zorm51pDN6jOmS626jn8ddOXML7O4zWxeSiRMcp72XHPX26q8P2cTRIYGNxDDUD20gosYI8jcNtzEe"
    const event = {
      partitionKey
    };
    const expected = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
    const response = deterministicPartitionKey(event);
    expect(response).toBe(expected);
  });
});
