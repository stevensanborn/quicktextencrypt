chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "encryptDecrypt",
    title: "Encrypt/Decrypt",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "encryptDecrypt") {
    const selectedText = info.selectionText;
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html") + "?text=" + encodeURIComponent(btoa(selectedText)),
      type: "popup",
      width: 400,
      height: 300
    });
  }
});
