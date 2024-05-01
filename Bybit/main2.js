function bybit_demo_balance(AccessKey, SecretKey) {
    const params = {
        'accountType' : 'UNIFIED',
        'coin' : 'BTC',
        "api_key": AccessKey,
        "timestamp": Math.round(new Date().getTime()),
        "recv_window": 10000
    };
    const sortedParams = Object.entries(params).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    const param_str = sortedParams.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const hash = CryptoJS.HmacSHA256(param_str, SecretKey);
    const signature = CryptoJS.enc.Hex.stringify(hash);
    const sign_real = {
        "sign": signature
    };
    const signStr = `sign=${encodeURIComponent(sign_real.sign)}`;
    const full_param_str = `${param_str}&${signStr}`;
    console.log(full_param_str)
    const url = "https://api-demo.bybit.com/v5/account/wallet-balance";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    return new Promise((resolve, reject) => {
        fetch(`${url}?${full_param_str}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.result.list[0].totalEquity);
            })
            .catch(error => {
                console.log(error);
            });
    });
}
function bybit_demo_balance1(AccessKey, SecretKey) {
    const params = {
        'symbol':'LEVERUSDT',
        'intervalTime': 'D',
        "api_key": AccessKey,
        "timestamp": Math.round(new Date().getTime()),
        "recv_window": 10000
    };
    const sortedParams = Object.entries(params).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    const param_str = sortedParams.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const hash = CryptoJS.HmacSHA256(param_str, SecretKey);
    const signature = CryptoJS.enc.Hex.stringify(hash);
    const sign_real = {
        "sign": signature
    };
    const signStr = `sign=${encodeURIComponent(sign_real.sign)}`;
    const full_param_str = `${param_str}&${signStr}`;
    const url = "https://api-demo.bybit.com/v5/market/index-price-kline";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    return new Promise((resolve, reject) => {
        fetch(`${url}?${full_param_str}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    });
}
function bybit_demo_balance2(AccessKey, SecretKey) {
    const params = {
        'category':'inverse',
        'symbol':'BTCUSDT',
        "api_key": AccessKey,
        "timestamp": Math.round(new Date().getTime()),
        "recv_window": 10000
    };
    const sortedParams = Object.entries(params).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    const param_str = sortedParams.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const hash = CryptoJS.HmacSHA256(param_str, SecretKey);
    const signature = CryptoJS.enc.Hex.stringify(hash);
    const sign_real = {
        "sign": signature
    };
    const signStr = `sign=${encodeURIComponent(sign_real.sign)}`;
    const full_param_str = `${param_str}&${signStr}`;
    const url = "https://api-demo.bybit.com/v5/position/list";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    return new Promise((resolve, reject) => {
        fetch(`${url}?${full_param_str}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    });
}
function bybit_demo_balance3(AccessKey, SecretKey) {
    const params = {
        'accountType':'FUND',
        'coin':'SOL',
        "api_key": AccessKey,
        "timestamp": Math.round(new Date().getTime()),
        "recv_window": 10000
    };
    const sortedParams = Object.entries(params).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    const param_str = sortedParams.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const hash = CryptoJS.HmacSHA256(param_str, SecretKey);
    const signature = CryptoJS.enc.Hex.stringify(hash);
    const sign_real = {
        "sign": signature
    };
    const signStr = `sign=${encodeURIComponent(sign_real.sign)}`;
    const full_param_str = `${param_str}&${signStr}`;
    const url = "https://api-demo.bybit.com/v5/asset/transfer/query-account-coins-balance";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    return new Promise((resolve, reject) => {
        fetch(`${url}?${full_param_str}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    });
}
bybit_demo_balance("aQ3STKC2b5bVlOC2RN","6LmbpS6d9Cme8U9lvldz9k4drfkthr4PhCpa")