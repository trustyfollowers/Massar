/* =========================================================
   FillSkills – Universal Bookmarklet Script
   Author: Prof_TATA-info
   Version: 2.2.4
   ========================================================= */

(function () {

  // Prevent double execution
  if (window.__FillSkillsRunning) return;
  window.__FillSkillsRunning = true;

  // -------- Toast helper --------
  function toast(message, bg = '#222') {
    const t = document.createElement('div');
    t.textContent = message;
    Object.assign(t.style, {
      position: 'fixed',
      top: '30px',
      left: '30px',
      background: bg,
      color: '#fff',
      padding: '12px 18px',
      borderRadius: '10px',
      fontSize: '24px',
      fontFamily: 'system-ui, sans-serif',
      zIndex: 999999,
      boxShadow: '0 6px 20px rgba(0,0,0,.3)',
      opacity: '0',
      transition: 'opacity .3s'
    });

    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');

    setTimeout(() => t.style.opacity = '0', 2500);
    setTimeout(() => t.remove(), 3000);
  }

  // -------- Public function --------
  window.FillSkills = function () {
    try {

      var code = prompt("Veuillez saisir le code Massar:");
      if (!code || !(code = code.trim())) {
        window.__FillSkillsRunning = false;
        return;
      }

      var nodes = document.querySelectorAll("#divEspaceCollab [data-code-eleve]");
      if (!nodes.length) {
        toast("❌ Aucun élément compatible trouvé sur cette page", "#c00");
        window.__FillSkillsRunning = false;
        return;
      }

      nodes.forEach(function (el) {
        el.setAttribute("data-code-eleve", code);
        el.dataset.codeEleve = code;
      });

      toast("✅ Données appliquées avec succès", "#0a7");

      // ---- AUTO CLICK SAVE BUTTON ----
      setTimeout(() => {
        const btnSave = document.getElementById("btnSave");
        if (btnSave) {
          btnSave.click();
          toast("💾 Enregistrement automatique effectué.", "#0a7");
        } else {
          toast("❌ Bouton Enregistrer introuvable", "#e67e22");
        }
      }, 900);

    } catch (e) {
      console.error(e);
      toast("❌ Erreur lors de l'exécution", "#c00");
    } finally {
      window.__FillSkillsRunning = false;
    }
  };

  // -------- Auto-execute --------
  window.FillSkills();

})();
