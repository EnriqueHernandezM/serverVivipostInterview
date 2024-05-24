export default function bodyParse(req) {
  return new Promise((resolve, reject) => {
    let totalOfData = "";
    req
      .on("data", (chunk) => (totalOfData += chunk))
      .on("end", () => {
        req.body = JSON.parse(totalOfData);
        resolve();
      })
      .on("error", (err) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        console.log(err);
        reject();
      });
  });
}
