function createOverlay() {
    // Créer un overlay pour l'article extrait
    document.body.insertAdjacentHTML(
        'beforeend',
        `
      <div id="article-overlay" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        color: #f0f0f0;
        overflow-y: auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        z-index: 9999;
      ">
        <button id="close-overlay" style="
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 10px 15px;
          font-size: 16px;
          background-color: #ff5c5c;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        ">Fermer</button>
        <div id="article-content"></div>
      </div>
    `
    );

    // Récupérer le contenu des balises <h1>, <h2>, <p>, <em>, <blockquote>, <li>, <strong>, <b>, <i>
    let content = '';
    const tags = ['h1', 'h2', 'p', 'em', 'blockquote', 'li', 'strong', 'b', 'i'];
    tags.forEach(tag => {
        document.querySelectorAll(tag).forEach(element => {
            content += `<${tag}>${element.textContent}</${tag}>`;
        });
    });

    // Ajouter le contenu extrait à l'overlay
    document.getElementById('article-content').innerHTML = content;

    // Fermer l'overlay au clic sur le bouton "Fermer"
    document.getElementById('close-overlay').addEventListener('click', () => {
        document.getElementById('article-overlay').remove();
    });
}


document.getElementById('activate-overlay').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: createOverlay // Appelle la fonction `createOverlay` pour ajouter l'overlay à la page
            });
        }
    });
});
