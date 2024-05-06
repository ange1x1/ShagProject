var timestamp = Date.now().toString();
var recvWindow = 5000;
var apiKey = 'aQ3STKC2b5bVlOC2RN'
var secret = '6LmbpS6d9Cme8U9lvldz9k4drfkthr4PhCpa'
var hashHex;
var hashArray;
function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
       hashArray = Array.from(new Uint8Array(hashBuffer));
       hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    });
  }
const sign = hash(secret+'accountType=UNIFIED&coin=BTC').then(console.log);
const getwallet = async () => {
    try {
        const res = await fetch(`https://api-demo.bybit.com/v5/account/wallet-balance?${hashHex}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-BAPI-API-KEY': apiKey,
                'X-BAPI-SIGN': hashHex,
                'X-BAPI-TIMESTAMP': timestamp,
            }
        })
        if (res.ok) {
            console.log(hashHex)
            const data = await res.json();
            console.log(data)
            return data;
        }
    } catch (error) {
        throw new Error(error);
    }
}


getwallet()
