document.querySelector("#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(8) > div > div > div.freebirdFormviewerComponentsQuestionTextRoot > div")

export function createButton(label: string): HTMLDivElement {
  const ripple = document.createElement("div");
  ripple.classList.add("appsMaterialWizButtonPaperbuttonRipple", "exportInk");
  
  const focusOverlay = document.createElement("div");
  focusOverlay.classList.add("appsMaterialWizButtonPaperbuttonFocusOverlay", "exportOverlay");  
  
  const buttonLabel = document.createElement("span");
  buttonLabel.classList.add("appsMaterialWizButtonPaperbuttonLabel", "quantumWizButtonPaperbuttonLabel", "exportLabel");
  buttonLabel.innerText = label
  
  const buttonContent = document.createElement("span");
  buttonContent.classList.add("appsMaterialWizButtonPaperbuttonContent", "exportButtonContent");
  buttonContent.appendChild(buttonLabel);
  
  const button = document.createElement("div");
  button.classList.add("appsMaterialWizButtonEl", "appsMaterialWizButtonPaperbuttonEl", "appsMaterialWizButtonPaperbuttonFilled", "freebirdThemedFilledButtonM2");
  button.appendChild(ripple);
  button.appendChild(focusOverlay);
  button.appendChild(buttonContent);
  return button;
}

export function createInput(): HTMLDivElement {
  const input = document.createElement("input");
  input.classList.add("quantumWizTextinputPaperinputInput", "exportInput")

  const inputArea = document.createElement("div");
  inputArea.classList.add("quantumWizTextinputPaperinputInputArea");
  inputArea.appendChild(input);

  const inputUnderline = document.createElement("div");
  inputUnderline.classList.add("quantumWizTextinputPaperinputUnderline", "exportUnderline");

  const focusUnderline = document.createElement("div");
  focusUnderline.classList.add("quantumWizTextinputPaperinputFocusUnderline", "exportFocusUnderline", "animationInitialized")
  focusUnderline.style.transformOrigin = "61.5px center";

  const contentArea = document.createElement("div");
  contentArea.classList.add("quantumWizTextinputPaperinputContentArea", "exportContentArea");
  contentArea.appendChild(inputArea);
  contentArea.appendChild(inputUnderline);
  contentArea.appendChild(focusUnderline);

  const mainContent = document.createElement("div");
  mainContent.classList.add("quantumWizTextinputPaperinputMainContent", "exportContent")
  mainContent.appendChild(contentArea);

  const themedInput = document.createElement("div");
  themedInput.classList.add("quantumWizTextinputPaperinputEl", "freebirdFormviewerComponentsQuestionTextShort", "freebirdFormviewerComponentsQuestionTextTextInput", "freebirdThemedInput", "modeLight");
  themedInput.appendChild(mainContent);

  input.addEventListener("focus", () => themedInput.classList.add("isFocused"));
  input.addEventListener("blur", () => themedInput.classList.remove("isFocused"));
  input.addEventListener("input", () => { themedInput.dataset["value"] = input.value; });

  new MutationObserver(changes => {
    changes.forEach(change => {
      if(change.attributeName === "data-value") input.value = themedInput.dataset["value"]!;
    });
  }).observe(themedInput, {attributes: true});
    
  return themedInput;
}