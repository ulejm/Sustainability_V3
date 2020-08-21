export default [(group, country)=>`

<h1>Aufgabenbeschreibung</h1>
<p>Liebe Teilnehmerin, lieber Teilnehmer</p>

<p>Heute kaufen Sie Lebensmittel in einem Online-Supermarkt ein. </p>

<p>	Wir bitten Sie die Lebensmittel einzukaufen, die Sie <b>für sich selbst für den Zeitraum von zwei Tagen</b> einkaufen würden. Dazu steht Ihnen ein <b>Budget von maximal ${country == 'de' ? '€15':'CHF 25.-'}</b> zur Verfügung. Gehen Sie bitte davon aus, dass Sie einen <b>gewöhnlichen Einkauf</b> durchführen. Aussergewöhnliche Ereignisse, die in der kommenden Woche anstehen könnten (z.B. ein geplantes gemeinsames Essen mit Freunden), bitten wir Sie, nicht in Ihren Einkauf einzubeziehen.
</p>`,(group, country)=>`

<p>Wenn Sie ein Produkt kaufen möchten, geht das <b>via Klick auf „Auf die Einkaufsliste“</b> oder <b>durch einen Klick auf das kleine „Plus“ in der Produktübersicht</b> (siehe unten). In die Detailansicht wechseln Sie, indem Sie auf das Bild des Produktes oder seinen Namen klicken. </p>
<img src="${chrome.runtime.getURL('task-1.png')}"/>
<img src="${chrome.runtime.getURL('task.png')}" width="300px"/>

<p>Die Detailansicht liefert folgende Informationen zu dem Produkt:</p>
<li style="padding-left:20px">Name des Produktes</li>
<li style="padding-left:20px">Detaillierte Abbildung und Produktbeschreibung</li>
<li style="padding-left:20px">Preis</li>
<li style="padding-left:20px">Allgemeine Produktinformationen (Kühlung, Verpackungsart, Herkunft etc.) </li>
<li style="padding-left:20px">Zutaten des Produktes</li>
${group == 'A' ? '<li style="padding-left:20px">Nachhaltigkeitsbewertung dargestellt als fünfstufige Farb- und Zahlenskala, die einen Überblick über die Nachhaltigkeit eines Produktes liefert (-2, -1, 0, +1, +2). Die Nachhaltigkeitsbewertung bezieht Erderwärmung, Feinstaubbelastung, Wassernutzung, Bodennutzung, Tierwohl und soziale Aspekte mit ein. <img style="max-height:800px" src="'+chrome.runtime.getURL('task-AB-ch.png')+'"/></li>':'<img style="max-height:800px" src="'+chrome.runtime.getURL('task-C-ch.png')+'"/>'}


<p>Die Artikel, die sich aktuell in ihrem Warenkorb befinden, können Sie jederzeit durch einen Klick auf das Einkaufswagen-Symbol am oberen rechten Bildrand einsehen. Dort können Sie auch bereits gewählte Produkte wieder entfernen. Über das „i“-Symbol können Sie diese Aufgabenbeschreibung jederzeit erneut aufrufen. </p>

<p>Wenn Sie ein Produkt kaufen möchten, fügen Sie es zu Ihrem Warenkorb hinzu. Sobald Sie alle gewünschten Produkte hinzugefügt haben, klicken Sie auf das Einkaufswagen-Symbol am oberen rechten Rand und wählen unten „Zur Kasse“.<img src="${chrome.runtime.getURL("task-2.png")}" width="100px"/></p>
`, (group, country) => country == 'ch' ? '<p><b>Als Vergütung für die Teilnahme an der Studie werden unter allen Teilnehmenden drei Personen ausgelost, die ihren zusammengestellten Warenkorb erhalten.</b> Geben Sie dazu bitte am Ende der Umfrage Ihre E-Mail-Adresse an, damit wir Sie im Gewinnfall kontaktieren können. Die E-Mail-Adresse dient nur zur Benachrichtigung und wird nach der Studie gelöscht. </p>' : '<p><b>Als zusätzliche Vergütung für die Teilnahme an der Studie werden unter allen Teilnehmenden drei Personen ausgelost, die ihren zusammengestellten Warenkorb erhalten.</b> Geben Sie dazu bitte am Ende der Umfrage Ihre E-Mail-Adresse an, damit wir Sie im Falle eines Gewinns kontaktieren können. Die E-Mail-Adresse dient nur zur Benachrichtigung und wird nach der Studie gelöscht.</p>']
