document.addEventListener('DOMContentLoaded', function() {
  const mainVideo = document.getElementById('mainVideo');
  const playBtns = document.querySelectorAll('.play-btn');

  // Restore the last played video in the feature container from localStorage
  const lastPlayedVideo = localStorage.getItem('lastPlayedVideo');
  if (lastPlayedVideo) {
      mainVideo.querySelector('source').src = lastPlayedVideo;
      mainVideo.load();  // Reload the video element
  }

  // Function to play selected video in the feature container
  window.playVideo = function(img) {
      const videoSrc = img.getAttribute('data-video-src');
      const currentFeatureVideoSrc = mainVideo.querySelector('source').src;

      // Check if the selected video is already playing
      if (videoSrc !== currentFeatureVideoSrc) {
          // Update the video source of the feature video
          mainVideo.querySelector('source').src = videoSrc;
          mainVideo.load();  // Reload the video element
          mainVideo.play();

          // Save the current state to localStorage
          localStorage.setItem('lastPlayedVideo', videoSrc);
      }

      // Hide the play buttons while video is playing
      hidePlayBtns();
  };

  // Play the video only when the play button is clicked
  window.playFeatureVideo = function() {
      mainVideo.play();
      hidePlayBtns();
  };

  // Function to hide play buttons
  function hidePlayBtns() {
      playBtns.forEach(btn => {
          btn.style.display = 'none';
      });
  }

  // Show play button when video is paused or ended
  mainVideo.addEventListener('pause', showPlayBtns);
  mainVideo.addEventListener('ended', showPlayBtns);

  function showPlayBtns() {
      playBtns.forEach(btn => {
          btn.style.display = 'block';
      });
  }
});
