document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("loadingVideo");
  
    // Function to redirect after video finishes playing
    function redirectToPlayground() {
      window.location.href = "playground.html";
    }
  
    // Event listener to check when the video has ended
    videoPlayer.addEventListener("ended", redirectToPlayground);
  });
  