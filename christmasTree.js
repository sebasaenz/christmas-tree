const { r, g, b, w, c, m, y, k } = [
    ['r', 1], ['g', 2], ['b', 4], ['w', 7],
    ['c', 6], ['m', 5], ['y', 3], ['k', 0],
  ].reduce((cols, col) => ({
    ...cols,  [col[0]]: f => `\x1b[3${col[1]}m${f}\x1b[0m`
  }), {});

const rowSize = 100;

const randomBinary = () => (Math.round(Math.random()) == 1) ? g(1) : y(0);
const randomBackground = () => k(['-', '~'][Math.round(Math.random())]);

const drawRow = size => new Array(rowSize).fill('')
    .map((_, idx) => idx >= (rowSize - size) / 2 && idx < rowSize - (rowSize - size) / 2 ? randomBinary() : randomBackground())
    .join('');

const drawLevel = (from, to) => {
    if (from > to) {
        return;
    }

    console.log(drawRow(from));
    drawLevel(from + 2, to);
}

const drawTrunk = (height, length) => {
    if (height <= 0) {
        return;
    }

    console.log(
        new Array(rowSize).fill('')
            .map((_, idx) => idx >= Math.floor((rowSize - length) / 2) && idx <= Math.ceil(rowSize - (rowSize - length) / 2) ? m('|') : randomBackground())
            .join('')
    );

    drawTrunk(--height, length);
}

const drawStar = () => {
    console.log(
        new Array(rowSize).fill('').map((el, idx) => idx == Math.floor(rowSize / 2) ? r('#') : randomBackground()).join('')
    );
}

const makeTree = () => {
    drawStar();
    drawLevel(1, Math.floor(rowSize / 100 * 13));
    drawLevel(Math.floor(rowSize / 100 * 9), Math.floor(rowSize / 100 * 21));
    drawLevel(Math.floor(rowSize / 100 * 17), Math.floor(rowSize / 100 * 35));
    drawTrunk(Math.floor(rowSize / 20), Math.floor(rowSize / 10));
}

makeTree();
