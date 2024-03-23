setInterval(() => {
  const currentTime = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit', hour12: true});
  postMessage(currentTime)
}, 1000);