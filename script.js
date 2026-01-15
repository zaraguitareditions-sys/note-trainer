const { Factory, StaveNote, Formatter, Barline } = Vex.Flow;

const output = document.getElementById('output');
const buttons = document.querySelectorAll('#keyboard button');
const result = document.getElementById('result');

// ====== ROZSAH NOT ======
const notes = [
  'c/3','d/3','e/3','f/3','g/3','a/3','b/3',
  'c/4','d/4','e/4','f/4','g/4','a/4','b/4',
  'c/5','d/5','e/5','f/5','g/5','a/5','b/5',
  'c/6','d/6','e/6','f/6','g/6','a/6','b/6'
];

let currentNote = null;
let locked = false;

// ====== VYKRESLENÍ NOTY ======
function drawRandomNote() {
  output.innerHTML = '';
  result.textContent = '';
  locked = false;
  buttons.forEach(b => b.classList.remove('correct', 'wrong'));

  const vf = new Factory({
    renderer: { elementId: 'output', width: 420, height: 200 }
  });
  const context = vf.getContext();

  // 👉 sjednocení kresby (linky + taktová čára)
  context.setStrokeStyle('#000');
  context.setFillStyle('#000');
  context.setLineWidth(1.5);

  const stave = vf.Stave({ x: 10, y: 60, width: 380 });
  stave.setBegBarType(Barline.type.NONE);
  stave.addClef('treble');

  // 👉 nota cca v první třetině osnovy
  stave.setNoteStartX(stave.getX() + stave.getWidth() * 0.33);

  stave.setStyle({
    strokeStyle: '#000',
    fillStyle: '#000'
  });

  stave.setContext(context);
  stave.draw();

  currentNote = notes[Math.floor(Math.random() * notes.length)];

  const note = new StaveNote({
    clef: 'treble',
    keys: [currentNote],
    duration: 'q'
  });

  Formatter.FormatAndDraw(context, stave, [note]);
}

// ====== KLIK NA KLÁVESU ======
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (locked) return;

    const chosen = btn.dataset.note;
    buttons.forEach(b => b.classList.remove('correct', 'wrong'));

    if (chosen === currentNote) {
      locked = true;
      btn.classList.add('correct');
      result.textContent = 'Správně ✔';
      setTimeout(drawRandomNote, 300);
    } else {
      btn.classList.add('wrong');
      result.textContent = 'Zkus znovu';
    }
  });
});

// ====== START ======
drawRandomNote();
