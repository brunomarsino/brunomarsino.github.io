document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("loadingVideo");

  video.addEventListener("ended", function () {
    window.location.href = "3dModelTest.html";
  });
});