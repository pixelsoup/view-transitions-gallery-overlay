// Select static & shared page elements
const overlayWrapper = document.getElementById("js-overlay");
const overlayContent = document.getElementById("js-overlay-target");

function toggleImageView(index) {
  const image = document.getElementById(`js-gallery-image-${index}`);

  const imageParentElement = image.parentElement;

  if (!document.startViewTransition) {
    // Fallback if View Transitions API is not supported
    moveImageToModal(image);
  } else {
    // Start transition with the View Transitions API
    document.startViewTransition(() => moveImageToModal(image));
  }

  overlayWrapper.onclick = function () {
    if (!document.startViewTransition) {
      moveImageToGrid(imageParentElement);
      return;
    }

    document.startViewTransition(() => moveImageToGrid(imageParentElement));
  };
}

// Helper functions for moving the image around and toggling the overlay

function moveImageToModal(image) {
  overlayWrapper.classList.add("overlay--active");

  overlayContent.append(image);
}

function moveImageToGrid(imageParentElement) {
  imageParentElement.append(overlayContent.querySelector("img"));

  overlayWrapper.classList.remove("overlay--active");
}
