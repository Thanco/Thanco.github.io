class Kanji {
  constructor(感じ, meaning, strokeCount, usage, rarity, image, attribution) {
    // Cursed UTF-8 coding
    this.感じ = 感じ;
    this.meaning = meaning;
    this.strokeCount = strokeCount;
    this.usage = usage;
    this.rarity = rarity;
    this.image = image;
    this.attribution = attribution;
  }

  get cardSection() {
    const section = document.createElement('section');

    const kanji = document.createElement('h3');
    kanji.innerHTML = this.感じ;
    section.appendChild(kanji);

    const image = new Image();
    image.src = `./images/${this.image}`;
    section.appendChild(image);

    const attribution = document.createElement('p');
    attribution.innerHTML = this.attribution;
    section.appendChild(attribution);

    section.onclick = () => {
        document.getElementById('content').appendChild(this.modal);
        console.log('Modal created');
    };

    return section;
  }

  get infoDiv() {
    const div = document.createElement('div');

    const kanji = document.createElement('h2');
    kanji.innerText = this.感じ;
    div.appendChild(kanji);

    const meaning = document.createElement('p');
    meaning.innerText = `Meaning: ${this.meaning}`;
    div.appendChild(meaning);

    const strokeCount = document.createElement('p');
    strokeCount.innerText = `Stroke Count: ${this.strokeCount}`;
    div.appendChild(strokeCount);

    const usage = document.createElement('p');
    usage.innerText = `Usage: ${this.usage}`;
    div.appendChild(usage);

    const rarity = document.createElement('p');
    rarity.innerText = `Rarity: ${this.rarity}`;
    div.appendChild(rarity);

    const image = new Image();
    image.src = `./images/${this.image}`;
    div.appendChild(image);

    const attribution = document.createElement('p');
    attribution.innerHTML = this.attribution;
    div.appendChild(attribution);

    return div;
  }

    get modal() {
        const modalBackground = document.createElement('div');
        modalBackground.classList.add('modal-background');

        const modal = document.createElement('div');
        modal.classList.add('modal-foreground');
        modal.id = 'modal-content';
        modalBackground.appendChild(modal);

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => {
            modalBackground.remove();
        };
        closeButton.classList.add('modal-close');
        modal.appendChild(closeButton);

        const info = this.infoDiv
        info.appendChild(closeButton);
        modal.appendChild(info);
        return modalBackground;
    }
}

const kanjiList = [
    new Kanji('時', 'Time', 10, 'Noun', 'Common', 'time.jpg', 'Photo by <a href="https://unsplash.com/@oceanng?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ocean Ng</a> on <a href="https://unsplash.com/photos/round-analog-wall-clock-pointing-at-1009-L0xOtAnv94Y?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'),
    new Kanji('分', 'Minute', 4, 'Noun', 'Common', 'minute.jpg', 'Photo by <a href="https://unsplash.com/@venmer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Stanislav</a> on <a href="https://unsplash.com/photos/silver-and-white-round-analog-watch-2Yj6MBvJ0sg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'),
    new Kanji('今', 'Now', 4, 'Adverb', 'Common', 'now.jpg', 'Photo by <a href="https://unsplash.com/@brett_jordan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Brett Jordan</a> on <a href="https://unsplash.com/photos/brown-wooden-blocks-on-white-surface-0jIovxJj7pY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'),
    new Kanji('日', 'Day', 4, 'Noun', 'Common', 'day.jpg', 'Photo by <a href="https://unsplash.com/@towfiqu999999?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Towfiqu barbhuiya</a> on <a href="https://unsplash.com/photos/a-calendar-with-red-push-buttons-pinned-to-it-bwOAixLG0uc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'),
    new Kanji('本', 'Book', 5, 'Noun', 'Frequent', 'book.jpg', 'Photo by <a href="https://unsplash.com/@qmikola?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mikołaj</a> on <a href="https://unsplash.com/photos/white-book-page-with-black-background-DCzpr09cTXY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'),
    new Kanji('人', 'Person', 2, 'Noun', 'Common', 'person.jpg', 'Photo by <a href="https://unsplash.com/@pabloheimplatz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pablo Heimplatz</a> on <a href="https://unsplash.com/photos/person-standing-on-hill-EAvS-4KnGrk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'),
    new Kanji('名', 'Name', 6, 'Noun', 'Infrequent', 'name.jpg', 'Photo by <a href="https://unsplash.com/@timmossholder?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Tim Mossholder</a> on <a href="https://unsplash.com/photos/white-and-red-pitcher-lFNucqUzPC4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'),
    new Kanji('山', 'Mountain', 3, 'Noun', 'Uncommon', 'mountain.jpg', 'Photo by <a href="https://unsplash.com/@mvds?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mads Schmidt Rasmussen</a> on <a href="https://unsplash.com/photos/ice-capped-mountain-at-daytime-xfngap_DToE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'),
];

kanjiList.forEach((kanji) => {
    const newSection = kanji.cardSection;

    document.getElementById('content').appendChild(newSection);
});