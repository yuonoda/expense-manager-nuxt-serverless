import https from "https";

export default function({ $axios, app, store }) {
  $axios.onRequest(config => {
    config.httpsAgent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV === "production"
    });
  });
}
