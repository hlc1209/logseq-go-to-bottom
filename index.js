/*
 * @Author: hlc1209
 * @Date: 2025-03-06
 * 
 * Copyright (c) 2025 by hlc1209, All Rights Reserved. 
 * 
 * MIT License
 */

let curPageId = "";

function getMainBox() {
  return top.document.getElementById("main-content-container");
}

const model = {
  goToBottom() {
    initiateGoToBottom();
  }
};

function initiateGoToBottom() {
  if (window.LOGSEQ_BACK_TO_BOTTOM_ATTEMPT) return;
  window.LOGSEQ_BACK_TO_BOTTOM_ATTEMPT = true;

  const targetPageId = curPageId;
  const mainBox = getMainBox();
  const mainRect = mainBox.getBoundingClientRect();

  function goToBottomLogic() {
    if (curPageId !== targetPageId) {
      window.LOGSEQ_BACK_TO_BOTTOM_ATTEMPT = false;
      return;
    }

    const scrollHeight = mainBox.scrollHeight;
    const scrollTop = mainBox.scrollTop;
    const clientHeight = mainBox.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      window.LOGSEQ_BACK_TO_BOTTOM_ATTEMPT = false;
      return;
    }

    mainBox.scrollTop = scrollHeight;

    setTimeout(() => {
      goToBottomLogic();
    }, 300);
  }

  goToBottomLogic();
}

async function main() {
  logseq.provideModel(model);

  logseq.App.registerUIItem("toolbar", {
    key: "go-to-bottom",
    template: `
      <a class="button" data-on-click="goToBottom" title="Go To Bottom">
        <svg 
          style="width: 20px; height: 20px;"
          xmlns="http://www.w3.org/2000/svg" 
          class="icon icon-tabler icon-tabler-square-rounded-arrow-down" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          stroke-width="2" 
          stroke="currentColor" 
          fill="none" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M16 12l-4 4l-4 -4"></path>
          <path d="M12 8v8"></path>
          <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
        </svg>
      </a>
    `,
  });
}

logseq.ready(main).catch(console.error);