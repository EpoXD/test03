import https from 'https';
import { URL } from 'url';
import querystring from 'querystring';

class Acts {
    doRequest(tag, url, method, data) {
        const postData = querystring.stringify(data);
        const urlObj = new URL(url);

        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname,
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, res => {
            let body = '';
            res.on('data', chunk => { body += chunk; });
            res.on('end', () => {
                console.log(`[${new Date().toLocaleTimeString()}] ${tag} Response Status: ${res.statusCode}`);
                console.log(`[${tag}] Response Body: ${body}`);
            });
        });

        req.on('error', e => {
            console.error(`[${tag}] Request Error:`, e.message);
        });

        req.write(postData);
        req.end();
    }

    Post(tag, url, data, method) {
        console.log(`\n=== Sending ${tag} Request ===`);
        console.log(`Tag: ${tag}`);
        console.log(`URL: ${url}`);
        console.log(`Data:`, data);
        console.log(`Method: ${method}`);

        this.doRequest(tag, url, method, data);
    }
}

const INTERVAL_SECONDS = 305;
let countdown = INTERVAL_SECONDS;

function sendBothRequests() {
    const acts = new Acts();

    acts.Post(
        "Gems",
        "https://master.evo.pixelhorns.com/api/client/user/collectibles/claim/pack/3",
        { uuid: "6dda7e2677e14a4695fcdb7ae33e92f3" },
        "POST"
    );

    acts.Post(
        "Gold",
        "https://master.evo.pixelhorns.com/api/client/user/collectibles/claim/pack/1",
        { uuid: "6dda7e2677e14a4695fcdb7ae33e92f3" },
        "POST"
    );

    acts.Post(
        "Gems",
        "https://master.evo.pixelhorns.com/api/client/user/collectibles/claim/pack/3",
        { uuid: "1e968cd8-2354-41e4-be16-3544788c0627" },
        "POST"
    );

    acts.Post(
        "Gold",
        "https://master.evo.pixelhorns.com/api/client/user/collectibles/claim/pack/1",
        { uuid: "1e968cd8-2354-41e4-be16-3544788c0627" },
        "POST"
    );

    acts.Post(
        "Gems",
        "https://master.evo.pixelhorns.com/api/client/user/collectibles/claim/pack/3",
        { uuid: "8fc7a7f6-a3a3-488f-8edb-d239f3f79d23" },
        "POST"
    );

    acts.Post(
        "Gold",
        "https://master.evo.pixelhorns.com/api/client/user/collectibles/claim/pack/1",
        { uuid: "8fc7a7f6-a3a3-488f-8edb-d239f3f79d23" },
        "POST"
    );


    countdown = INTERVAL_SECONDS;


}

sendBothRequests();

setInterval(() => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    console.log(`⏳ Next request in: ${formatted}`);

    countdown--;

    if (countdown < 0) {
        sendBothRequests();
    }
}, 1000);
