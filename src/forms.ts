import browser from "webextension-polyfill";
import { createButton, createInput } from "./ui";

const isLastPage = Boolean(document.querySelector(".freebirdFormviewerViewNavigationSubmitButton"));
let linkInput: HTMLDivElement;

function createLink() {
  const hiddenInputs = [...document.querySelectorAll("input[type=hidden][name*=entry]:not([name$=sentinel])")] as HTMLInputElement[];
  const wrappingForm = document.querySelector("form")!;
  const entryMap = new Map<string, string>();

  const formResponses = JSON.parse(wrappingForm.dataset["response"]!.slice(4, -1)) as any[];
  formResponses.map(value => {
    entryMap.set(`entry_${value[0]}`, value[1][2].length ? value[1][2] : value[1][4]);
  })
  hiddenInputs.forEach(input => entryMap.set(input.name, input.value));

  const link = wrappingForm.action
    .replace(/forms\/u\/\d+\//, "forms/")
    .replace(/formResponse$/, "viewform")
    + "?"
    + [...entryMap.entries()].map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&");

  if(!linkInput) {
    linkInput = createInput();
    const innerLinkInput = (linkInput.querySelector("input") as HTMLInputElement);
    innerLinkInput.readOnly = true;
    linkInput.style.flex = "1";
    linkInput.style.marginRight = "8px";
    linkInput.style.width = "100%";
    linkInput.id = "google-form-url-creator__link-input"

    const copyLinkButton = createButton("コピー");
    copyLinkButton.addEventListener("click", () => {
      navigator.clipboard.writeText(link);
    })

    const linkWrapper = document.createElement("div");
    linkWrapper.style.display = "flex";
    linkWrapper.style.flexDirection = "row";
    linkWrapper.style.alignItems = "center";

    linkWrapper.appendChild(linkInput)
    linkWrapper.appendChild(copyLinkButton);
    
    document.querySelector(".freebirdFormviewerViewNavigationNavControls")!.appendChild(linkWrapper)
  }
  linkInput.dataset["value"] = link;
}

if(isLastPage) {
  const formNavigation: HTMLDivElement = document.querySelector("div.freebirdFormviewerViewNavigationLeftButtons")!;

  
  formNavigation.style.flex = "initial";
  const createURLButton = createButton("リンクを取得");
  createURLButton.addEventListener("click", createLink);
  formNavigation.appendChild(createURLButton);
}