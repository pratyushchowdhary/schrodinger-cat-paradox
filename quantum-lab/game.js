(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const parts = [...document.querySelectorAll(".part")];
  const devices = [...document.querySelectorAll(".device")];
  const names = ["atom", "detector", "hammer", "flask", "cat"];
  let placed = new Set();
  let phase = 1;
  let outcome = null;
  let stats = { trials: 0, alive: 0, dead: 0, history: [] };

  function render() {
    $("parts-count").textContent = `${placed.size} / 5 PLACED`;
    parts.forEach(button => button.classList.toggle("placed", placed.has(button.dataset.part)));
    devices.forEach(device => device.classList.toggle("visible", placed.has(names.find(name => device.classList.contains(name)))));
    $("empty-message").style.display = placed.size ? "none" : "flex";
    $("machine").classList.toggle("show", placed.size > 0 && phase === 1);
    $("machine").classList.toggle("complete", placed.size === 5);
    $("box-lid").classList.toggle("open", phase === 1 || phase === 4);
    $("sealed-view").classList.toggle("show", phase === 2 || phase === 3);
    $("result-view").classList.toggle("show", phase === 4);
    $("probability").disabled = phase !== 1;
    $("action").disabled = false;
    const labels = ["", "SEAL THE BOX", "START THE TIMER", "OPEN / MEASURE", "NEW TRIAL"];
    $("action").textContent = phase === 1 && placed.size < 5 ? "PLACE ALL PARTS" : labels[phase];
    $("step-label").textContent = `STEP ${phase} OF 4`;
    $("progress-bar").style.width = `${phase * 25}%`;
    document.querySelectorAll(".timeline div").forEach((step, i) => step.classList.toggle("active", i + 1 === phase));
    updateLesson(); updateStats();
  }

  function updateLesson() {
    const content = {
      1:["BUILD THE EXPERIMENT","Put each part inside the box to connect the chain reaction."],
      2:["THE BOX IS SEALED","You cannot observe the atom or the cat without opening the chamber."],
      3:["TWO POSSIBILITIES","The quantum description links atom intact with alive, and atom decayed with dead."],
      4:["MEASUREMENT MADE","Opening the box reveals one definite recorded outcome."]
    }[phase];
    $("lesson-title").textContent=content[0]; $("lesson-copy").textContent=content[1];
    const explain = {
      1:["Before measurement","Quantum theory represents both possible outcomes in the state description."],
      2:["System isolated","The outcome cannot be inspected from outside the sealed chamber."],
      3:["Superposition model","The two branches evolve together in the mathematical description."],
      4:["After measurement","Only one outcome is recorded when the chamber is opened."]
    }[phase];
    $("explain").innerHTML=`<b>${explain[0]}</b><p>${explain[1]}</p>`;
  }

  parts.forEach(button => button.addEventListener("click", () => {
    if (phase !== 1 || placed.has(button.dataset.part)) return;
    placed.add(button.dataset.part); render();
  }));

  $("probability").addEventListener("input", event => {
    const value = Number(event.target.value);
    $("probability-value").textContent=`${value}%`; $("dead-chance").textContent=`${value}%`; $("alive-chance").textContent=`${100-value}%`;
  });

  $("action").addEventListener("click", () => {
    if (phase === 1 && placed.size < 5) names.forEach(name => placed.add(name));
    else if (phase === 1) phase = 2;
    else if (phase === 2) { phase = 3; outcome = Math.random() < Number($("probability").value) / 100 ? "dead" : "alive"; }
    else if (phase === 3) reveal();
    else resetTrial();
    render();
  });

  function reveal() {
    phase = 4;
    const alive = outcome === "alive";
    $("result-icon").textContent = alive ? "🐈" : "🐈‍⬛";
    $("result-text").textContent = alive ? "CAT ALIVE" : "CAT DEAD";
    $("result-chain").textContent = alive ? "The atom did not decay; the mechanism stayed inactive." : "The atom decayed; the detector triggered the mechanism.";
    stats.trials++; stats[outcome]++; stats.history.unshift({number:stats.trials,outcome,chance:Number($("probability").value)}); stats.history=stats.history.slice(0,5);
    $("dialog-icon").textContent=alive?"🐈":"🐈‍⬛";
    $("dialog-title").textContent=alive?"THE CAT IS ALIVE":"THE CAT IS DEAD";
    $("dialog-copy").textContent=`A ${$("probability").value}% decay chance produced one definite result. Repeating trials reveals the probability pattern; a single trial cannot.`;
    setTimeout(()=>$("lesson-dialog").showModal(),500);
  }

  function updateStats(){
    $("trials").textContent=stats.trials; $("alive-total").textContent=stats.alive; $("dead-total").textContent=stats.dead;
    $("log").innerHTML=stats.history.length?stats.history.map(item=>`<span>TRIAL ${String(item.number).padStart(2,"0")} · ${item.chance}% DECAY → <b>${item.outcome.toUpperCase()}</b></span>`).join("<br>"):"Run the experiment to record a measurement.";
  }

  function resetTrial(){ placed=new Set();phase=1;outcome=null;render(); }
  $("again").addEventListener("click",()=>{$("lesson-dialog").close();resetTrial();});
  $("reset").addEventListener("click",()=>{if($("lesson-dialog").open)$("lesson-dialog").close();stats={trials:0,alive:0,dead:0,history:[]};resetTrial();});
  render();
})();
