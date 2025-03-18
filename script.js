function takeScreenshot() {
    // Check if the browser supports screen capture
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true })
            .then(stream => {
                // Create a canvas to draw the screenshot
                const canvas = document.createElement("canvas");
                const video = document.createElement("video");
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    // When the video metadata is loaded, we can start drawing the screenshot
                    video.play();
                    const width = video.videoWidth;
                    const height = video.videoHeight;
                    canvas.width = width;
                    canvas.height = height;

                    // Draw the current frame from the video to the canvas
                    const context = canvas.getContext("2d");
                    context.drawImage(video, 0, 0, width, height);

                    // Create an image from the canvas
                    canvas.toBlob(blob => {
                        // Save the screenshot as a PNG file
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'screenshot.png';
                        link.click();
                    });

                    // Stop the video stream after capturing
                    stream.getTracks().forEach(track => track.stop());
                };
            })
            .catch(error => {
                console.error('Error capturing the screen: ', error);
            });
    } else {
        alert("Screen capture is not supported in your browser.");
    }
}
