let tabs = [];
let activeTab = null;

function createTab(url = "") {
  const newTab = { url };
  tabs.push(newTab);
  setActiveTab(newTab);  // Set active immediately upon creation
}

function renderTabs() {
  const tabsContainer = document.getElementById("tabs");
  tabsContainer.innerHTML = "";
  tabs.forEach((tab, index) => {
    const tabElement = document.createElement("li");
    tabElement.textContent = tab.url || "New Tab";
    
    // Close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.onclick = (e) => {
      e.stopPropagation(); // Prevent setting the closed tab as active
      closeTab(index);
    };

    tabElement.appendChild(closeButton);
    tabElement.onclick = () => setActiveTab(tab);

    if (tab === activeTab) {
      tabElement.classList.add("active");
    }

    tabsContainer.appendChild(tabElement);
  });
}

function setActiveTab(tab) {
  activeTab = tab;
  renderTabs();
  renderTabContent();
}

function renderTabContent() {
  const frameContainer = document.getElementById("frame-content");
  frameContainer.innerHTML = `<iframe src="${activeTab.url}" id="tab-frame" frameborder="0"></iframe>`;

  const tabContentContainer = document.getElementById("tab-content-container");
  tabContentContainer.innerHTML = `
    <div class="tab-content active">
      <input id="url-input" type="text" placeholder="Enter URL" value="${activeTab.url}">
      <button onclick="loadURL()" class="tab-btn">Load</button>
    </div>
  `;
}

function loadURL() {
  const urlInput = document.getElementById("url-input");
  if (!urlInput.value.trim()) {
    alert("Please enter a URL.");
    return;  // Exit the function if the input is empty
  }

  try {
    new URL(urlInput.value);  // This will validate if the URL is correctly formatted
    activeTab.url = urlInput.value; // Update the URL of the active tab
    renderTabContent();  // Re-render the iframe and input box with the new URL
    renderTabs();  // Update the tabs display
  } catch (error) {
    alert('Please enter a valid URL');
  }
}

function closeTab(index) {
  if (tabs.length > 1) {
    if (activeTab === tabs[index]) {
      setActiveTab(tabs[Math.max(index - 1, 0)]);
    }
    tabs.splice(index, 1);
    renderTabs();
  } else {
    alert("You cannot close the last tab.");
  }
}

function addTab() {
  createTab();
}

// Initialize with a default tab
addTab();
