import os from "os-utils";

const API_URL = "http://localhost:3000/api/workshops";

let completedRequests = 0;
let failedRequests = 0;

function monitorSystem() {
  os.cpuUsage((cpuUsage) => {
    console.log(`CPU Usage: ${(cpuUsage * 100).toFixed(2)}%`);
  });
  console.log(
    `Memory Usage: ${((1 - os.freememPercentage()) * 100).toFixed(2)}%`,
  );
}

async function startLoadTest() {
  console.log("Starting load test...");

  const monitorInterval = setInterval(monitorSystem, 500); // Monitor every 0.5 seconds

  let promises = [];

  let cnt = 0;
  for (let i = 1; i <= 10; i++) {
    const requestPerSecond = i * 200;
    for (let j = 0; j < requestPerSecond; j++) {
      cnt++;
      const id = cnt;
      const delayMs = i * 1000 + (j * 1000) / (requestPerSecond - 1);
      promises.push(
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(
              fetch(API_URL)
                .then(() => {
                  // console.log(`id ${id} completed`);
                  completedRequests++;
                })
                .catch(() => {
                  // console.log(`id ${id} failed`);
                  failedRequests++;
                }),
            );
          }, delayMs),
        ),
      );
    }
  }
  await Promise.all(promises);

  console.log("total request: ", cnt);

  clearInterval(monitorInterval);
  console.log("Load test completed.");
  console.log(`Successful requests: ${completedRequests}`);
  console.log(`Failed requests: ${failedRequests}`);
}

startLoadTest();
