const button = document.createElement("button");
button.innerHTML = "capture";
document.body.append(button);
button.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia();
    const recorder = new MediaRecorder(stream);
    recorder.start();

    const [video] = stream.getVideoTracks();
    video.addEventListener("ended", () => {
        recorder.stop();

        recorder.addEventListener("dataavailable", (evt) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(evt.data);
            a.download = 'capture.webm';
            a.click();
        });
    });
});