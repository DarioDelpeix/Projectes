        // URL del fitxer RSS
        const rssUrl = 'rss.xml';

        // Funció per carregar i mostrar el contingut del fitxer RSS
        fetch(rssUrl)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");

                const items = xmlDoc.getElementsByTagName("item");
                let output = "";

                // Recórrer els elements del fitxer RSS
                for (let i = 0; i < items.length; i++) {
                    const title = items[i].getElementsByTagName("title")[0].textContent;
                    const link = items[i].getElementsByTagName("link")[0].textContent;
                    const description = items[i].getElementsByTagName("description")[0].textContent;
                    const pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;

                    output += `
                        <div class="rss-item">
                            <h3><a href="${link}" target="_blank">${title}</a></h3>
                            <p>${description}</p>
                            <small>Publicat el: ${pubDate}</small>
                        </div>
                    `;
                }

                // Mostrar el contingut al div amb id 'rss-feed'
                document.getElementById("rss-feed").innerHTML = output;
            })
            .catch(error => {
                console.error('Error carregant el fitxer RSS:', error);
                document.getElementById("rss-feed").innerText = "No s'ha pogut carregar el contingut RSS.";
            });

