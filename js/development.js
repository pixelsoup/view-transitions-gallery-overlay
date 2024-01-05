// Select static & shared page elements
const overlayWrapper = document.getElementById("js-overlayWrapper");
const overlayContent = document.getElementById("js-overlayTarget");

function toggleImageView(index) {
  const galleryImage = document.getElementById(`js-gallery-image-${index}`);
  // Apply a CSS class which contains the view-transition-name before animation starts
  galleryImage.classList.add("galleryImageActive");
  const imageParentElement = galleryImage.parentElement;

  if (!document.startViewTransition) {
    moveImageToModal(galleryImage);
  } else {
    document.startViewTransition(() => moveImageToModal(galleryImage));
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
    galleryImage.classList.remove("galleryImageActive");
  };
}

// Helper functions for moving the image around and toggling the overlay
function moveImageToModal(element) {
  overlayWrapper.classList.add("overlayWrapperActive");
  overlayContent.append(element);
}

function moveImageToGrid(imageParentElement) {
  imageParentElement.append(overlayContent.querySelector(".galleryImage"));
  overlayWrapper.classList.remove("overlayWrapperActive");
}
