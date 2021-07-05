const SUBJECTS = {
  CS: {id: "cs", buttonId: "cs-button"},
  PS: {id: "ps", buttonId: "ps-button"},
  ENG: {id: "engineering", buttonId: "engineering-button"},
}
const STORY_ELEMENTS = document.getElementsByClassName("story-part");
const ME_DESCRIPTIONS = document.getElementsByClassName("me-description");
const BUTTERFLIES = {
  DEFAULT: "default.PNG",
  BLUR: "butterflyBlur.PNG",
  SHARPEN: "butterflySharpen.PNG",
  SEPIA: "butterflySepia.PNG",
  MONOCHROME: "butterflyMonochrome.PNG",
  MOSAIC: "butterflyMosaic.PNG",
  DOWNSCALE: "butterflyDownscale.PNG",
}

let currentDescription = ME_DESCRIPTIONS.length - 1;
let currentSubject = null;
let currentStory = 0;

/**
 * On load, set CS as the active subject and begin the description transitions.
 */
const onLoad = () => {
  setActiveSubject(SUBJECTS.CS);
  transitionDescription();
}

/**
 * Sets the element of the given id to its default style.
 * @param id the element id
 */
const setDefaultStyle = (id) => {
  document.getElementById(id).style = null;
}

/**
 * Hides the element by setting its opacity to 0. Sets top to 0 to produce the
 * effect of disappearing by going off the top of the screen.
 * @param id the element id
 */
const topHide = (id) => {
  document.getElementById(id).style.top = "0";
  document.getElementById(id).style.opacity = "0";
}

/**
 * Transitions between the different me descriptions every 3000 ms.
 */
const transitionDescription = () => {
  const oldDescription = ME_DESCRIPTIONS[currentDescription];
  oldDescription.style.fontSize = "0";
  oldDescription.style.opacity = "0";
  currentDescription++;
  if (currentDescription >= ME_DESCRIPTIONS.length) {
    currentDescription = 0;
  }
  const nextDescription = ME_DESCRIPTIONS[currentDescription];
  nextDescription.style.fontSize = "64px";
  nextDescription.style.opacity = "1";
  setTimeout(transitionDescription, 3000);
}

/**
 * Sets the given subject as the active subject, updating styling appropriately.
 * @param subject the new active subject
 */
const setActiveSubject = (subject) => {
  if (subject !== currentSubject) {
    if (currentSubject !== null) {
      setDefaultStyle(currentSubject.id);
      setDefaultStyle(currentSubject.buttonId);
    }
    document.getElementById(subject.id).style.display = "block";
    const button = document.getElementById(subject.buttonId);
    button.style.fontStyle = "normal";
    button.style.fontWeight = "bold";
    button.style.color = "var(--navy)";
    button.style.fontSize = "34px";
    currentSubject = subject;
  }
}

/**
 * Resets the choose-your-own story description.
 */
const replayStory = () => {
  for (let i = 0; i < STORY_ELEMENTS.length; i++) {
    STORY_ELEMENTS[i].style = null;
  }
  document.getElementById("story-button").innerText = "Continue...";
  currentStory = 0;
}

/**
 * Shows the next part of the choose-your-own story description.
 */
const continueStory = () => {
  STORY_ELEMENTS[currentStory].style.opacity = "1";
  currentStory = currentStory + 1;
  if (currentStory === STORY_ELEMENTS.length) {
    document.getElementById("story-button").innerText = "Replay";
  }
}

/**
 * Handles what to do when the story button is clicked, show the next story
 * element or replay.
 */
const handleStoryClick = () => {
  if (currentStory < STORY_ELEMENTS.length) {
    continueStory();
  } else {
    replayStory();
  }
}

/**
 * Sets the butterfly image to the given butterfly.
 * @param butterfly the file name of the butterfly image under the butterfly directory
 */
const setButterflyImage = (butterfly) => {
  document.getElementById("butterfly-image").src = "assets/butterfly/"
      + butterfly;
}
