// ==UserScript==
// @name         Desviament - Proton Bus Mods
// @namespace    https://github.com/Ago-Projects/desviament-protonbusmods
// @version      1.0
// @description  Direct download packages in protonbusmods.com
// @author       Ago'Projects
// @match        *://protonbusmods.com/*
// @grant        none
// ==/UserScript==

// Extract the link ID
function extractIdFromLink(href) {
  const regex = /\/download\/(\d+)\//;
  const match = href.match(regex);
  return match ? match[1] : null;
}

// Update links
function updateLinks() {
  const links = document.querySelectorAll('a[href^="/download/"]');

  links.forEach(link => {
    const id = extractIdFromLink(link.href);
    if (id) {
      link.href = `/track_download.php?id=${id}`;
      // console.log(`Link updated : ${link.href} (ID: ${id})`);
    }
  });
}

// Execute when loading page
document.addEventListener('DOMContentLoaded', updateLinks);

// Observe updates
const observer = new MutationObserver(updateLinks);
observer.observe(document.body, { childList: true, subtree: true });
