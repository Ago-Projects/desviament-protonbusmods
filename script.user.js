// ==UserScript==
// @name         Desviament - Proton Bus Mods
// @namespace    https://github.com/Ago-Projects/desviament-protonbusmods
// @version      1.0
// @description  Direct download packages in protonbusmods.com
// @author       Ago'Projects
// @match        *://protonbusmods.com/*
// @license      GPLv3
// @homepage     https://github.com/Ago-Projects/desviament-protonbusmods
// @supportURL   https://github.com/Ago-Projects/desviament-protonbusmods/issues
// @updateURL    https://raw.githubusercontent.com/Ago-Projects/desviament-protonbusmods/main/script.user.js
// @downloadURL  https://raw.githubusercontent.com/Ago-Projects/desviament-protonbusmods/main/script.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Extract the link ID
    function extractIdFromLink(href) {
        try {
            const regex = /\/download\/(\d+)\//;
            const match = href.match(regex);
            return match ? match[1] : null;
        } catch (e) {
            console.error("Error in extractIdFromLink:", e);
            return null;
        }
    }

    // Update links
    function updateLinks() {
        const links = document.querySelectorAll('a[href^="/download/"]:not([data-processed])');

        links.forEach(link => {
            const id = extractIdFromLink(link.href);
            if (id) {
                link.href = `/track_download.php?id=${id}`;
                link.setAttribute('data-processed', 'true');
            }
        });
    }

    // Execute when loading page
    if (document) {
        document.addEventListener('DOMContentLoaded', updateLinks);

        // Observe updates
        const observer = new MutationObserver(updateLinks);
        observer.observe(document.body, { childList: true, subtree: true });

        // Cleanup
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
        });
    }
})();
