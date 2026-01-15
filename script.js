// ================================
// VexFlow setup
// ================================
const { Renderer, Stave, StaveNote, Formatter } = Vex.Flow;

const output = document.getElementById("output");

// vyčistit při každé nové notě
function clearOutput() {
  output.innerHTML = "";
}

// ================================
// Rozsah not (malé c – tříčárkované c)
// h místo b (CZ notace)
// ================================
const notes = [
  "c/3", "d/3", "e/3", "f/3", "g/3", "a/3", "b/3",
  "c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4",
  "c/5", "d/5", "e/5", "f/5", "g/5", "a/5", "b/5",
  "c/6"
];

// aktuální nota
let currentNote = null;

// ================================
// Vykreslení náhodné noty
// ================================
function drawRandomNote() {
  clearOutput();

  // renderer
  const renderer = new Renderer(output, Renderer.Backends.SVG);
  renderer.resize(700, 160);

  const context = renderer.getContext();
  context.setFont("Arial", 10, "").setBackgroundFillStyle("#fff");

  // náhodná nota
  currentNote = notes[Math.floor(Math.random() * notes.length)];

  // osnova
  const stave = new Stave(10, 40, 650);
  stave.addClef("treble");
  stave.setContext(context).draw();

  // nota
  const note = new StaveNote({
    clef: "treble",
    keys: [currentNote],
    duration: "q"
  });

  Formatter.FormatAndDraw(context, stave, [note]);

  console.log("Zobrazená nota:", currentNote);
}

// ================================
// Ovládání klaviatury
// ================================
const buttons = document.querySelectorAll("#keyboard button");
const result = document.getElementById("result");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.note;

    // reset stylů
    buttons.forEach(b => {
      b.classList.remove("correct", "wrong");
    });

    if (selected === currentNote) {
      btn.classList.add("correct");
      result.textContent = "Správně ✓";

      // nová nota po krátké pauze
      setTimeout(drawRandomNote, 400);
    } else {
      btn.classList.add("wrong");
      result.textContent = "Zkus znovu";
    }
  });
});

// ================================
// Start aplikace
// ================================
drawRandomNote();
