class ErrorCode {
}

let errCode = {
    OK: 0,
    ValidateSignatureError: -40001,
    ParseXmlError: -40002,
    ComputeSignatureError: -40003,
    IllegalAesKey: -40004,
    ValidateCorpidError: -40005,
    EncryptAESError: -40006,
    DecryptAESError: -40007,
    IllegalBuffer: -40008,
    EncodeBase64Error: -40009,
    DecodeBase64Error: -40010,
    GenReturnXmlError: -40011,
};

for (const key in errCode) {
    if (errCode.hasOwnProperty(key)) {
        const element = errCode[key];
        ErrorCode[key] = element;
    }
}


module.exports = ErrorCode;
