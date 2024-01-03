// Select static & shared page elements
const overlayWrapper = document.getElementById("js-overlay");
const overlayContent = document.getElementById("js-overlay-target");

function toggleImageView(index) {
  const image = document.getElementById(`js-gallery-image-${index}`);

  // Apply a CSS class which contains the view-transition-name before animation starts
  image.classList.add("gallery__image--active");

  const imageParentElement = image.parentElement;

  if (!document.startViewTransition) {
    moveImageToModal(image);
  } else {
    document.startViewTransition(() => moveImageToModal(image));
  }

  // This is now an async function
  overlayWrapper.onclick = async function () {
    if (!document.startViewTransition) {
      moveImageToGrid(imageParentElement);
      return;
    }

    const transition = document.startViewTransition(() =>
      moveImageToGrid(imageParentElement)
    );

    // Wait for animation to complete
    await transition.finished;

    // Remove the class which contains the page-transition-tag after animation ends
    image.classList.remove("gallery__image--active");
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
