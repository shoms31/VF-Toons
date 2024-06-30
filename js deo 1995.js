(function (_0x3fa7db, _0x2e9ca8) {
    const _0x3dac29 = _0x3fa7db();
    while (true) {
      try {
        const _0x4e220d = -parseInt(_0x51ac(2029, 0x1660)) / 1 * (parseInt(_0x51ac(3139, 0x189c)) / 2) + -parseInt(_0x51ac(5375, 0x1656)) / 3 * (-parseInt(_0x51ac(1909, 0x5cd)) / 4) + parseInt(_0x51ac(4001, 0x4ab)) / 5 + -parseInt(_0x51ac(4265, 0x1724)) / 6 + parseInt(_0x51ac(873, 0x4a)) / 7 * (-parseInt(_0x51ac(364, 0xb7c)) / 8) + -parseInt(_0x51ac(2825, 0x2f6)) / 9 * (parseInt(_0x51ac(3243, 0xd1d)) / 10) + -parseInt(_0x51ac(3316, 0xa2c)) / 11 * (-parseInt(_0x51ac(3480, 0x221)) / 12);
        if (_0x4e220d === _0x2e9ca8) {
          break;
        } else {
          _0x3dac29.push(_0x3dac29.shift());
        }
      } catch (_0x4fff58) {
        _0x3dac29.push(_0x3dac29.shift());
      }
    }
  })(_0x2476, 132658);
  var chapitres_lus = [];
  var chapitres_notes = [];
  var chapitres_pris = [];
  var chapitres_download = [];
  var histo = 0;
  const _0x3b2303 = {
    interstitialid: "826886747918517_826887231251802",
    isTesting: false
  };
  function valider_la_note(_0x12b8ed, _0xc377c2) {
    db.transaction(async function (_0x3216ae) {
      let _0x1e37d5 = _$("text_note").value.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      _0x3216ae.executeSql("UPDATE chapitres SET note=? WHERE comic=? AND chapitre=?", [_0x1e37d5, parseInt(_0x12b8ed), _0xc377c2], async function (_0x3027bf, _0x3b30a0) {
        back_infos(1);
        notif("Noté");
        up_phes(6);
      });
      ;
    });
  }
  var note_random = ["Terrible Plot twist!", "L'artiste s'est déchaîné", "Milleur combat depuis", "Un peu trop sexy", "Ouiiiiiiiiii!", "Mon perso arrive!", "Je n'ai rien pigé", "J'ai déjà vu ça?", "Très belle ref", "Je dois revoir ça"];
  function noter(_0x7b5a0a) {
    if (localStorage.webtoon.length != 0 && localStorage.chapitre_actuel.length != 0) {
      db.transaction(function (_0x59b367) {
        _0x59b367.executeSql("SELECT note FROM chapitres WHERE comic=? AND chapitre=? LIMIT 1", [parseInt(localStorage.webtoon), localStorage.chapitre_actuel], function (_0x560adf, _0xa6f3f2) {
          profil(_0x7b5a0a, 1);
          _$("valider_note").setAttribute('onclick', "valider_la_note(" + localStorage.webtoon + ",'" + localStorage.chapitre_actuel + "')");
          _$('text_note').focus();
          _$('text_note').value = unescapeHtml(_0xa6f3f2.rows.item(0).note);
          _$('text_note').placeholder = "Ex : " + note_random[Math.round(Math.random() * (note_random.length - 1))];
        });
      });
    }
  }
  function creer_cat() {
    if (_$("emoji_cat").value.length > 0 && _$("nom_cat").value.length > 0) {
      db.transaction(function (_0x40802e) {
        _0x40802e.executeSql("INSERT INTO categorie(emoji,nom) VALUES(?,?)", [_$('emoji_cat').value, _$("nom_cat").value], () => {
          notif("Catégorie créée");
          back_infos(2);
          _0x40802e.executeSql("SELECT * FROM categorie ORDER BY id DESC LIMIT 1", [], (_0x1525ee, _0x401e1a) => {
            notif("Catégorie créée");
            let _0x532d6d = document.createElement("span");
            _0x532d6d.setAttribute("onclick", "afficher_cat_comics(" + _0x401e1a.rows.item(0).id + ')');
            _0x532d6d.setAttribute('id', "cat_" + _0x401e1a.rows.item(0).id);
            _0x532d6d.innerHTML = _0x401e1a.rows.item(0).emoji + " " + _0x401e1a.rows.item(0).nom + " <i>0</i>";
            _$("div_categories").appendChild(_0x532d6d);
            _$("div_categories").scrollTo(_0x532d6d.offsetLeft, 0);
            _0x532d6d.style.animation = "flip 1s forwards ease";
            setTimeout(() => {
              _0x532d6d.style.animation = "none";
            }, 1000);
            up_phes(3);
          });
        });
      });
    } else {
      notif("T'as vraiment fini?");
    }
  }
  function creer_update_cat(_0x182b13) {
    if (_0x182b13 != 1) {
      db.transaction(function (_0x5d212f) {
        _0x5d212f.executeSql("SELECT * FROM categorie WHERE id=? LIMIT 1", [_0x182b13], function (_0xaead51, _0x5c678d) {
          profil(null, 3);
          _$("bloc_update_cat").innerHTML = "<h3 class='titre'>Modifie ceci</h3><span class='span_cat'><input type='text' id='emoji_catt' maxlength='10' placeholder='💪' value='" + _0x5c678d.rows.item(0).emoji + "'><input type='text' id='nom_catt' maxlength='25' placeholder='Titre' value='" + _0x5c678d.rows.item(0).nom.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;") + "'></span><span><button onclick='back_infos(3)' class='btn2'>Ça va..</button><button onclick='update_cat(" + _0x5c678d.rows.item(0).id + ")' class='btn2' id='valider_cat'>Modifier</button></span>";
        });
      });
    } else {
      notif("Pas avec moi");
    }
  }
  function update_cat(_0x18bed4) {
    if (_$("emoji_catt").value.length > 0 && _$("nom_catt").value.length > 0) {
      db.transaction(function (_0x324d33) {
        _0x324d33.executeSql("UPDATE categorie SET emoji=?, nom=?  WHERE id=?", [_$("emoji_catt").value, _$("nom_catt").value, _0x18bed4], () => {
          _$("cat_" + _0x18bed4).innerHTML = _$("emoji_catt").value + " " + _$("nom_catt").value + " <i>" + _$("cat_" + _0x18bed4).getElementsByTagName('i')[0].innerText + "</i>";
          notif('Modifiée');
          back_infos(3);
        });
      });
    } else {
      notif("T'as vraiment fini?");
    }
  }
  function _$$(_0x16176a, _0x581384) {
    return _0x16176a.getElementsByTagName(_0x581384);
  }
  function _$(_0x5bcd9f) {
    const _0x458f92 = function () {
      let _0x1dc89f = true;
      return function (_0xb2648d, _0x48db95) {
        const _0x1b919e = _0x1dc89f ? function () {
          if (_0x48db95) {
            const _0x6ade7c = _0x48db95.apply(_0xb2648d, arguments);
            _0x48db95 = null;
            return _0x6ade7c;
          }
        } : function () {};
        _0x1dc89f = false;
        return _0x1b919e;
      };
    }();
    const _0x425e58 = _0x458f92(this, function () {
      const _0x4dc59a = function () {
        let _0x9b0d01;
        try {
          _0x9b0d01 = Function("return (function() {}.constructor(\"return this\")( ));")();
        } catch (_0x5ae374) {
          _0x9b0d01 = window;
        }
        return _0x9b0d01;
      };
      const _0x3c198a = _0x4dc59a();
      const _0x17b875 = _0x3c198a.console = _0x3c198a.console || {};
      const _0x18b98c = ["log", 'warn', "info", "error", "exception", "table", "trace"];
      for (let _0x1134fc = 0; _0x1134fc < _0x18b98c.length; _0x1134fc++) {
        const _0x4d96a4 = _0x458f92.constructor.prototype.bind(_0x458f92);
        const _0xf6e7a5 = _0x18b98c[_0x1134fc];
        const _0x1382a4 = _0x17b875[_0xf6e7a5] || _0x4d96a4;
        _0x4d96a4.__proto__ = _0x458f92.bind(_0x458f92);
        _0x4d96a4.toString = _0x1382a4.toString.bind(_0x1382a4);
        _0x17b875[_0xf6e7a5] = _0x4d96a4;
      }
    });
    _0x425e58();
    return document.getElementById(_0x5bcd9f);
  }
  if (!localStorage.dark_mode) {
    localStorage.dark_mode = 0;
  }
  var dark_mode = parseInt(localStorage.dark_mode);
  function tog(_0x3d4720) {
    const _0x373a43 = function () {
      let _0x172303 = true;
      return function (_0x499f18, _0x1e88ed) {
        const _0x45f895 = _0x172303 ? function () {
          if (_0x1e88ed) {
            const _0x5d91e1 = _0x1e88ed.apply(_0x499f18, arguments);
            _0x1e88ed = null;
            return _0x5d91e1;
          }
        } : function () {};
        _0x172303 = false;
        return _0x45f895;
      };
    }();
    const _0x34a65a = _0x373a43(this, function () {
      return _0x34a65a.toString().search("(((.+)+)+)+$").toString().constructor(_0x34a65a).search("(((.+)+)+)+$");
    });
    _0x34a65a();
    _$('main').classList.toggle("dark_main");
    _$("liste_comics").classList.toggle("dark_liste_comics");
    _$("pdf_chapitre").classList.toggle("dark_pdf_chapitre");
    _$("chapitres").classList.toggle("dark_chapitres");
    _$("share").classList.toggle('dark_share');
    _$("div_categories").classList.toggle("dark_div_categories");
    _$("comments").classList.toggle("dark_comments");
    _$("feed").classList.toggle('dark_feed');
    _$('plus').classList.toggle("dark_plus");
    _$('trophees').classList.toggle("dark_trophees");
    _$("votes").classList.toggle("dark_votes");
    if (_0x3d4720 != undefined && _0x3d4720 != null) {
      _0x3d4720.classList.toggle('light_mode');
    }
    dark_mode = dark_mode == 1 ? 0 : 1;
    localStorage.dark_mode = dark_mode;
  }
  if (parseInt(localStorage.dark_mode) == 1) {
    tog(_$("tog_btn"));
    dark_mode = 1;
    localStorage.dark_mode = 1;
  }
  var theme_actu = 0;
  function set_feed() {
    _$('feeds').innerHTML = "<div id='feed_load'></div>";
    _$("tete_feed").getElementsByTagName('i')[0].innerHTML = "Si tu veux rajouter tes memes, poste-les en taguant (en répondant) <b onclick=\"window.open('https://t.me/pipiwebtoonmemes/3','_system')\">ce post</b> dans le <b onclick=\"window.open('https://t.me/pipiwebtoonmemes','_system')\">groupe Telegram</b> 👍";
    let _0x2e4b7d = document.createElement("script");
    _0x2e4b7d.setAttribute('src', "https://telegram.org/js/telegram-widget.js?22");
    _0x2e4b7d.setAttribute("async", "async");
    _0x2e4b7d.setAttribute("data-telegram-discussion", "pipiwebtoonmemes/3");
    _0x2e4b7d.setAttribute("data-comments-limit", '100');
    _0x2e4b7d.setAttribute("data-color", 'F95C54');
    _0x2e4b7d.setAttribute("data-colorful", '1');
    if (dark_mode == 1) {
      _0x2e4b7d.setAttribute('data-dark', '1');
      _0x2e4b7d.setAttribute("data-dark-color", "E22F38");
      theme_actu = 1;
    } else {
      theme_actu = 0;
    }
    _$('feeds').appendChild(_0x2e4b7d);
    if (_$('feed_load') != null && _$('feed_load') != undefined) {
      _$("feed_load").remove();
    }
    onglet_feed = 1;
  }
  function check_chap(_0x3a8a02, _0xafc959) {
    let _0x1f4a34 = decodeURIComponent(_0xafc959);
    let _0x412751;
    let _0x4a293a;
    _0x3a8a02.setAttribute("onclick", '');
    _0x3a8a02.style.animation = "fade_infinite 2s infinite";
    db.transaction(async function (_0x539d85) {
      _0x539d85.executeSql("SELECT id,comic,chapitre FROM chapitres WHERE lien=? LIMIT 1", [_0x1f4a34], async function (_0xc2e250, _0x5f3a98) {
        let _0x151fd4 = _0x5f3a98.rows.length;
        if (_0x151fd4 == 0) {
          _0x3a8a02.innerText = "Pas dans ton catalogue";
          _0x3a8a02.style.filter = 'blur(0px)';
        } else {
          _0x412751 = parseInt(_0x5f3a98.rows.item(0).comic);
          _0x4a293a = _0x5f3a98.rows.item(0).chapitre.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, "\"").replace(/&#039;/g, "'");
        }
      });
    }, function (_0x3770ae) {}, () => {
      db.transaction(function (_0x1266ce) {
        _0x1266ce.executeSql("SELECT titre FROM comic WHERE id=?", [_0x412751], function (_0x3e791d, _0x5a586d) {
          if (_0x5a586d.rows.length != 0) {
            _0x3a8a02.innerHTML = _0x5a586d.rows.item(0).titre + " / " + _0x4a293a;
          }
          _0x3a8a02.style.filter = "blur(0px)";
          _0x3a8a02.style.animation = '';
        });
      });
    });
  }
  function reset_feed_headers(_0x2eff8b) {
    const _0x4a07cd = {
      SdUny: function (_0x428e59, _0xbe07c6) {
        return _0x428e59 < _0xbe07c6;
      }
    };
    _0x4a07cd.zhxhB = function (_0x2b38ab, _0xa19635) {
      return _0x2b38ab == _0xa19635;
    };
    _0x4a07cd.vLUBu = "rgba(255 255 255 / 20%)";
    _0x4a07cd.NpWRr = "rgba(1 1 1 / 7%)";
    let _0x34ab2f = _0x2eff8b.parentNode.getElementsByTagName('b');
    for (var _0x2884f8 = 0; _0x2884f8 < _0x34ab2f.length; _0x2884f8++) {
      _0x34ab2f[_0x2884f8].style.background = "rgba(1 1 1 / 0%)";
    }
    if (_0x4a07cd.zhxhB(parseInt(dark_mode), 1)) {
      _0x2eff8b.style.background = _0x4a07cd.vLUBu;
    } else {
      _0x2eff8b.style.background = _0x4a07cd.NpWRr;
    }
  }
  function show_reps(_0x4d03c9) {
    let _0x5826fc = _0x4d03c9.parentNode.parentNode.getElementsByTagName('div')[1];
    if (_0x5826fc.offsetHeight < 10) {
      _0x5826fc.style.height = "fit-content";
      _0x5826fc.style.maxHeight = "200px";
    } else {
      _0x5826fc.style.height = "0px";
      _0x5826fc.style.maxHeight = "0px";
      _0x5826fc.style.overflow = "hidden";
    }
  }
  function set_reponses(_0x3cc3c1) {
    if (localStorage.author) {
      onglet_feed = 2;
      _$("feeds").innerHTML = "<div id='feed_load'></div>";
      _$("tete_feed").getElementsByTagName('i')[0].innerHTML = "Quelques uns de tes commentaires les plus récents et les réponses (s'il y'en a 🤫) à ceux-ci";
      var _0x5c9535 = new XMLHttpRequest();
      _0x5c9535.onreadystatechange = function () {
        if (this.status == 200) {
          if (this.responseText.length < 2) {
            _$("feeds").innerHTML = "<div class='nocomment'><img src='img/boo.png'><b>" + rici[Math.round(Math.random() * (rici.length - 1))] + "</b><i>" + rici_comment[Math.round(Math.random() * (rici_comment.length - 1))] + "</i></div>";
          } else {
            if (_$("feed_load") != null && _$("feed_load") != undefined) {
              _$("feed_load").remove();
            }
            let _0x329a7b = document.createElement("div");
            _0x329a7b.id = "down_comments";
            if (parseInt(dark_mode) == 1) {
              _0x329a7b.setAttribute("class", "dark_down_comments");
              _0x329a7b.style.paddingTop = "4px !important";
            }
            _0x329a7b.innerHTML = this.responseText;
            _$("feeds").appendChild(_0x329a7b);
            _$("down_comments").style.paddingTop = "4px !important";
            _$("down_comments").style.width = "90%";
            _$("down_comments").style.margin = 'auto';
          }
        }
      };
      _0x5c9535.open("GET", "https://toutoutil.fr/js_script.php?reps=" + localStorage.author, false);
      _0x5c9535.send();
    } else {
      notif("T'as déjà commenté ?");
    }
  }
  function creer() {
    window.open("https://pipicreateur.top/", "_system");
  }
  if (parseInt(localStorage.where) == 1) {
    _$("btn_pipi").remove();
  }
  var info_in = 0;
  function profil(_0x44a048, _0x4bb21e) {
    var _0x486026;
    switch (_0x4bb21e) {
      case 0:
        _0x486026 = _$("adalert");
        localStorage.where = 1;
        break;
      case 1:
        _0x486026 = _$("bloc_note");
        break;
      case 2:
        _0x486026 = _$("bloc_creer_cat");
        break;
      case 3:
        _0x486026 = _$("bloc_update_cat");
        break;
    }
    if (info_in == 0) {
      _0x486026.style.display = "flex";
      _0x486026.style.animation = "appear_up_alert .4s forwards";
      _0x486026.setAttribute('tabindex', '-1');
      _0x486026.focus();
      if (_0x4bb21e == 0) {
        _0x486026.innerHTML = "<h3 class='titre'>&#128193; Où sont les .pipi?</h3><span> Tu pourrais en trouver avec une petite recherche :<br> <img src='img/goulou.png'><br> Je ne suis qu'un lecteur donc je n'ai pas de fichier inclu 😉 D'accord ? </span><button onclick='back_infos(0)' class='btn1'>Ok D'accord</button>";
      }
      switch (_0x4bb21e) {
        case 0:
          _0x486026.innerHTML = "<h3 class='titre'>&#128193; Où sont les .pipi?</h3><span> Tu pourrais en trouver avec une petite recherche :<br> <img src='img/goulou.png'><br> Je ne suis qu'un lecteur donc je n'ai pas de fichier inclu 😉 D'accord ? </span><button onclick='back_infos(0)' class='btn1'>Ok D'accord</button>";
          _$("btn_pipi").remove();
          break;
        case 1:
          _0x486026.innerHTML = "<h3 class='titre'>&#128221; Ajoute une note</h3><input type='text' id='text_note' maxlength='255'><span><button onclick='back_infos(1)' class='btn2'>Ça va..</button><button onclick='back_infos(0)' class='btn2' id='valider_note'>C'est bon!</button></span>";
          break;
        case 2:
          _0x486026.innerHTML = "<h3 class='titre'>Ajoute ta catégorie</h3><span class='span_cat'><input type='text' id='emoji_cat' maxlength='10' placeholder='💪'><input type='text' id='nom_cat' maxlength='25' placeholder='Titre'></span><span class='indication'>Emoji + Titre / Ex : 💪 Action</span><span><button onclick='back_infos(2)' class='btn2'>Ça va..</button><button onclick='creer_cat()' class='btn2' id='valider_cat'>Créer</button></span>";
          break;
        case 3:
          _0x486026.innerHTML = "<h3 class='titre'>Modifie ceci</h3><span class='span_cat'><input type='text' id='emoji_cat' maxlength='10'><input type='text' id='nom_cat' maxlength='25' placeholder='Titre'></span><span><button onclick='back_infos(3)' class='btn2'>Ça va..</button><button onclick='update_cat()' class='btn2' id='valider_cat'>Modifier</button></span>";
          break;
      }
      info_in = 1;
    }
  }
  function back_infos(_0x481e31) {
    var _0x4de49a;
    switch (_0x481e31) {
      case 0:
        _0x4de49a = _$("adalert");
        break;
      case 1:
        _0x4de49a = _$("bloc_note");
        break;
      case 2:
        _0x4de49a = _$("bloc_creer_cat");
        break;
      case 3:
        _0x4de49a = _$("bloc_update_cat");
        break;
    }
    _0x4de49a.style.animation = "disappear_up_alert .4s forwards";
    setTimeout(() => {
      _0x4de49a.style.display = "none";
      info_in = 0;
    }, 800);
  }
  var connecter = 0;
  var author;
  if (!localStorage.author) {} else {
    author = localStorage.author;
  }
  if (localStorage.author && localStorage.uuid) {
    connecter = 1;
  } else {
    connecter = 0;
  }
  function div_down(_0x523b47) {
    if (_0x523b47 == "trophees" || _0x523b47 == 'votes') {
      _$(_0x523b47).style.animation = "div_bottom_up .5s forwards";
    } else {
      _$(_0x523b47).style.animation = "div_down .7s forwards";
    }
    switch (_0x523b47) {
      case "comments":
        comment_up = 0;
        break;
      case 'feed':
        feed_up = 0;
        break;
      case "trophees":
        trophees_on = 0;
        break;
      case 'votes':
        vote_up = 0;
        break;
    }
  }
  var ragea = ["Hé arrête!", "Je dis stop!", "Tu vas arrêter?", "Tu continues?", "Je vais me fâcher", "T'arrêtes pas? Ok", "Je t'aurais prévenu"];
  var rageb = ["Me touche pas!", "Hé lâche-moi!", "J'vais te frapper!", "Ça suffit oh!", "Ça va faire mal!", "Ça va pas te plaire", "Bah tu l'auras voulu"];
  var ragec = ["Tu fais quoi?", "T'es un fou toi", "Tu vas le regretter", "Sérieux??", "Tu vas voir", "Fais-le encore!", "Okay c'est parti"];
  var rage_int = 0;
  var raged = ["Ha toi encore?", "T'as rien appris, hein?", "Tu vas assumer?", "Oh arrête!", "Tu veux pas?", "Je te conseille...", "Réinitialise l'appli"];
  var ragee = ["Non mais sérieux?", "T'en a pa eu assez?", "T'es même pas prêt", "Je te demande d'arrêter!", "T'es sûr?", "Petit conseil...", "Réinitialise l'appli"];
  function rager() {
    let _0x280dfd = ragea.length;
    let _0x35345b = Math.round(Math.random() * 2);
    if (!localStorage.rage) {
      if (rage_int < _0x280dfd) {
        switch (_0x35345b) {
          case 0:
            notif(ragea[rage_int]);
            break;
          case 1:
            notif(rageb[rage_int]);
            break;
          case 2:
            notif(ragec[rage_int]);
            break;
        }
        rage_int++;
      } else {
        _$("body").style.animation = "to_white 2s forwards";
        setTimeout(() => {
          localStorage.rage = 1;
          navigator.app.exitApp();
        }, 2000);
      }
    } else {
      _0x35345b = Math.round(Math.random());
      if (rage_int < _0x280dfd) {
        switch (_0x35345b) {
          case 0:
            notif(raged[rage_int]);
            break;
          case 1:
            notif(ragee[rage_int]);
            break;
        }
        rage_int++;
      } else {
        _$("body").style.animation = "to_black 3s forwards";
        setTimeout(() => {
          localStorage.clear();
          localStorage.rage = "hum";
          navigator.app.exitApp();
        }, 2000);
      }
    }
  }
  var cmt_deja = '';
  var zone_com_ok = 0;
  function repondre(_0x4a0fb4, _0x48184f) {
    let _0x22696d = _$("cmt_" + _0x48184f);
    if (_0x22696d != null && _0x22696d != undefined) {
      if (_0x22696d.offsetHeight < 10) {
        if (!cmt_deja.includes("cmt_" + _0x48184f)) {
          console.log('ah');
          _0x22696d.innerHTML = "<img id='img_load' src='img/loading2.gif'></img>";
          afficher(_0x4a0fb4, _0x48184f);
          cmt_deja += "cmt_" + _0x48184f;
        }
        _$("button_messg").setAttribute('onclick', "envoyer(" + _0x48184f + ", '" + cache_comm + "')");
        _$("messg").setAttribute("placeholder", "Réponds à " + _0x22696d.parentNode.getElementsByTagName('b')[0].innerText);
        _0x22696d.style.height = "fit-content";
        _0x22696d.style.maxHeight = "200px";
      } else {
        _$("button_messg").setAttribute("onclick", "envoyer(-1, '" + cache_comm + "')");
        _$("messg").setAttribute("placeholder", "Commente ...");
        _0x22696d.style.height = '0px';
        _0x22696d.style.maxHeight = '0px';
        _0x22696d.style.overflow = "hidden";
      }
    } else {
      _$("button_messg").setAttribute('onclick', "envoyer(-1, '" + cache_comm + "')");
      _$("messg").setAttribute("placeholder", "Commente ...");
      _0x22696d.style.height = '0px';
      _0x22696d.style.maxHeight = '0px';
      _0x22696d.style.overflow = "hidden";
    }
  }
  window.addEventListener("signinsuccess", function (_0x5edcf2) {
    notif("Connecté");
    notif(_0x5edcf2.detail);
  }, false);
  window.addEventListener("signinfailure", function (_0x1ad756) {
    notif("ERREUR DE CO");
    notif(_0x1ad756.detail);
  }, false);
  function entrerdedans() {
    let _0x3c3bd9 = _$('pseudoo').value;
    if (_0x3c3bd9.length > 0) {
      let _0x3917f9 = device.uuid;
      var _0x43e753 = new XMLHttpRequest();
      _0x43e753.onreadystatechange = function () {
        if (this.status == 200) {
          console.log(this.responseText);
          if (parseInt(this.responseText) == 1) {
            connecter = 1;
            notif("connecté");
            localStorage.author = _0x3c3bd9;
            localStorage.uuid = _0x3917f9;
            author = localStorage.author;
            db.transaction(async function (_0x121b21) {
              _0x121b21.executeSql("SELECT lien FROM chapitres WHERE comic=? AND chapitre=? LIMIT 1", [parseInt(localStorage.webtoon), localStorage.chapitre_actuel], async function (_0x432de0, _0x1639fa) {
                let _0x2d904e = encodeURIComponent(_0x1639fa.rows.item(0).lien);
                _$("commentaire").setAttribute("onclick", "commenter(_$('commentaire'), '" + _0x2d904e + "')");
                _$("connectetoi").remove();
                commenter(_$("commentaire"), _0x2d904e);
              });
            });
          }
          if (parseInt(this.responseText) == 0) {
            notif("C'est le bon appareil?");
          }
          if (parseInt(this.responseText) == -1) {
            notif("Pseudo déjà utilisé");
          }
        }
      };
      _0x43e753.open("GET", "https://toutoutil.fr/js_script.php?register=0&mail=" + _0x3917f9 + '&pseudo=' + _0x3c3bd9, true);
      _0x43e753.send();
    } else {
      notif("Pseudo stp");
    }
  }
  function voter(_0x3f47e0, _0x350925, _0x9c704b) {
    _0x3f47e0.onclick = () => {};
    var _0x1d31c3 = new XMLHttpRequest();
    _0x1d31c3.onreadystatechange = function () {
      if (this.status == 200) {
        if (parseInt(this.responseText) == 4) {
          notif('Liké');
          _0x3f47e0.innerText = parseInt(_0x3f47e0.innerText) + 1;
          up_phes(12);
        }
        if (parseInt(this.responseText) == 3) {
          notif("Disliké");
          _0x3f47e0.innerText = parseInt(_0x3f47e0.innerText) + 1;
          up_phes(13);
        }
        if (parseInt(this.responseText) == 8) {
          notif('Liké');
          _0x3f47e0.innerText = parseInt(_0x3f47e0.innerText) + 1;
          _0x3f47e0.nextSibling.innerText = parseInt(_0x3f47e0.nextSibling.innerText) - 1;
        }
        if (parseInt(this.responseText) == 6) {
          notif("Disliké");
          _0x3f47e0.innerText = parseInt(_0x3f47e0.innerText) + 1;
          _0x3f47e0.previousSibling.innerText = parseInt(_0x3f47e0.previousSibling.innerText) - 1;
        }
        if (parseInt(this.responseText) == 0) {
          notif("Petit problème");
        }
        if (parseInt(this.responseText) == -1) {
          notif("Déjà voté");
        }
        _0x3f47e0.onclick = () => {
          voter(this, _0x350925, _0x9c704b);
        };
      }
    };
    _0x1d31c3.open("GET", "https://toutoutil.fr/js_script.php?vote=1&id_msg=" + _0x350925 + "&vote_type=" + _0x9c704b + "&author=" + author, true);
    _0x1d31c3.send();
  }
  function creer_fermer_b(_0x4aa71f) {
    if (_$("fermer_b") != null && _$("fermer_b") != undefined) {
      _$("fermer_b").remove();
    }
    let _0x16a0f0 = document.createElement('b');
    _0x16a0f0.innerHTML = '&#x2716;';
    _0x16a0f0.setAttribute('id', "fermer_b");
    _0x16a0f0.setAttribute("onclick", "div_down('" + _0x4aa71f + "')");
    _$(_0x4aa71f).appendChild(_0x16a0f0);
  }
  function calcul_coins(_0x503846) {
    if (_0x503846.value == undefined || _0x503846.value == null || _0x503846.value == '') {
      _$('convercoin').innerText = "0 Pice";
    } else {
      _$('convercoin').innerText = parseInt(_0x503846.value) * 30 + " Pices";
    }
  }
  function change_vote_cat(_0x54e126, _0xdfa58a, _0x2266d9) {
    afficher_votes(_0xdfa58a, _0x2266d9, parseInt(_0x54e126.value));
  }
  function partager_image(_0x338516) {
    if (_$("div_partage").offsetHeight < 15) {
      _$("div_partage").style.height = "fit-content";
    } else {
      var _0x5e8073 = _$('div_image');
      domtoimage.toJpeg(_0x5e8073, {
        'quality': 0x1,
        'width': _0x5e8073.clientWidth * 3,
        'height': _0x5e8073.clientHeight * 3,
        'style': {
          'transform': "scale(3)",
          'transformOrigin': "center"
        }
      }).then(function (_0x3e6b3a) {
        const _0x3d6f60 = {
          "message": '',
          "files": [_0x3e6b3a]
        };
        var _0x575260 = function (_0x2c9cee) {
          notif("Partagé!");
        };
        var _0x123bef = function (_0x41dfad) {
          notif("Pas pu partager...");
        };
        window.plugins.socialsharing.shareWithOptions(_0x3d6f60, _0x575260, _0x123bef);
      })["catch"](function (_0x1d2e9f) {
        console.error("Un souci...", _0x1d2e9f);
      });
    }
  }
  function add_image() {
    _$("image_perso").click();
  }
  const image_reader = new FileReader();
  image_reader.addEventListener('load', function () {
    _$("div_image").style.width = parseInt(localStorage.width) - 0 + 'px';
    _$("div_image").style.height = parseInt(localStorage.width) - 0 + 'px';
    _$("image_shared").style.background = "url(" + image_reader.result + ") 50% no-repeat";
    _$("image_shared").style.backgroundSize = "cover";
    _$('div_image').style.animation = "show_div_image .5s forwards";
    _$("image_perso").value = '';
  }, false);
  function charger_image(_0x5921a2) {
    if (_0x5921a2.value != '') {
      const _0x4e2346 = _0x5921a2.files[0];
      if (_0x4e2346) {
        image_reader.readAsDataURL(_0x4e2346);
      }
    }
  }
  function reduire_div_image(_0x2c7ba7) {
    _$("div_partage").style.height = "0px";
  }
  function retour_image(_0x1f5be6) {
    _0x1f5be6.style.animation = "hide_div_image .3s forwards";
  }
  var vote_up = 0;
  function openvote(_0x344b3a, _0x5c469d) {
    vote_up = 1;
    _$("votes").innerHTML = "<select id='select_persos' onchange=\"change_vote_cat(this,'" + _0x344b3a + "','" + _0x5c469d + "')\"> <option value='1' selected>Top Waifus</option> <option value='2'>Top Husbands</option> <option value='3'>Top Badass!</option> <option value='4'>Les plus balèzes</option> <option value='5'>Les plus faibles</option> <option value='6'>Les plus kawaïs</option> <option value='7'>Plus gros enfo*rés</option> <option value='8'>Top Malveillants</option> <option value='9'>Plus sexy</option> <option value='10'>Plus moches</option> <option value='11'>Top Génies</option> <option value='12'>Meilleurs bro/sis</option> <option value='13'>Les plus zarbs</option> <option value='14'>Têtes de nœud</option> <option value='15'>Top épéistes </option> <option value='16'>Top Idiots</option> <option value='17'>Les plus chanceux</option> <option value='18'>Les plus marrants</option> <option value='19'>Meilleurs couples</option> <option value='20'>Meilleur Duo</option> </select> <div id='les_votes'><p class='charge'></p></div> <div id='rappel_score'>Tu as actuellement <i>" + localStorage.sukoru + " Pices</i></div> <div id='div_vote'> <button onclick=\"perso_voter('" + _0x344b3a + "','" + _0x5c469d + "')\">Voter</button> <input type='number' min='0' max='" + parseInt(parseInt(localStorage.sukoru) / 30) + "' placeholder='0' id='nbre_vote' oninput='calcul_coins(this)' placeholder='0'> <span><b>fois</b><i id='convercoin'>0 Pice</i></span> </div> <div id='div_suggestion'> <input type='text' id='perso_a_suggerer' placeholder='📝 Nom du perso'> <button onclick=\"suggerer_perso('" + _0x344b3a + "','" + _0x5c469d + "')\">Suggérer un personnage</button> </div> <div id='div_partage'> <input type='file' id='image_perso' style='display: none' onchange='charger_image(this)'> <span onclick='add_image()' id='span_add_img'><b>+</b>Importe une image (de Goku UI de préférence)</span> <button  onclick='reduire_div_image(this)'>-- Réduire --</button> <div id='div_image' onclick='retour_image(this)'></div> </div> <button onclick='partager_image()' id='partage_image'>Partager</button>";
    afficher_votes(_0x344b3a, _0x5c469d, parseInt(_$("select_persos").value));
    _$("votes").style.animation = "div_top_down .5s forwards";
    creer_fermer_b("votes");
  }
  function displayRadioValue() {
    var _0x227ae5 = document.getElementsByName('perso');
    for (i = 0; i < _0x227ae5.length; i++) {
      if (_0x227ae5[i].checked) {
        return _0x227ae5[i].value;
        break;
      }
    }
    return false;
  }
  function perso_voter(_0x42b0c9, _0x128a45) {
    let _0x34b4e1 = parseInt(_$("select_persos").value);
    let _0x21f1c5 = displayRadioValue();
    if (_0x21f1c5 != false) {
      let _0x3a7d11 = parseInt(_$("nbre_vote").value);
      if (_0x3a7d11 > 0 && _0x3a7d11 * 30 < parseInt(localStorage.sukoru)) {
        var _0x37950d = new XMLHttpRequest();
        _0x37950d.onreadystatechange = function () {
          if (this.status == 200) {
            console.log(this.responseText);
            if (parseInt(this.responseText) == 1) {
              localStorage.sukoru = parseInt(localStorage.sukoru) - 30 * _0x3a7d11;
              afficher_votes(_0x42b0c9, _0x128a45, _0x34b4e1);
              _$("rappel_score").innerHTML = "Tu as actuellement <i>" + localStorage.sukoru + " Pices";
              notif("Votééé!");
            } else if (this.responseText != '') {
              notif("Petit problème");
            }
          }
        };
        _0x37950d.open("GET", "https://toutoutil.fr/js_script.php?envote=1&webtauteur=" + encodeURIComponent(_0x42b0c9 + _0x128a45) + "&nom_perso=" + encodeURIComponent(_0x21f1c5) + '&cat_vote=' + _0x34b4e1 + "&nbre_votes=" + _0x3a7d11, true);
        _0x37950d.send();
      } else {
        notif("Hmm... Combien de votes ?");
      }
    } else {
      notif("Choisis ton perso");
    }
  }
  function suggerer_perso(_0xf01f5c, _0x1c82a2) {
    let _0x15e270 = _$("perso_a_suggerer").value;
    if (_0x15e270.length == 0) {
      if (_$("perso_a_suggerer").offsetHeight < 10) {
        _$("perso_a_suggerer").style.animation = "show_input .3s forwards";
      } else {
        _$("perso_a_suggerer").style.animation = "hide_input .3s forwards";
      }
    } else {
      if (parseInt(localStorage.sukoru) > 1000) {
        _0x15e270 = _0x15e270.replaceAll(',', ';');
        var _0x3d7a36 = new XMLHttpRequest();
        _0x3d7a36.onreadystatechange = function () {
          if (this.status == 200) {
            if (parseInt(this.responseText) == 1) {
              notif("Perso ajouté!");
              localStorage.sukoru = parseInt(localStorage.sukoru) - 1000;
              _$("perso_a_suggerer").style.animation = "hide_input .3s forwards";
              _$("perso_a_suggerer").value = '';
              afficher_votes(_0xf01f5c, _0x1c82a2, parseInt(_$("select_persos").value));
              _$("rappel_score").innerHTML = "Tu as actuellement <i>" + localStorage.sukoru + " Pices";
            }
          }
        };
        _0x3d7a36.open('GET', "https://toutoutil.fr/js_script.php?perso=1&webtauteur=" + encodeURIComponent(_0xf01f5c + _0x1c82a2) + "&nom_perso=" + encodeURIComponent(_0x15e270), true);
        _0x3d7a36.send();
      } else {
        notif("Il te faut 1000 pices");
      }
    }
  }
  function afficher_votes(_0x1db53e, _0x5d92bd, _0x590f19) {
    var _0x545676 = new XMLHttpRequest();
    _0x545676.onreadystatechange = function () {
      if (this.status == 200) {
        if (parseInt(this.responseText) != -1) {
          let _0x481676 = this.responseText.split("-$%blub-%$");
          let _0x2a5d31 = 0;
          if (_0x481676.length != 0 && this.responseText != '') {
            _$("les_votes").innerHTML = '';
            let _0x4f659c = _0x481676[0].split(',');
            let _0x1bc017 = _0x481676[1].split(',');
            for (var _0x47e2dc = 0; _0x47e2dc < _0x1bc017.length; _0x47e2dc++) {
              _0x2a5d31 += parseInt(_0x4f659c[_0x47e2dc]);
            }
            for (var _0x47e2dc = 0; _0x47e2dc < _0x1bc017.length; _0x47e2dc++) {
              let _0x35f692 = document.createElement("span");
              let _0x1e6242 = _0x4f659c[_0x47e2dc] == undefined || _0x4f659c[_0x47e2dc] == null ? 0 : _0x4f659c[_0x47e2dc];
              _0x35f692.innerHTML = "<input type='radio' name='perso' value='" + _0x1bc017[_0x47e2dc] + "'> <span><b>" + _0x1bc017[_0x47e2dc] + "<i>(" + _0x1e6242 + ")</i></b><progress value='" + _0x1e6242 + "' max='" + _0x2a5d31 + "'></span>";
              _$("les_votes").appendChild(_0x35f692);
            }
            classe_persos();
          }
        } else {
          notif("Pas de perso pour le moment");
        }
      }
    };
    _0x545676.open("GET", "https://toutoutil.fr/js_script.php?shovotes=1&webtauteur=" + encodeURIComponent(_0x1db53e + _0x5d92bd) + "&cat_vote=" + _0x590f19, true);
    _0x545676.send();
  }
  function classe_persos() {
    let _0x435691 = _$('les_votes').getElementsByTagName("progress");
    let _0x2d88cd = [];
    for (var _0x3d6e14 = 0; _0x3d6e14 < _0x435691.length; _0x3d6e14++) {
      let _0x367e7d = new Object();
      _0x367e7d.position = _0x3d6e14;
      _0x367e7d.valeur = parseInt(_0x435691[_0x3d6e14].value);
      _0x367e7d.total = parseInt(_0x435691[_0x3d6e14].getAttribute("max"));
      _0x367e7d.perso = _0x435691[_0x3d6e14].parentNode.parentNode.getElementsByTagName("input")[0].value;
      _0x2d88cd.push(_0x367e7d);
    }
    _0x2d88cd.sort((_0x3404eb, _0xca135b) => _0x3404eb.valeur < _0xca135b.valeur ? 1 : -1);
    _$("span_add_img").innerHTML = "<b>+</b>Importe une image (de " + _0x2d88cd[0].perso + " de préférence)";
    _$("div_image").innerHTML = "<div id='image_shared'></div> <div id='infos_shared'> <div id='tete_shared'> <b>" + _$("metas_webtoon").getElementsByTagName('b')[0].innerText + "</b> <i>" + _$("select_persos").options[_$("select_persos").selectedIndex].text + "</i> </div> <div id='classement_shared'></div> </div>";
    let _0x58f437 = _0x2d88cd.length > 4 ? 4 : _0x2d88cd.length;
    for (var _0x3d6e14 = 0; _0x3d6e14 < _0x58f437; _0x3d6e14++) {
      if (_0x2d88cd[_0x3d6e14].valeur != 0) {
        let _0x101e45 = document.createElement("div");
        let _0x3ff767 = _0x2d88cd[_0x3d6e14].total == 0 ? 0 : parseInt(parseInt(_0x2d88cd[_0x3d6e14].valeur) * 100 / parseInt(_0x2d88cd[_0x3d6e14].total));
        _0x101e45.innerHTML = "<b>" + (_0x3d6e14 + 1) + "</b> <span><b>" + _0x2d88cd[_0x3d6e14].perso + "</b><i>" + _0x2d88cd[_0x3d6e14].valeur + " votes</i></span> <i>" + _0x3ff767 + "%</i>";
        _$("classement_shared").appendChild(_0x101e45);
      }
    }
  }
  function up_phes(_0x56b7dc) {
    switch (_0x56b7dc) {
      case 1:
        localStorage.nbre_lus = parseInt(localStorage.nbre_lus) + 1;
        check_phes(parseInt(localStorage.nbre_lus), 1);
        break;
      case 2:
        localStorage.nbre_sup = parseInt(localStorage.nbre_sup) + 1;
        check_phes(parseInt(localStorage.nbre_sup), 2);
        break;
      case 3:
        localStorage.nbre_creecat = parseInt(localStorage.nbre_creecat) + 1;
        check_phes(parseInt(localStorage.nbre_creecat), 3);
        break;
      case 4:
        localStorage.nbre_imp = parseInt(localStorage.nbre_imp) + 1;
        check_phes(parseInt(localStorage.nbre_imp), 4);
        break;
      case 5:
        localStorage.nbre_com = parseInt(localStorage.nbre_com) + 1;
        check_phes(parseInt(localStorage.nbre_com), 5);
        break;
      case 6:
        localStorage.nbre_not = parseInt(localStorage.nbre_not) + 1;
        check_phes(parseInt(localStorage.nbre_not), 6);
        break;
      case 7:
        localStorage.nbre_sha = parseInt(localStorage.nbre_sha) + 1;
        check_phes(parseInt(localStorage.nbre_sha), 7);
        break;
      case 8:
        localStorage.nbre_addcat = parseInt(localStorage.nbre_addcat) + 1;
        check_phes(parseInt(localStorage.nbre_addcat), 8);
        break;
      case 9:
        localStorage.nbre_hasard = parseInt(localStorage.nbre_hasard) + 1;
        check_phes(parseInt(localStorage.nbre_hasard), 9);
        break;
      case 10:
        localStorage.nbre_premiersup = parseInt(localStorage.nbre_premiersup) + 1;
        check_phes(parseInt(localStorage.nbre_premiersup), 10);
        break;
      case 11:
        localStorage.nbre_vot = parseInt(localStorage.nbre_vot) + 1;
        check_phes(parseInt(localStorage.nbre_vot), 11);
        break;
      case 12:
        localStorage.nbre_like = parseInt(localStorage.nbre_like) + 1;
        check_phes(parseInt(localStorage.nbre_like), 12);
        break;
      case 13:
        localStorage.nbre_dislike = parseInt(localStorage.nbre_dislike) + 1;
        check_phes(parseInt(localStorage.nbre_dislike), 13);
        break;
    }
    if (_0x56b7dc != 9 && _0x56b7dc != 8 && _0x56b7dc != 7) {
      localStorage.total_trophees = parseInt(localStorage.total_trophees) + 1;
    }
  }
  const _0x3eef93 = {
    id: 0x0,
    type: 0x1,
    total: 0x5,
    objectif: "Tu as lu 5 chapitres",
    titre: "Bienvenue, Lecteur!",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x10c919 = {
    id: 0x1,
    type: 0x1,
    total: 0xf,
    objectif: "Tu as lu 15 chapitres",
    titre: "Lecteur aguerri",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x10091f = {
    id: 0x2,
    type: 0x1,
    total: 0x32,
    objectif: "Tu as lu 50 chapitres",
    titre: "Voracité (rang C)",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x7290e6 = {
    id: 0x3,
    type: 0x4,
    total: 0x1,
    objectif: "Tu as importé 1 fichier",
    titre: "Start",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x7371fc = {
    id: 0x4,
    type: 0x4,
    total: 0x5,
    objectif: "Tu as importé 5 fichiers",
    titre: "Collectionneur (rang B)",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x1f57e6 = {
    id: 0x5,
    type: 0xa,
    total: 0x1,
    objectif: "Tu as retiré le webtoon tuto",
    titre: "Disciple confirmé",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x4bf8e2 = {
    id: 0x6,
    type: 0x1,
    total: 0x64,
    objectif: "Tu as lu 100 chapitres",
    titre: "Lecteur Confirmé",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x822aaa = {
    id: 0x7,
    type: 0x1,
    total: 0xc8,
    objectif: "Tu as lu 200 chapitres",
    titre: "Yeux Rouges",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0xf2a82d = {
    id: 0x8,
    type: 0x3,
    total: 0x1,
    objectif: "Tu as créé une catégorie",
    titre: "La voie de l'ordre I",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x41639d = {
    id: 0x9,
    type: 0x3,
    total: 0x5,
    objectif: "Tu as créé 5 catégories",
    titre: "La voie de l'ordre II",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x5716a4 = {
    id: 0xa,
    type: 0x1,
    total: 0x1f4,
    objectif: "Tu as lu 500 chapitres",
    titre: "Voracité (rang B)",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x3f4825 = {
    id: 0xb,
    type: 0x1,
    total: 0x2ee,
    objectif: "Tu as lu 750 chapitres",
    titre: "Voracité (rang A)",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0xaae1c1 = {
    id: 0xc,
    type: 0x4,
    total: 0xf,
    objectif: "Tu as importé 15 fichiers",
    titre: "Collectionneur (rang A)",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x38634e = {
    id: 0xd,
    type: 0x4,
    total: 0x1e,
    objectif: "Tu as importé 30 fichiers",
    titre: "Collectionneur (rang S)",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x1d5a1a = {
    id: 0xe,
    type: 0x1,
    total: 0x3e8,
    objectif: "Tu as lu 1000 chapitres",
    titre: "Haki de l'Observation",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x198f78 = {
    id: 0xf,
    type: 0x9,
    total: 0x1,
    objectif: "Le hasard a décidé pour toi une fois",
    titre: "Pile ou Face ?",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x2616bb = {
    id: 0x10,
    type: 0x9,
    total: 0x5,
    objectif: "Le hasard a décidé pour toi 5 fois",
    titre: "Lucky Coin",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x3feb21 = {
    id: 0x11,
    type: 0x9,
    total: 0xf,
    objectif: "Le hasard a décidé pour toi 15 fois",
    titre: "Destin en main",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x38233e = {
    id: 0x12,
    type: 0x9,
    total: 0x1e,
    objectif: "Le hasard a décidé pour toi 30 fois",
    titre: "Lucky Luke",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x3408da = {
    id: 0x13,
    type: 0x9,
    total: 0x41,
    objectif: "Le hasard a décidé pour toi 65 fois",
    titre: "Enfant de la destinée",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x2ed4bf = {
    id: 0x14,
    type: 0x1,
    total: 0x5dc,
    objectif: "Tu as lu 1500 chapitres",
    titre: "Voracité (rang S)",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x2e4c2e = {
    id: 0x15,
    type: 0x2,
    total: 0x1,
    objectif: "Tu as supprimé 1 toon",
    titre: "Graine de Destruction",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x4497ee = {
    id: 0x16,
    type: 0x2,
    total: 0x5,
    objectif: "Tu as supprimé 5 toons",
    titre: "Fin Consommateur",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x3db78b = {
    id: 0x17,
    type: 0x2,
    total: 0xf,
    objectif: "Tu as supprimé 15 toons",
    titre: "Jack l'éventreur",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0xe871d4 = {
    id: 0x18,
    type: 0x1,
    total: 0x7d0,
    objectif: "Tu as lu 2000 chapitres",
    titre: "Maître de la passion",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x34fe37 = {
    id: 0x19,
    type: 0x5,
    total: 0x1,
    objectif: "Ton premier commentaire",
    titre: "Nakama",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x307de4 = {
    id: 0x1a,
    type: 0x5,
    total: 0x5,
    objectif: "Tu as publié 5 commentaires",
    titre: "Traces laissées",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x251723 = {
    id: 0x1b,
    type: 0x5,
    total: 0xa,
    objectif: "Tu as publié 10 commentaires",
    titre: "Communication avancée I",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x3d6ecd = {
    id: 0x1c,
    type: 0x1,
    total: 0xbb8,
    objectif: "Tu as lu 3000 chapitres",
    titre: "Lecteur omniscient",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x18066e = {
    id: 0x1d,
    type: 0xc,
    total: 0x1,
    objectif: "Tu as donné un like",
    titre: "Ensemble",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x51dd5e = {
    id: 0x1e,
    type: 0xc,
    total: 0x5,
    objectif: "Tu as donné 5 likes",
    titre: 'Kiffeur',
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x34a4fb = {
    id: 0x1f,
    type: 0x1,
    total: 0x1388,
    objectif: "Tu as lu 5000 chapitres",
    titre: "Rinnegan",
    atteint: 0x0
  };
  function _0x111769(_0x1082cb, _0x1cd5aa, _0x4b62c7, _0x14a0e0) {
    return _0x51ac(_0x14a0e0 - 0x3be, _0x1cd5aa);
  }
  _0x34a4fb.rarete = 0x2;
  const _0x275153 = {
    id: 0x20,
    type: 0xd,
    total: 0x1,
    objectif: "Tu as donné un dislike",
    titre: "Différent",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x425ce4 = {
    id: 0x21,
    type: 0xd,
    total: 0x5,
    objectif: "Tu as donné 5 dislikes",
    titre: "Volonté ferme",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x2a7d29 = {
    id: 0x22,
    type: 0xd,
    total: 0xa,
    objectif: "Tu as donné 10 dislikes",
    titre: "Ma propre voie!",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x5bfa2d = {
    id: 0x23,
    type: 0x1,
    total: 0x1770,
    objectif: "Tu as lu 6000 chapitres",
    titre: "Voracité (rang SSS)",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x4ee931 = {
    id: 0x24,
    type: 0x2,
    total: 0x32,
    objectif: "Tu as supprimé 50 toons",
    titre: "Thanos",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x293460 = {
    id: 0x25,
    type: 0x2,
    total: 0x4b,
    objectif: "Tu as supprimé 75 toons",
    titre: "Light Yagami",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x282a46 = {
    id: 0x26,
    type: 0x1,
    total: 0x1d4c,
    objectif: "Tu as lu 7500 chapitres",
    titre: "Lecteur Borgne",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0xbaa7cb = {
    id: 0x27,
    type: 0x6,
    total: 0x1,
    objectif: "Première note",
    titre: "Introduction",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x551157 = {
    id: 0x28,
    type: 0x6,
    total: 0x5,
    objectif: "Tu as marqué 5 notes",
    titre: "Marque-Page (rang A)",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x172499 = {
    id: 0x29,
    type: 0x6,
    total: 0xf,
    objectif: "Tu as marqué 15 notes",
    titre: "Commentateur Accompli",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x572f47 = {
    id: 0x2a,
    type: 0x1,
    total: 0x2710,
    objectif: "Tu as lu 10000 chapitres",
    titre: "L'Aveugle Heureux",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0xa074b3 = {
    id: 0x2b,
    type: 0xc,
    total: 0xf,
    objectif: "Tu as donné 15 likes",
    titre: "Bienfaiteur",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x433bd5 = {
    id: 0x2c,
    type: 0xc,
    total: 0x1e,
    objectif: "Tu as donné 30 likes",
    titre: "Grand Mécène",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x4c561a = {
    id: 0x2d,
    type: 0xc,
    total: 0x3c,
    objectif: "Tu as donné 60 likes",
    titre: "Prêtre de l'amour",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0xab8307 = {
    id: 0x2e,
    type: 0x1,
    total: 0x2ee0,
    objectif: "Tu as lu 12000 chapitres",
    titre: "L'Aveugle Heureux",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x3ed2dc = {
    id: 0x2f,
    type: 0xd,
    total: 0x19,
    objectif: "Tu as donné 25 dislikes",
    titre: "La voie de la Rage I",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0xa332d2 = {
    id: 0x30,
    type: 0xd,
    total: 0x32,
    objectif: "Tu as donné 50 dislikes",
    titre: "La voie de la Haine",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x47e2bd = {
    id: 0x31,
    type: 0xd,
    total: 0x4b,
    objectif: "Tu as donné 75 dislikes",
    titre: "Déviance",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x528031 = {
    id: 0x32,
    type: 0x1,
    total: 0x32c8,
    objectif: "Tu as lu 13000 chapitres",
    titre: "L'Aveugle Heureux",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x1755c2 = {
    id: 0x33,
    type: 0x8,
    total: 0x1,
    objectif: "Un ajout vers une catégorie",
    titre: "Classeur",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x4ea138 = {
    id: 0x34,
    type: 0x8,
    total: 0x5,
    objectif: "Tu as fait 5 ajouts vers une catégorie",
    titre: "Classeur rang C",
    atteint: 0x0,
    rarete: 0x1
  };
  function _0x51ac(_0x3c0a60, _0x1a84a5) {
    const _0x4d22f4 = _0x2476();
    _0x51ac = function (_0x677d79, _0x51d0dc) {
      _0x677d79 = _0x677d79 - 165;
      let _0xba0743 = _0x4d22f4[_0x677d79];
      if (_0x51ac.odxWva === undefined) {
        var _0x3455fa = function (_0x575e76) {
          let _0x37f88e = '';
          let _0x2f64b1 = '';
          let _0x4d662f = _0x37f88e + _0x3455fa;
          let _0x2afd57 = 0;
          let _0x59b4c7;
          let _0x56a49d;
          for (let _0x4cdda0 = 0; _0x56a49d = _0x575e76.charAt(_0x4cdda0++); ~_0x56a49d && (_0x59b4c7 = _0x2afd57 % 4 ? _0x59b4c7 * 64 + _0x56a49d : _0x56a49d, _0x2afd57++ % 4) ? _0x37f88e += _0x4d662f.charCodeAt(_0x4cdda0 + 10) - 10 !== 0 ? String.fromCharCode(255 & _0x59b4c7 >> (-2 * _0x2afd57 & 6)) : _0x2afd57 : 0) {
            _0x56a49d = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='.indexOf(_0x56a49d);
          }
          let _0x1b69d1 = 0;
          for (let _0x5db817 = _0x37f88e.length; _0x1b69d1 < _0x5db817; _0x1b69d1++) {
            _0x2f64b1 += '%' + ('00' + _0x37f88e.charCodeAt(_0x1b69d1).toString(16)).slice(-2);
          }
          return decodeURIComponent(_0x2f64b1);
        };
        _0x51ac.iiytsg = _0x3455fa;
        _0x3c0a60 = arguments;
        _0x51ac.odxWva = true;
      }
      const _0x5dc606 = _0x4d22f4[0];
      const _0x229c4b = _0x677d79 + _0x5dc606;
      const _0x4e1258 = _0x3c0a60[_0x229c4b];
      if (!_0x4e1258) {
        const _0x20757d = function (_0x2d501d) {
          this.ceMtTV = _0x2d501d;
          this.GGazyq = [1, 0, 0];
          this.uXYrpe = function () {
            return 'newState';
          };
          this.jWvitX = "\\w+ *\\(\\) *{\\w+ *";
          this.jnhZob = "['|\"].+['|\"];? *}";
        };
        _0x20757d.prototype.RjzObk = function () {
          const _0x271ee6 = new RegExp(this.jWvitX + this.jnhZob);
          const _0x4eaaf0 = _0x271ee6.test(this.uXYrpe.toString()) ? --this.GGazyq[1] : --this.GGazyq[0];
          return this.rlQAdx(_0x4eaaf0);
        };
        _0x20757d.prototype.rlQAdx = function (_0x87a1b5) {
          if (!Boolean(~_0x87a1b5)) {
            return _0x87a1b5;
          }
          return this.EuusHk(this.ceMtTV);
        };
        _0x20757d.prototype.EuusHk = function (_0x40d95e) {
          let _0x23c01b = 0;
          for (let _0x56cd2f = this.GGazyq.length; _0x23c01b < _0x56cd2f; _0x23c01b++) {
            this.GGazyq.push(Math.round(Math.random()));
            _0x56cd2f = this.GGazyq.length;
          }
          return _0x40d95e(this.GGazyq[0]);
        };
        new _0x20757d(_0x51ac).RjzObk();
        _0xba0743 = _0x51ac.iiytsg(_0xba0743);
        _0x3c0a60[_0x229c4b] = _0xba0743;
      } else {
        _0xba0743 = _0x4e1258;
      }
      return _0xba0743;
    };
    return _0x51ac(_0x3c0a60, _0x1a84a5);
  }
  const _0xb80c8a = {
    id: 0x35,
    type: 0x8,
    total: 0xa,
    objectif: "Tu as fait 10 ajouts vers une catégorie",
    titre: "Classeur rang B",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x3cf92d = {
    id: 0x36,
    type: 0x8,
    total: 0x19,
    objectif: "Tu as fait 25 ajouts vers une catégorie",
    titre: "Classeur rang A",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0xf2ed1f = {
    id: 0x37,
    type: 0x1,
    total: 0x36b0,
    objectif: "Tu as lu 15000 chapitres",
    titre: "L'Aveugle Heureux",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x55f3f0 = {
    id: 0x38,
    type: 0x3,
    total: 0xa,
    objectif: "Tu as créé 10 catégories",
    titre: "Libraire",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x6fc46a = {
    id: 0x39,
    type: 0x3,
    total: 0x19,
    objectif: "Tu as créé 25 catégories",
    titre: "Archiviste",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x2ad118 = {
    id: 0x3a,
    type: 0x3,
    total: 0x32,
    objectif: "Tu as créé 50 catégories",
    titre: "Grand bibliothécaire",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x52dae = {
    id: 0x3b,
    type: 0x7,
    total: 0x1,
    objectif: "Tu as partagé un fichier",
    titre: 'GG',
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x50b03d = {
    id: 0x3c,
    type: 0x7,
    total: 0x5,
    objectif: "Tu as partagé 5 fichiers",
    titre: "Vrai Frère",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x17d833 = {
    id: 0x3d,
    type: 0x7,
    total: 0xc,
    objectif: "Tu as partagé 12 fichiers",
    titre: "Force de l'amitié",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x50e481 = {
    id: 0x3e,
    type: 0x7,
    total: 0x1e,
    objectif: "Tu as partagé 30 fichiers",
    titre: "Ribrianne",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x102086 = {
    id: 0x3f,
    type: 0x1,
    total: 0x3a98,
    objectif: "Tu as lu 15000 chapitres",
    titre: "Oeil Légendaire",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x34a022 = {
    id: 0x40,
    type: 0x6,
    total: 0x28,
    objectif: "Tu as marqué 40 notes",
    titre: "Marque-Page (rang S)",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x2bb4e1 = {
    id: 0x41,
    type: 0x6,
    total: 0x5a,
    objectif: "Tu as marqué 90 notes",
    titre: "Marque-Page (rang SSS)",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x58dc98 = {
    id: 0x42,
    type: 0x6,
    total: 0xc8,
    objectif: "Tu as marqué 200 notes",
    titre: "Grand Professeur",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x375222 = {
    id: 0x43,
    type: 0x1,
    total: 0x3e80,
    objectif: "Tu as lu 16000 chapitres",
    titre: "Divinité de la Lecture",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x32b39a = {
    id: 0x44,
    type: 0x2,
    total: 0x64,
    objectif: "Tu as supprimé 100 toons",
    titre: "L'annihilateur'",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x5c6a22 = {
    id: 0x45,
    type: 0x2,
    total: 0xfa,
    objectif: "Tu as supprimé 250 toons",
    titre: "E.N.D",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x1cf801 = {
    id: 0x46,
    type: 0x1,
    total: 0x4268,
    objectif: "Tu as lu 17000 chapitres",
    titre: "Divinité de la Lecture",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x4f9411 = {
    id: 0x47,
    type: 0xc,
    total: 0x64,
    objectif: "Tu as donné 100 likes",
    titre: "Juste et Bon",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x21427d = {
    id: 0x48,
    type: 0xc,
    total: 0xfa,
    objectif: "Tu as donné 250 likes",
    titre: "Ange",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x44f7d5 = {
    id: 0x49,
    type: 0xc,
    total: 0x1f4,
    objectif: "Tu as donné 500 likes",
    titre: "Archange",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0xd6c19f = {
    id: 0x4a,
    type: 0x1,
    total: 0x4650,
    objectif: "Tu as lu 18000 chapitres",
    titre: "Divinité de la Lecture",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x4d2c5a = {
    id: 0x4b,
    type: 0x5,
    total: 0x19,
    objectif: "Tu as publié 25 commentaires",
    titre: "Manieur d'encre",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x32d24f = {
    id: 0x4c,
    type: 0x5,
    total: 0x32,
    objectif: "Tu as publié 50 commentaires",
    titre: "Membre reconnu",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x3dc4e7 = {
    id: 0x4d,
    type: 0x5,
    total: 0x64,
    objectif: "Tu as publié 100 commentaires",
    titre: "Chef de meute",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x40f223 = {
    id: 0x4e,
    type: 0x5,
    total: 0xfa,
    objectif: "Tu as publié 250 commentaires",
    titre: "Communication avancée II",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x49fd9a = {
    id: 0x4f,
    type: 0x5,
    total: 0x1f4,
    objectif: "Tu as publié 500 commentaires",
    titre: "Membre indispensable",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x1100c7 = {
    id: 0x50,
    type: 0x1,
    total: 0x4a38,
    objectif: "Tu as lu 19000 chapitres",
    titre: "Divinité de la Lecture",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x5eb9b2 = {
    id: 0x51,
    type: 0x4,
    total: 0x64,
    objectif: "Tu as importé 100 fichiers",
    titre: "Collectionneur (rang SSS)",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x254f1c = {
    id: 0x52,
    type: 0x4,
    total: 0xc8,
    objectif: "Tu as importé 200 fichiers",
    titre: "Gol D. Roger",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x431fa6 = {
    id: 0x53,
    type: 0x4,
    total: 0x1f4,
    objectif: "Tu as importé 500 fichiers",
    titre: "Trou Blanc",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x1813c4 = {
    id: 0x54,
    type: 0x1,
    total: 0x4e20,
    objectif: "Tu as lu 20000 chapitres",
    titre: "Divinité de la Lecture",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x3449a2 = {
    id: 0x55,
    type: 0x8,
    total: 0x64,
    objectif: "100 ajouts vers une catégorie",
    titre: "Classeur rang SSS",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x43525b = {
    id: 0x56,
    type: 0x8,
    total: 0xfa,
    objectif: "250 ajouts vers une catégorie",
    titre: "L'assignateur",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x2a4524 = {
    id: 0x57,
    type: 0x8,
    total: 0x1f4,
    objectif: "500 ajouts vers une catégorie",
    titre: "Maître Archiviste",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x1aca96 = {
    id: 0x58,
    type: 0x8,
    total: 0x3e8,
    objectif: "1000 ajouts vers une catégorie",
    titre: "Archiviste Royal",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x1a9531 = {
    id: 0x59,
    type: 0x1,
    total: 0x61a8,
    objectif: "Tu as lu 25000 chapitres",
    titre: "Divinité de la Lecture",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x26f9c1 = {
    id: 0x5a,
    type: 0x2,
    total: 0x1f4,
    objectif: "Tu as supprimé 500 toons",
    titre: "Grand dévoreur",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x467af3 = {
    id: 0x5b,
    type: 0x2,
    total: 0x3e8,
    objectif: "Tu as supprimé 1000 toons",
    titre: 'Hakaishin',
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x39da3e = {
    id: 0x5c,
    type: 0x2,
    total: 0x7d0,
    objectif: "Tu as supprimé 2000 toons",
    titre: "Trou Noir",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x2b3afa = {
    id: 0x5d,
    type: 0x3,
    total: 0x64,
    objectif: "Tu as créé 100 catégories",
    titre: "Assignateur Suprême",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x3e7a58 = {
    id: 0x5e,
    type: 0x4,
    total: 0x3e8,
    objectif: "Tu as importé 1000 fichiers",
    titre: "Maître des Dofus",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x26e7e3 = {
    id: 0x5f,
    type: 0x4,
    total: 0x7d0,
    objectif: "Tu as importé 2000 fichiers",
    titre: "Propriétaire du Monde",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0xfc83ce = {
    id: 0x60,
    type: 0x5,
    total: 0x2ee,
    objectif: "Tu as publié 750 commentaires",
    titre: "Influenceur",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x4ccf6b = {
    id: 0x61,
    type: 0x5,
    total: 0x3e8,
    objectif: "Tu as publié 1000 commentaires",
    titre: "Communication avancée III",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x2736d4 = {
    id: 0x62,
    type: 0x5,
    total: 0x5dc,
    objectif: "Tu as publié 1500 commentaires",
    titre: "MoDéRaTeUr",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x3fa67f = {
    id: 0x63,
    type: 0x6,
    total: 0x1f4,
    objectif: "Tu as marqué 500 notes",
    titre: "Mémoires du Monde",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0xbe9a5c = {
    id: 0x64,
    type: 0x6,
    total: 0x3e8,
    objectif: "Tu as marqué 1000 notes",
    titre: "Divinité Critique",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x3b700d = {
    id: 0x65,
    type: 0x7,
    total: 0x32,
    objectif: "Tu as partagé 50 fichiers",
    titre: "Créateur de bonheur",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0xcb8825 = {
    id: 0x66,
    type: 0x7,
    total: 0x5a,
    objectif: "Tu as partagé 90 fichiers",
    titre: 'Idol',
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x3af99d = {
    id: 0x67,
    type: 0x7,
    total: 0x96,
    objectif: "Tu as partagé 150 fichiers",
    titre: "Chef de Secte",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x3dca67 = {
    id: 0x68,
    type: 0x7,
    total: 0x12c,
    objectif: "Tu as partagé 300 fichiers",
    titre: "Fondateur de Secte",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x31f51a = {
    id: 0x69,
    type: 0x7,
    total: 0x1f4,
    objectif: "Tu as partagé 500 fichiers",
    titre: "Hokage",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x219612 = {
    id: 0x6a,
    type: 0x7,
    total: 0x3e8,
    objectif: "Tu as partagé 1000 fichiers",
    titre: 'Messie',
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x3dd603 = {
    id: 0x6b,
    type: 0x8,
    total: 0x32,
    objectif: "Tu as fait 50 ajouts vers une catégorie",
    titre: "Classeur rang S",
    atteint: 0x0,
    rarete: 0x1
  };
  const _0x227b52 = {
    id: 0x6c,
    type: 0x8,
    total: 0x7d0,
    objectif: "2000 ajouts vers une catégorie",
    titre: "Harmoniseur céleste",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x449183 = {
    id: 0x6d,
    type: 0x8,
    total: 0xbb8,
    objectif: "3000 ajouts vers une catégorie",
    titre: "Le Classeur Sacré",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x582020 = {
    id: 0x6e,
    type: 0x8,
    total: 0x1388,
    objectif: "5000 ajouts vers une catégorie",
    titre: "Bibliothécaire Divin",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x2d6f8b = {
    id: 0x6f,
    type: 0x9,
    total: 0x64,
    objectif: "Le hasard a décidé pour toi 100 fois",
    titre: "Lucky Coin Jackpot",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x358f5b = {
    id: 0x70,
    type: 0x9,
    total: 0xc8,
    objectif: "Le hasard a décidé pour toi 200 fois",
    titre: "Héros de la destinée",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x3b2bb8 = {
    id: 0x71,
    type: 0x9,
    total: 0x190,
    objectif: "Le hasard a décidé pour toi 400 fois",
    titre: "Destin transcendé!",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x52ebc5 = {
    id: 0x72,
    type: 0x9,
    total: 0x3e8,
    objectif: "Le hasard a décidé pour toi 1000 fois",
    titre: "Inébranlable",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x1fdda5 = {
    id: 0x73,
    type: 0xc,
    total: 0x2ee,
    objectif: "Tu as donné 750 likes",
    titre: "Dieu de la Bienveillance",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x561140 = {
    id: 0x74,
    type: 0xc,
    total: 0x3e8,
    objectif: "Tu as donné 1000 likes",
    titre: "Incarnation du Bien",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x2741ac = {
    id: 0x75,
    type: 0xd,
    total: 0x64,
    objectif: "Tu as donné 100 dislikes",
    titre: "La voie de la Rage II",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x27514b = {
    id: 0x76,
    type: 0xd,
    total: 0xfa,
    objectif: "Tu as donné 250 dislikes",
    titre: "Mao",
    atteint: 0x0,
    rarete: 0x2
  };
  const _0x7a3bd9 = {
    id: 0x77,
    type: 0xd,
    total: 0x1f4,
    objectif: "Tu as donné 500 dislikes",
    titre: "Seigneur des Ténèbres",
    atteint: 0x0,
    rarete: 0x3
  };
  const _0x559b45 = {
    id: 0x78,
    type: 0xd,
    total: 0x3e8,
    objectif: "Tu as donné 1000 dislikes",
    titre: "Dieu Démon",
    atteint: 0x0,
    rarete: 0x3
  };
  var phes = [_0x3eef93, _0x10c919, _0x10091f, _0x7290e6, _0x7371fc, _0x1f57e6, _0x4bf8e2, _0x822aaa, _0xf2a82d, _0x41639d, _0x5716a4, _0x3f4825, _0xaae1c1, _0x38634e, _0x1d5a1a, _0x198f78, _0x2616bb, _0x3feb21, _0x38233e, _0x3408da, _0x2ed4bf, _0x2e4c2e, _0x4497ee, _0x3db78b, _0xe871d4, _0x34fe37, _0x307de4, _0x251723, _0x3d6ecd, _0x18066e, _0x51dd5e, _0x34a4fb, _0x275153, _0x425ce4, _0x2a7d29, _0x5bfa2d, _0x4ee931, _0x293460, _0x282a46, _0xbaa7cb, _0x551157, _0x172499, _0x572f47, _0xa074b3, _0x433bd5, _0x4c561a, _0xab8307, _0x3ed2dc, _0xa332d2, _0x47e2bd, _0x528031, _0x1755c2, _0x4ea138, _0xb80c8a, _0x3cf92d, _0xf2ed1f, _0x55f3f0, _0x6fc46a, _0x2ad118, _0x52dae, _0x50b03d, _0x17d833, _0x50e481, _0x102086, _0x34a022, _0x2bb4e1, _0x58dc98, _0x375222, _0x32b39a, _0x5c6a22, _0x1cf801, _0x4f9411, _0x21427d, _0x44f7d5, _0xd6c19f, _0x4d2c5a, _0x32d24f, _0x3dc4e7, _0x40f223, _0x49fd9a, _0x1100c7, _0x5eb9b2, _0x254f1c, _0x431fa6, _0x1813c4, _0x3449a2, _0x43525b, _0x2a4524, _0x1aca96, _0x1a9531, _0x26f9c1, _0x467af3, _0x39da3e, _0x2b3afa, _0x3e7a58, _0x26e7e3, _0xfc83ce, _0x4ccf6b, _0x2736d4, _0x3fa67f, _0xbe9a5c, _0x3b700d, _0xcb8825, _0x3af99d, _0x3dca67, _0x31f51a, _0x219612, _0x3dd603, _0x227b52, _0x449183, _0x582020, _0x2d6f8b, _0x358f5b, _0x3b2bb8, _0x52ebc5, _0x1fdda5, _0x561140, _0x2741ac, _0x27514b, _0x7a3bd9, _0x559b45];
  var autre_phes = phes.slice();
  var phes_taille = phes.length;
  function trophee_atteint(_0x41226c) {
    phes[_0x41226c].atteint = 1;
    let _0x313c61 = localStorage.trophees_obtenus.split(',');
    _0x313c61.push(_0x41226c);
    localStorage.trophees_obtenus = _0x313c61.toString();
    localStorage.total_trophees = parseInt(localStorage.total_trophees) + parseInt(phes[_0x41226c].rarete) * parseInt(phes[_0x41226c].total);
  }
  function affect_tab_phes(_0x537fb4) {
    const _0x4de666 = {
      ysUVo: function (_0x3ab743, _0x266f7d) {
        return _0x3ab743 < _0x266f7d;
      }
    };
    _0x4de666.oqojj = function (_0x42a775, _0x5e19c2) {
      return _0x42a775 == _0x5e19c2;
    };
    let _0x7ba1ff = [];
    for (var _0x365a37 = 0; _0x365a37 < autre_phes.length; _0x365a37++) {
      if (_0x4de666.oqojj(phes[_0x365a37].type, _0x537fb4)) {
        _0x7ba1ff.push(phes[_0x365a37]);
        autre_phes.splice(_0x365a37, 1);
      }
    }
    return _0x7ba1ff.slice();
  }
  if (!localStorage.nbre_lus) {
    localStorage.nbre_lus = 0;
    localStorage.nbre_sup = 0;
    localStorage.nbre_creecat = 0;
    localStorage.nbre_imp = 0;
    localStorage.nbre_com = 0;
    localStorage.nbre_not = 0;
    localStorage.nbre_sha = 0;
    localStorage.nbre_addcat = 0;
    localStorage.nbre_hasard = 0;
    localStorage.nbre_premiersup = 0;
    localStorage.nbre_vot = 0;
    localStorage.trophees_obtenus = -1;
  }
  if (!localStorage.nbre_like) {
    localStorage.nbre_like = 0;
    localStorage.nbre_dislike = 0;
  }
  if (!localStorage.sukoru) {
    localStorage.sukoru = parseInt(localStorage.nbre_lus) * 30 + 3000;
  }
  function total_phes() {
    let _0x45cbfd = localStorage.trophees_obtenus.split(',');
    let _0x5f27e0 = 0;
    for (var _0x11af95 = 1; _0x11af95 < _0x45cbfd.length; _0x11af95++) {
      _0x5f27e0 += parseInt(phes[_0x11af95].rarete) * parseInt(phes[_0x11af95].total);
      console.log("ugh");
    }
    localStorage.total_trophees = _0x5f27e0;
  }
  if (!localStorage.total_trophees) {
    localStorage.total_trophees = 0;
    total_phes();
  }
  function envoyer_total_trophees() {
    const _0x21f520 = {
      MoWVa: function (_0x456554, _0x98b8a7) {
        return _0x456554 == _0x98b8a7;
      },
      rDrgZ: function (_0x44c80f, _0x4dfecf) {
        return _0x44c80f == _0x4dfecf;
      },
      sHOLI: "GET"
    };
    _0x21f520.JAMaj = function (_0x42223f, _0x10a642) {
      return _0x42223f + _0x10a642;
    };
    _0x21f520.JIXwl = function (_0x4959c2, _0x1333e8) {
      return _0x4959c2 + _0x1333e8;
    };
    _0x21f520.luWIA = "?sendphees=1&mail=";
    _0x21f520.Odmcx = "&pseudo=";
    _0x21f520.hsxoH = "&total_phees=";
    if (localStorage.author && localStorage.author.length > 0 && localStorage.uuid) {
      var _0x4f04e3 = new XMLHttpRequest();
      _0x4f04e3.onreadystatechange = function () {
        if (this.status == 200) {
          if (parseInt(this.responseText) == 1) {} else {}
        }
      };
      _0x4f04e3.open("GET", _0x21f520.JAMaj(_0x21f520.JAMaj(_0x21f520.JIXwl(_0x21f520.JIXwl("https://toutoutil.fr/js_script.php" + _0x21f520.luWIA, localStorage.uuid), _0x21f520.Odmcx) + localStorage.author, _0x21f520.hsxoH), localStorage.total_trophees), true);
      _0x4f04e3.send();
    }
  }
  envoyer_total_trophees();
  var lec_phes = affect_tab_phes(1);
  var sup_phes = affect_tab_phes(2);
  var creecat_phes = affect_tab_phes(3);
  var imp_phes = affect_tab_phes(4);
  var com_phes = affect_tab_phes(5);
  var not_phes = affect_tab_phes(6);
  var sha_phes = affect_tab_phes(7);
  var addcat_phes = affect_tab_phes(8);
  var hasard_phes = affect_tab_phes(9);
  var premiersup_phes = affect_tab_phes(10);
  var vot_phes = affect_tab_phes(11);
  var like_phes = affect_tab_phes(12);
  var dislike_phes = affect_tab_phes(13);
  function down_troph(_0xd29e87) {
    _0xd29e87.style.animation = "down_back_trophy .5s forwards, create-rainbow-gradient-shift 10s ease infinite";
    setTimeout(() => {
      _0xd29e87.remove();
    }, 400);
  }
  function show_phe(_0x35b054) {
    let _0x3a708 = document.createElement("div");
    let _0xac9b73;
    _0x3a708.id = "unlocked_" + _0x35b054.id;
    _0x3a708.setAttribute("class", "back_trophy_unlocked");
    _0x3a708.setAttribute("onclick", "down_troph(this)");
    switch (_0x35b054.rarete) {
      case 1:
        _0xac9b73 = "bronze";
        break;
      case 2:
        _0xac9b73 = "argent";
        break;
      case 3:
        _0xac9b73 = 'or';
        break;
    }
    _0x3a708.innerHTML = "<div class='trophy_unlocked'><span style='background: url(img/trophee_" + _0xac9b73 + ".png) 50% no-repeat;background-size: contain;'></span><span><i>Trophée débloqué</i><b>" + _0x35b054.titre + "</b></span></div>";
    _$("body").appendChild(_0x3a708);
    setTimeout(() => {
      down_troph(_$('unlocked_' + _0x35b054.id));
    }, 4500);
  }
  function get_tab_phes(_0x509ff7) {
    let _0x43428d;
    switch (_0x509ff7) {
      case 1:
        _0x43428d = lec_phes.slice();
        break;
      case 2:
        _0x43428d = sup_phes.slice();
        break;
      case 3:
        _0x43428d = creecat_phes.slice();
        break;
      case 4:
        _0x43428d = imp_phes.slice();
        break;
      case 5:
        _0x43428d = com_phes.slice();
        break;
      case 6:
        _0x43428d = not_phes.slice();
        break;
      case 7:
        _0x43428d = sha_phes.slice();
        break;
      case 8:
        _0x43428d = addcat_phes.slice();
        break;
      case 9:
        _0x43428d = hasard_phes.slice();
        break;
      case 10:
        _0x43428d = premiersup_phes.slice();
        break;
      case 11:
        _0x43428d = vot_phes.slice();
        break;
      case 12:
        _0x43428d = like_phes.slice();
        break;
      case 13:
        _0x43428d = dislike_phes.slice();
        break;
    }
    return _0x43428d;
  }
  function get_localvalue_phes(_0x83d44a) {
    let _0x4288be = [];
    switch (_0x83d44a) {
      case 1:
        _0x4288be = localStorage.nbre_lus;
        break;
      case 2:
        _0x4288be = localStorage.nbre_sup;
        break;
      case 3:
        _0x4288be = localStorage.nbre_creecat;
        break;
      case 4:
        _0x4288be = localStorage.nbre_imp;
        break;
      case 5:
        _0x4288be = localStorage.nbre_com;
        break;
      case 6:
        _0x4288be = localStorage.nbre_not;
        break;
      case 7:
        _0x4288be = localStorage.nbre_sha;
        break;
      case 8:
        _0x4288be = localStorage.nbre_addcat;
        break;
      case 9:
        _0x4288be = localStorage.nbre_hasard;
        break;
      case 10:
        _0x4288be = localStorage.nbre_premiersup;
        break;
      case 11:
        _0x4288be = localStorage.nbre_vot;
        break;
      case 12:
        _0x4288be = localStorage.nbre_like;
        break;
      case 13:
        _0x4288be = localStorage.nbre_dislike;
        break;
    }
    return _0x4288be;
  }
  function check_phes(_0x12b718, _0x12c58b) {
    let _0x47689b = [];
    _0x47689b = get_tab_phes(_0x12c58b);
    for (var _0x588f83 = 0; _0x588f83 < _0x47689b.length; _0x588f83++) {
      if (_0x47689b[_0x588f83].type == _0x12c58b && _0x47689b[_0x588f83].total == _0x12b718) {
        _0x47689b[_0x588f83].atteint = 1;
        trophee_atteint(_0x47689b[_0x588f83].id);
        show_phe(_0x47689b[_0x588f83]);
        _0x588f83 = _0x47689b.length;
      }
    }
  }
  function show_trophy_list() {
    _$("trophy_list").innerHTML = '';
    let _0x4c3a8c = localStorage.trophees_obtenus.split(',');
    for (var _0x1ba65a = 0; _0x1ba65a < phes.length; _0x1ba65a++) {
      let _0x35e99c = document.createElement("div");
      let _0xcbb9e9 = '';
      if (_0x4c3a8c.includes('' + phes[_0x1ba65a].id + '') || phes[_0x1ba65a].atteint == 1) {
        _0xcbb9e9 = "trophy_checked ";
      }
      _0x35e99c.setAttribute('class', _0xcbb9e9 + "trophee_type_" + phes[_0x1ba65a].type);
      _0x35e99c.innerHTML = "<b class='trophee_rarete_" + phes[_0x1ba65a].rarete + "'></b><span><b>" + phes[_0x1ba65a].titre + '</b><i>' + phes[_0x1ba65a].objectif + "</i><progress value='" + parseInt(get_localvalue_phes(phes[_0x1ba65a].type)) / phes[_0x1ba65a].total * 100 + "' max='100'></progress></span>";
      _$("trophy_list").appendChild(_0x35e99c);
    }
  }
  var trophees_on = 0;
  function show_trophees() {
    if (trophees_on == 0) {
      trophees_on = 1;
      _$('trophees').style.animation = "div_top_down .5s forwards";
      let _0x3294f0 = (localStorage.trophees_obtenus.split(',').length - 1) / phes_taille * 100;
      let _0x2fca8a = _0x3294f0 >= 100 ? "class='platine'" : '';
      _$("trophees").innerHTML = "<span class='titre'><img src='img/medal.png'></span><progress " + _0x2fca8a + " value='" + _0x3294f0 + "' max='100'></progress><p id='ranking_p'><span onclick='switch_achievements(this,2)'><i>Rang</i><b>" + get_rank() + "</b></span><span onclick='switch_achievements(this,3)' id='span_rang'><b>--</b><i>xxx pts</i></span></p><div id='trophy_list'></div>";
      creer_fermer_b('trophees');
      show_trophy_list();
      get_ladder_rank();
    }
  }
  const _0x3730a7 = {
    id: 0x0,
    titre: 'Parquet',
    limite: 0x0,
    image: "wood (2).png"
  };
  const _0x478641 = {
    id: 0x1,
    titre: "Bronze",
    limite: 0x3e8,
    image: "bronze (2).png"
  };
  const _0x5e911c = {
    id: 0x2,
    titre: 'Argent',
    limite: 0x9c4,
    image: "silver (2).png"
  };
  const _0x4e23bf = {
    id: 0x3,
    titre: "Doré",
    limite: 0x1388,
    image: "gold (2).png"
  };
  const _0x27cd44 = {
    id: 0x4,
    titre: 'Diamant',
    limite: 0x2710,
    image: "diamond (2).png"
  };
  const _0x527cb7 = {
    id: 0x5,
    titre: "Ruby",
    limite: 0x3a98,
    image: "ruby (2).png"
  };
  const _0xd7e9b6 = {
    id: 0x6,
    titre: 'Platine',
    limite: 0x4e20,
    image: "platinum (2).png"
  };
  const _0x235ba5 = {
    id: 0x7,
    titre: "Féérique",
    limite: 0x61a8,
    image: "fairy (2).png"
  };
  const _0x43791b = {
    id: 0x8,
    titre: "Dragon",
    limite: 0x7530,
    image: "dragon (2).png"
  };
  const _0x4df9be = {
    id: 0x9,
    titre: "Esprit",
    limite: 0x9c40,
    image: "spiritual (2).png"
  };
  const _0x1e34a1 = {
    id: 0xa,
    titre: 'Démon',
    limite: 0xc350,
    image: "devil (2).png"
  };
  const _0x531e3c = {
    id: 0xb,
    titre: "Archidémon",
    limite: 0xfde8,
    image: "archdevil (2).png"
  };
  function _0x6a1cb(_0x4120d5, _0x56096c, _0x212c90, _0x5ddb23) {
    return _0x51ac(_0x4120d5 + 0x1cd, _0x212c90);
  }
  const _0x1472a0 = {
    id: 0xc,
    titre: 'Sacré',
    limite: 0x15f90,
    image: "sacred (2).png"
  };
  const _0x3c919f = {
    id: 0xd,
    titre: "Divin",
    limite: 0x1e848,
    image: "Divine (2).png"
  };
  const _0x13979f = {
    id: 0xe,
    titre: 'Dieu',
    limite: 0x30d40,
    image: "god (2).png"
  };
  var rangs = [_0x3730a7, _0x478641, _0x5e911c, _0x4e23bf, _0x27cd44, _0x527cb7, _0xd7e9b6, _0x235ba5, _0x43791b, _0x4df9be, _0x1e34a1, _0x531e3c, _0x1472a0, _0x3c919f, _0x13979f];
  function show_rank_list() {
    let _0x3d08c5;
    for (var _0x3aff5e = rangs.length - 1; _0x3aff5e > -1; _0x3aff5e--) {
      let _0x35d937 = document.createElement("div");
      let _0x5687a2 = '';
      if (parseInt(localStorage.total_trophees) >= rangs[_0x3aff5e].limite) {
        _0x5687a2 = "title_checked";
        if (_0x3d08c5 == null || _0x3d08c5 == undefined) {
          _0x3d08c5 = 1;
          _0x35d937.setAttribute('id', "to_scroll_to");
          _0x35d937.style.animation = "rank_move 3s infinite";
        }
      } else {
        _0x35d937.style.filter = "opacity(0.75) grayscale(1) blur(1.5px)";
      }
      _0x35d937.setAttribute("class", _0x5687a2);
      _0x35d937.innerHTML = "<img src='img/rangs/" + rangs[_0x3aff5e].image + "'><span><b>" + rangs[_0x3aff5e].titre + "</b><i>+" + rangs[_0x3aff5e].limite + " pts</i></span>";
      _$("title_list").appendChild(_0x35d937);
    }
    setTimeout(() => {
      _$("title_list").scrollTo(0, _$("to_scroll_to").offsetTop - _$("to_scroll_to").offsetHeight + 20);
    }, 500);
  }
  function get_rank() {
    for (var _0x3846ac = 0; _0x3846ac < rangs.length; _0x3846ac++) {
      if (parseInt(localStorage.total_trophees) >= rangs[_0x3846ac].limite) {
        return rangs[_0x3846ac].titre;
        _0x3846ac = rangs.length;
      }
    }
  }
  function get_ladder_rank() {
    if (localStorage.author && localStorage.author.length > 0 && localStorage.uuid) {
      var _0x5b3c64 = new XMLHttpRequest();
      _0x5b3c64.onreadystatechange = function () {
        if (parseInt(this.responseText) != -1) {
          _$("span_rang").innerHTML = "<b>#" + this.responseText + "</b><i>" + localStorage.total_trophees + " pts</i>";
        } else {
          notif("Oups... Problème");
        }
      };
      _0x5b3c64.open('GET', "https://toutoutil.fr/js_script.php?ranked=1&mail=" + localStorage.uuid + "&pseudo=" + localStorage.author + "&total_phees=" + localStorage.total_trophees, false);
      _0x5b3c64.send();
    } else {
      _$("span_rang").innerHTML = '--';
      _$("span_rang").style.filter = "grayscale(1)";
    }
  }
  function show_ranking_list() {
    if (localStorage.author && localStorage.author.length > 0 && localStorage.uuid) {
      var _0xbc4da = new XMLHttpRequest();
      _0xbc4da.onreadystatechange = function () {
        if (parseInt(this.responseText) != -1) {
          _$("ranking_list").innerHTML = this.responseText;
        } else {
          notif("Problème d'affichage");
        }
      };
      _0xbc4da.open("GET", "https://toutoutil.fr/js_script.php?rankedlist=1", false);
      _0xbc4da.send();
    } else {
      notif("Sans... commentaire...?");
    }
  }
  var switcher_achievements = 1;
  function switch_achievements(_0x16552b, _0x56bbe1) {
    let _0x270b92 = _$("trophees").getElementsByTagName("div")[0];
    if (switcher_achievements == _0x56bbe1) {
      _0x270b92.innerHTML = '';
      _0x270b92.setAttribute('id', "trophy_list");
      show_trophy_list();
      switcher_achievements = 1;
    } else {
      if (_0x56bbe1 == 2) {
        _0x270b92.innerHTML = '';
        _0x270b92.setAttribute('id', 'title_list');
        show_rank_list();
        switcher_achievements = 2;
      }
      if (_0x56bbe1 == 3) {
        _0x270b92.innerHTML = '';
        _0x270b92.setAttribute('id', "ranking_list");
        show_ranking_list();
        switcher_achievements = 3;
      }
    }
  }
  var feed_up = 0;
  var onglet_feed = 0;
  function show_feed() {
    if (onglet_feed == 0) {
      reset_feed_headers(_$("tete_feed").getElementsByTagName('h3')[0].getElementsByTagName('b')[0]);
      set_feed();
      theme_actu = dark_mode;
    }
    if (parseInt(dark_mode) != theme_actu) {
      theme_actu = dark_mode;
      switch (onglet_feed) {
        case 1:
          set_feed();
          break;
        case 2:
          set_reponses();
          break;
      }
    }
    creer_fermer("feed");
    _$("feed").style.animation = "div_up .7s forwards";
    feed_up = 1;
  }
  var rici = ["Rien ici ?", "C'est vide par ici", "Vide de chez vide", "Que dalle ici", "Y'a pas un chat", "C'est vierge ici", "Ah! Aucun commentaire ?"];
  var rici_comment = ["Tu veux être le premier ?", "Tu vas écrire la première page ?", "Tu peux être le premier", "Qui sera le premier ?", "Pourquoi pas commencer ?", "Ça commencera avec toi ?"];
  async function afficher(_0x23e0d6, _0x214056) {
    var _0xa10e32 = new XMLHttpRequest();
    _0xa10e32.onreadystatechange = function () {
      if (this.status == 200) {
        if (_$("commentss") == null || _$("commentss") == undefined) {
          let _0x494a65 = document.createElement('div');
          _0x494a65.setAttribute('id', "commentss");
          _$('comments').appendChild(_0x494a65);
        }
        if (_0x214056 == -1) {
          zone_com_ok = 1;
          if (this.responseText.length < 2) {
            _$("commentss").innerHTML = "<div id='nocomment'><img src='img/boo.png'><b>" + rici[Math.round(Math.random() * (rici.length - 1))] + '</b><i>' + rici_comment[Math.round(Math.random() * (rici_comment.length - 1))] + '</i></div>';
          } else {
            _$("commentss").innerHTML = this.responseText;
          }
        } else {
          _$("cmt_" + _0x214056).innerHTML = this.responseText;
          if (this.responseText.length == 0) {
            notif("Pas de réponse");
          }
        }
        if (_$("messg") == null || _$("messg") == undefined) {
          let _0x12322e = document.createElement("span");
          _0x12322e.setAttribute('id', "span_messg");
          _0x12322e.innerHTML = "<input type='text' id='messg' placeholder='Commente ...' maxlength='600' onfocus='monter(this,1)' onfocusout='monter(this,0)'><button id='button_messg' onclick='envoyer(-1, \"" + encodeURIComponent(cache_comm) + "\")'></button></span>";
          _$("comments").appendChild(_0x12322e);
        }
      }
    };
    _0xa10e32.open("GET", "https://toutoutil.fr/js_script.php?check=" + encodeURIComponent(_0x23e0d6) + "&id_msg_comment=" + _0x214056, true);
    _0xa10e32.send();
  }
  var titre_cmnts = ["On dit quoi?", "Quelques comms", "Quelques avis", "On a à dire ?", "Ça a fait parler"];
  async function down_afficher(_0xd56354) {
    var _0x38a418 = new XMLHttpRequest();
    _0x38a418.onreadystatechange = function () {
      if (this.status == 200) {
        if (this.responseText.length < 2) {} else {
          if (_$("down_comments") == undefined || _$("down_comments") == null) {
            let _0x2bf628 = document.createElement("div");
            _0x2bf628.id = "down_comments";
            if (parseInt(dark_mode) == 1) {
              _0x2bf628.setAttribute("class", "dark_down_comments");
            }
            _0x2bf628.innerHTML = "<h3><i>📃 " + titre_cmnts[Math.round(Math.random() * (titre_cmnts.length - 1))] + "</i></h3>" + this.responseText;
            _$("pdf_chapitre").appendChild(_0x2bf628);
          }
        }
      } else {}
    };
    _0x38a418.open("GET", "https://toutoutil.fr/js_script.php?checked=" + encodeURIComponent(_0xd56354), false);
    _0x38a418.send();
    set_emotes();
    down_suite();
  }
  function set_emotes() {
    var _0x435641 = new XMLHttpRequest();
    _0x435641.onreadystatechange = function () {
      if (this.status == 200) {
        let _0x3a5251 = _$("emojis").getElementsByTagName('i');
        if (this.responseText == -1 || this.responseText == '-1') {
          for (var _0xe54302 = 0; _0xe54302 < _0x3a5251.length; _0xe54302++) {
            _0x3a5251[_0xe54302].innerText = 0;
          }
        } else {
          let _0x145721 = this.responseText.split(',');
          for (var _0xe54302 = 0; _0xe54302 < _0x3a5251.length; _0xe54302++) {
            _0x3a5251[_0xe54302].innerText = _0x145721[_0xe54302];
          }
        }
      }
    };
    _0x435641.open("GET", "https://toutoutil.fr/js_script.php?sekema=" + encodeURIComponent(cache_comm), true);
    _0x435641.send();
  }
  function reset_emotes() {
    _$("emojis").style.animation = "emoji_back .25s forwards";
    setTimeout(() => {
      _$("emojis").innerHTML = "<span onclick='emo_vote(this,3)'><b>🤩</b><i>0</i></span><span onclick='emo_vote(this,4)'><b>😭</b><i>0</i></span><span onclick='emo_vote(this,5)'><b>😡</b><i>0</i></span><span onclick='emo_vote(this,6)'><b>😂</b><i>0</i></span><span onclick='emo_vote(this,7)'><b>😮‍</b><i>0</i></span>";
    }, 250);
  }
  function emo_vote(_0x1d3aeb, _0x1b7f8c) {
    _0x1d3aeb.setAttribute("onclick", '');
    var _0x3d2168 = new XMLHttpRequest();
    _0x3d2168.onreadystatechange = function () {
      if (this.status == 200) {
        if (parseInt(this.responseText) == -1) {
          notif("P'tit problème");
          _0x1d3aeb.setAttribute("onclick", "emo_vote(this," + _0x1b7f8c + ')');
        } else {
          if (parseInt(this.responseText) == 1) {
            _0x1d3aeb.setAttribute('id', "emovoted");
            _0x1d3aeb.setAttribute("onclick", '');
            _0x1d3aeb.getElementsByTagName('i')[0].innerText = parseInt(_0x1d3aeb.getElementsByTagName('i')[0].innerText) + 1;
            let _0x96e1d2 = _$("emojis").getElementsByTagName("span");
            for (var _0x5836cc = 0; _0x5836cc < _0x96e1d2.length; _0x5836cc++) {
              let _0x2ccd0e = _0x96e1d2[_0x5836cc].getAttribute('id');
              if (_0x2ccd0e == null || _0x2ccd0e == undefined || _0x2ccd0e != "emovoted") {
                _0x96e1d2[_0x5836cc].setAttribute("onclick", '');
                _0x96e1d2[_0x5836cc].style.filter = "grayscale(1) opacity(0.7)";
              }
            }
          } else {
            notif("P'tit problème");
            _0x1d3aeb.setAttribute("onclick", "emo_vote(this," + _0x1b7f8c + ')');
          }
        }
        console.log(this.responseText);
      } else {
        _0x1d3aeb.setAttribute('onclick', "emo_vote(this," + _0x1b7f8c + ')');
      }
    };
    _0x3d2168.open("GET", "https://toutoutil.fr/js_script.php?aruka=" + encodeURIComponent(cache_comm) + "&typo=" + parseInt(_0x1b7f8c), false);
    _0x3d2168.send();
  }
  function down_suite() {
    if (_$('recomms') == null || _$("recomms") == undefined) {
      let _0x5d92a3 = _$('controls').getElementsByClassName("nav_btn")[1];
      let _0x4fd3b8 = _0x5d92a3.getAttribute("onclick");
      if (_0x4fd3b8 == "nothing()") {
        db.transaction(function (_0x151427) {
          _0x151427.executeSql("SELECT comic.* FROM comic WHERE ( comic.id != ? AND comic.lus != comic.total AND comic.total != 0 AND comic.id != 1 ) ORDER BY (comic.total / comic.lus) LIMIT 3", [parseInt(localStorage.webtoon)], function (_0x53bcb1, _0x1d6b6d) {
            let _0x2d2bc1 = _0x1d6b6d.rows.length;
            if (_0x2d2bc1 > 0) {
              let _0x2dabe4 = document.createElement("div");
              let _0x18031d = document.createElement("div");
              _0x2dabe4.id = 'recomms';
              if (parseInt(dark_mode) == 1) {
                _0x2dabe4.setAttribute("class", "dark_recomms");
              }
              _0x2dabe4.innerHTML = "<h3>Tu continues ?</h3>";
              _0x18031d.innerHTML = '';
              for (var _0x1494f4 = 0; _0x1494f4 < _0x2d2bc1; _0x1494f4++) {
                let _0x1bacd1 = parseInt(_0x1d6b6d.rows.item(_0x1494f4).lus) / parseInt(_0x1d6b6d.rows.item(_0x1494f4).total) * 100;
                _0x18031d.innerHTML += "<div onclick='continuer(" + _0x1d6b6d.rows.item(_0x1494f4).id + ")'><img src='" + _0x1d6b6d.rows.item(_0x1494f4).miniature + "'><i>" + _0x1d6b6d.rows.item(_0x1494f4).titre.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, "\"").replace(/&#039;/g, "'") + "</i><progress class='progend' value='" + _0x1bacd1 + "' max='100'></progress></div>";
              }
              _0x2dabe4.appendChild(_0x18031d);
              _$("pdf_chapitre").appendChild(_0x2dabe4);
            }
          });
        });
      }
    }
  }
  function continuer(_0x35f451) {
    _$('comic_' + _0x35f451).click();
    swipe_out(_$("div_pdf_chapitre"), 8);
  }
  function monter(_0xdd1d37, _0x2345aa) {
    if (_0x2345aa == 1) {
      _0xdd1d37.parentNode.style.transform = "translate(0px,-50vh)";
    } else {
      _0xdd1d37.parentNode.style.transform = "translate(0px,0%)";
    }
  }
  async function envoyer(_0x3c261f, _0x339f19) {
    _$("messg").style.background = "rgba(1 1 1 / 2%) url(img/loading2.gif) 100% 60% no-repeat";
    _$("messg").style.backgroundSize = "10%";
    _$("button_messg").onclick = () => {};
    let _0x15223b = _$("messg").value;
    if (_0x15223b.length > 0) {
      var _0x1dafbd = new XMLHttpRequest();
      _0x1dafbd.onreadystatechange = function () {
        _$("button_messg").onclick = () => {
          envoyer(_0x3c261f, _0x339f19);
        };
        if (this.status == 200 && this.readyState == 2) {
          _$("messg").style.background = "rgba(1 1 1 / 2%)";
          _$("messg").style.backgroundSize = "10%";
          let _0x41c90e = parseInt(this.responseText);
          if (_0x41c90e != -1) {
            notif("Envoyé");
            up_phes(5);
            if (_$("nocomment") != undefined && _$("nocomment") != null) {
              _$("nocomment").remove();
            }
            _$("messg").value = '';
            let _0x2dfdce = new Date().toISOString().slice(0, 19).replace('T', " ");
            if (_0x3c261f == -1) {
              let _0x1157d7 = document.createElement("div");
              _0x1157d7.setAttribute('id', "msg_" + _0x41c90e);
              _0x1157d7.innerHTML = "<span><b>" + author + "</b><i>" + _0x2dfdce + "</i></span> <span><span>" + _0x15223b + "</span></span> <span> <button onclick=\"repondre('" + cache_comm + "'," + _0x41c90e + ")\">Repondre</button> <span><button onclick='voter(this," + _0x41c90e + ", 1)'>0</button><button onclick='voter(this," + _0x41c90e + ", -1)'>0</button></span> </span><div id='cmt_" + _0x41c90e + "'></div>";
              _$("commentss").appendChild(_0x1157d7);
              _$("commentss").scrollTop = _$("commentss").scrollHeight;
            } else {
              _$("cmt_" + _0x3c261f).innerHTML += "<div id='msg_" + _0x41c90e + "'><span><b>" + author + "</b><i>" + _0x2dfdce + "</i></span> <span><span>" + _0x15223b + "</span></span> <span> <button onclick=\"repondre('" + cache_comm + "'," + _0x41c90e + ")\">Repondre</button> <span><button onclick='voter(this," + _0x41c90e + ", 1)'>0</button><button onclick='voter(this," + _0x41c90e + ", -1)'>0</button></span> </span><div id='cmt_" + _0x41c90e + "'></div></div>";
              _$("cmt_" + _0x3c261f).scrollTop = _$("cmt_" + _0x3c261f).scrollHeight;
            }
          } else {
            notif("Pas envoyé");
          }
        }
      };
      _0x1dafbd.open('GET', "https://toutoutil.fr/js_script.php?sendd=1&contenu=" + _0x15223b + "&likes=0&dislikes=0&id_msg_comment=" + _0x3c261f + "&id_chapitre=" + encodeURIComponent(_0x339f19) + "&author=" + author, true);
      _0x1dafbd.send();
    } else {
      notif("Message vide?");
    }
  }
  function unlock() {
    localStorage.establodo = '0';
    _$('pass_div').style.transform = "translate(-50%, 100%)";
  }
  function lock() {
    if (!localStorage.elloulou) {
      let _0x283fa3 = document.createElement("div");
      _0x283fa3.id = "pass_div";
      _0x283fa3.innerHTML = "<div id='pass_div'> <div id='div_pass'> <h4>Entre ton mot de passe</h4> <h5>COPIE-LE ET GARDE-LE! Parce qu'il n'y aura PAS moyen de le restaurer ou de le modifier sur l'appli</h5> <input type='text' id='pwd_input' placeholder='Écris ton mot de passe ici'> <button onclick='save_pwd()'>Sauvegarder</button> </div> </div>";
      _$("body").appendChild(_0x283fa3);
      _$("pass_div").style.transform = "translate(-50%, 0%)";
    } else {
      localStorage.establodo = '1';
      let _0x280ea5 = _$("pass_div");
      _0x280ea5.innerHTML = "<div id='div_pass' style='height:16vh'> <h4>Entre ton mot de passe</h4><input type='password' id='pwd_input' placeholder='Écris ton mot de passe ici'> <button onclick='check_pwd()'>Valider</button> </div>";
      _$("pass_div").style.transform = "translate(-50%, 0%)";
    }
  }
  function save_pwd() {
    let _0x5f52f5 = _$('pwd_input').value;
    if (_0x5f52f5.length != 0) {
      localStorage.elloulou = _0x5f52f5;
      _$("pass_div").style.transform = "translate(-50%, 100%)";
      setTimeout(() => {
        lock();
      }, 500);
    }
  }
  var pwd_try = 0;
  function check_pwd(_0x2c02cb) {
    let _0x55d216 = _$("pwd_input").value;
    if (localStorage.elloulou == _0x55d216 && pwd_try < 5) {
      unlock();
    } else {
      notif("Non non!");
      pwd_try++;
    }
  }
  function end_ctrl(_0x1338df) {
    if (_$("div_note") != undefined && _$('div_note') != null) {
      removee(_$("div_note"));
      _$("div_note").setAttribute("onscroll", '');
    }
  }
  function interstitiel_fail(_0x2bb2b0) {
    retirer_bloc("lapub");
    notif("Problème avec la pub");
  }
  function interstitiel_success(_0x304e48) {}
  var lecture_active = 0;
  var timeur = 1;
  var lire = false;
  function lecture(_0x3d3192) {
    let _0xe7d92d = _$("timeur");
    if (!lecture_active) {
      lecture_active = 1;
      _0xe7d92d.style.transform = "translate(-2px,-" + _0x3d3192.offsetHeight + "px)";
      _0x3d3192.style.background = "var(--background2)";
      _0x3d3192.innerHTML = '||';
      let _0x9e86a3 = _$("pdf_chapitre");
      let _0x37f630 = 0;
      let _0x592982 = timeur + 2;
      lire = setInterval(() => {
        _0x37f630 = parseInt(_0x9e86a3.scrollHeight - _0x9e86a3.offsetHeight - 7);
        if (parseInt(_0x9e86a3.scrollTop) < _0x37f630) {
          _0x9e86a3.scrollTop = _0x9e86a3.scrollTop + _0x592982;
        } else {
          lecture(_$("lecture"));
        }
      }, 83);
    } else {
      lecture_active = 0;
      clearInterval(lire);
      lire = false;
      _0xe7d92d.style.transform = "translate(-2px,0px)";
      _0x3d3192.innerHTML = '&#9654;';
      _0x3d3192.style.background = "#BD0052";
    }
  }
  function changer_timeur(_0x12effe) {
    clearInterval(lire);
    let _0x54315e = parseInt(_0x12effe.innerHTML);
    let _0x18ea69 = _$('lecture');
    let _0x6e3b45;
    switch (_0x54315e) {
      case 1:
        _0x6e3b45 = 2;
        break;
      case 2:
        _0x6e3b45 = 3;
        break;
      case 3:
        _0x6e3b45 = 4;
        break;
      case 4:
        _0x6e3b45 = 1;
        break;
    }
    timeur = _0x6e3b45;
    lecture(_0x18ea69);
    lecture(_0x18ea69);
    _0x12effe.innerHTML = _0x6e3b45;
  }
  var rotated = 0;
  function rotate_screen(_0x15f5da) {
    if (rotated == 0) {
      rotated = 1;
      _$("pdf_chapitre").style.transformOrigin = "unset";
      _0x15f5da.style.transform = "rotate(-90deg)";
      _$("pdf_chapitre").style.paddingBottom = window.innerWidth * 1.25 + 'px';
      _$("pdf_chapitre").style.transform = "translate(-" + window.innerWidth + "px,0px) rotate(90deg) scale(" + window.innerHeight / window.innerWidth + ')';
    } else {
      rotated = 0;
      _$("pdf_chapitre").style.transformOrigin = "unset";
      _0x15f5da.style.transform = "rotate(0deg)";
      _$("pdf_chapitre").style.padding = "0px";
      _$("pdf_chapitre").style.transform = "rotate(0deg) scale(1)";
    }
  }
  function hasard() {
    let _0x101db9 = _$("liste_comics").getElementsByTagName("div");
    let _0x134f61 = _0x101db9.length;
    let _0x23430f = Math.round(Math.random() * (_0x134f61 - 1));
    let _0x539a3e = _0x101db9[_0x23430f].offsetLeft - 10;
    _0x101db9[_0x23430f].click();
    _$("liste_comics").scrollLeft = _0x539a3e;
    up_phes(9);
  }
  var resolution = 2;
  function changer_quali(_0x5a82ff, _0xe0b8b) {
    resolution = parseInt(_0x5a82ff);
    if (resolution == 1) {
      resolution = 1.25;
      localStorage.resolution = 1.25;
    } else {
      localStorage.resolution = resolution;
    }
    notif("Au prochain chapitre lu");
  }
  function set_res(_0x4cabc7) {
    if (localStorage.resolution) {
      _$("quali").value = parseInt(localStorage.resolution);
      resolution = parseInt(localStorage.resolution);
    }
  }
  set_res();
  function interstitiel_events(_0x2ece8d) {
    if (_0x2ece8d === "AdLoaded") {
      cordova.plugins.codeplayfacebookads.showInterstitialAds('', interstitiel_success, interstitiel_fail);
    } else {
      if (_0x2ece8d === "AdClosed") {
        retirer_bloc("lapub");
        notif(relance[Math.round(Math.random() * (relance.length - 1))]);
      } else {
        if (_0x2ece8d === "AdDisplayed") {
          console.log("AdDisplayed");
        } else {
          if (_0x2ece8d === "AdClicked") {
            console.log("AdClicked");
          } else {
            if (_0x2ece8d === 'AdLogged') {
              console.log('AdLogged');
            }
          }
        }
      }
    }
  }
  var relance = ["C'est reparti!", "On y va!", "Let's Go!", "Allez on repart!", "Continuons!", "Ça y est!"];
  var _PDF_DOC;
  var _CURRENT_PAGE;
  var _TOTAL_PAGES;
  var _CANVAS;
  var statuts = 1;
  function filtre_statut(_0x5c6e60) {
    switch (statuts) {
      case 1:
        show_all_comics(4, ["Terminé"]);
        _0x5c6e60.style.backgroundImage = "url(img/termine.png)";
        statuts = 2;
        break;
      case 2:
        show_all_comics(4, ["En cours"]);
        _0x5c6e60.style.backgroundImage = "url(img/en_cours.png)";
        statuts = 3;
        break;
      case 3:
        show_all_comics(4, ['']);
        _0x5c6e60.style.backgroundImage = "url(img/tout.png)";
        statuts = 1;
        break;
    }
  }
  var sur = 1;
  function supprimer(_0x2d3d56, _0x444555) {
    switch (sur) {
      case 1:
        _0x2d3d56.style.opacity = 0.6;
        sur = 2;
        break;
      case 2:
        _0x2d3d56.style.opacity = 1;
        sur = 3;
        break;
      case 3:
        down_infos_div(_0x2d3d56.parentNode.parentNode, 8);
        del_comic(_0x444555);
        sur = 1;
        _0x2d3d56.style.opacity = 0.2;
        break;
    }
  }
  function reset_suppr(_0x744b04) {
    _0x744b04.style.opacity = 0.2;
    sur = 1;
  }
  function chercher(_0x111f93) {
    let _0x5df04c = _0x111f93.previousElementSibling.value.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    show_all_comics(2, [_0x5df04c, _0x5df04c, _0x5df04c]);
    if (cat_showed == 1) {
      show_cat(_$("show_cat_btn"));
      option_actuelle = 0;
    }
  }
  function historique() {
    if (histo) {
      _$("derniers_lus").style.transform = "translate(-110%, 0%)";
      histo = 0;
    } else {
      show_lus(localStorage.lus.split(','));
      _$("derniers_lus").style.transform = "translate(0%, 0%)";
      histo = 1;
    }
  }
  function afficher_pages(_0x12fefd, _0x40ed85, _0xafe0b) {
    if (_0xafe0b < _0x12fefd) {
      let _0x56abe7 = document.createElement("canvas");
      _0x56abe7.setAttribute('id', "canvasid" + (_0xafe0b + 1));
      _$(_0x40ed85).appendChild(_0x56abe7);
      showPage("canvasid" + (_0xafe0b + 1), _0xafe0b + 1).then(() => {
        afficher_pages(_0x12fefd, _0x40ed85, _0xafe0b + 1);
      });
    } else {
      bg_image(pdf_chapitre, "none");
    }
  }
  function set_bar_color(_0x2fb1b8) {}
  function start_upload() {
    _$("inputfile").click();
  }
  function mopubsuccess() {
    alert("mopub ok");
  }
  function mopubfail() {
    alert("mopub pas ok");
  }
  async function start_app() {
    show_lus(localStorage.lus.split(','));
    var _0x1470b4 = _$("splashscreen");
    if (parseInt(localStorage.establodo) == 1) {
      lock();
    }
    _0x1470b4.style.animation = "fade 1s forwards";
    setTimeout(function () {}, 500);
    setTimeout(function () {
      _0x1470b4.style.zIndex = -1;
    }, 1100);
    setTimeout(function () {
      couche_nav++;
      show_all_comics(1, []);
    }, 900);
    setTimeout(function () {
      _0x1470b4.innerHTML = '';
    }, 1200);
  }
  var lecteur_afficher = 0;
  var truc_en_cours = 0;
  var loadingTask;
  function nombre_de_pages(_0x5687ce) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "js/build/pdf.worker.js";
    const _0x42d559 = {
      data: _0x5687ce
    };
    loadingTask = pdfjsLib.getDocument(_0x42d559);
    loadingTask.promise.then(function (_0x4f764b) {
      pdfDoc = _0x4f764b;
      let _0x4d05e1 = pdfDoc.numPages;
      showPage(pdfDoc, _0x4d05e1, 0).then(() => {
        bg_image(pdf_chapitre, 'none');
      });
    }, function (_0x4b317d) {
      notif("Pas pu lire");
    });
  }
  function checkVisible(_0x492857) {
    var _0x3d3009 = _0x492857.getBoundingClientRect();
    var _0x52fc1b = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(_0x3d3009.bottom < 0 || _0x3d3009.top - _0x52fc1b >= 0);
  }
  var truc_fini = 2;
  var renderTask;
  async function showPage(_0x1911e9, _0x18ef23, _0x4492ac) {
    if (truc_en_cours == 1 || _0x4492ac >= _0x18ef23) {
      loadingTask.destroy();
      loadingTask = null;
      truc_en_cours = 0;
      truc_fini = 1;
      down_afficher(encodeURIComponent(cache_comm));
      return;
    } else {
      truc_fini = 0;
      var _0x3c8a28 = _0x4492ac + 1;
      let _0x5a50bb = document.createElement("div");
      _0x5a50bb.setAttribute('id', "the-svg" + _0x3c8a28);
      _0x1911e9.getPage(_0x3c8a28).then(_0x11fbd4 => {
        const _0xbd58b = {
          'scale': 0x1
        };
        let _0x236ac8 = parseFloat(localStorage.width) / _0x11fbd4.getViewport(_0xbd58b).width;
        const _0x3dca97 = {
          scale: _0x236ac8
        };
        const _0x3626b3 = {
          scale: _0x236ac8
        };
        let _0x57aa48 = _0x11fbd4.getViewport(_0x3dca97).height * _0x11fbd4.getViewport(_0x3626b3).width;
        const _0x2939c5 = {
          "scale": _0x236ac8
        };
        if (resolution * _0x11fbd4.getViewport(_0x2939c5).height > 32500 || resolution * _0x57aa48 >= 196000000) {
          const _0xafa565 = {
            scale: _0x236ac8
          };
          var _0x256155 = _0x11fbd4.getViewport(_0xafa565);
          _0x5a50bb.style.width = _0x256155.width + 'px';
          _0x5a50bb.style.height = _0x256155.height + 'px';
          _0x11fbd4.getOperatorList().then(function (_0x392593) {
            var _0xb7a951 = new pdfjsLib.SVGGraphics(_0x11fbd4.commonObjs, _0x11fbd4.objs);
            return _0xb7a951.getSVG(_0x392593, _0x256155);
          }).then(function (_0x239e42) {
            _0x5a50bb.appendChild(_0x239e42);
            _$("pdf_chapitre").appendChild(_0x5a50bb);
            showPage(_0x1911e9, _0x18ef23, _0x4492ac + 1);
          });
        } else {
          let _0x2b96e9 = document.createElement("canvas");
          let _0x49bb33 = "canvasid" + _0x3c8a28;
          _0x2b96e9.setAttribute('id', _0x49bb33);
          _$("pdf_chapitre").appendChild(_0x2b96e9);
          let _0x4d4ddd = resolution;
          const _0x320b2a = {
            scale: 0x1
          };
          var _0x5bf593 = _0x4d4ddd * (parseFloat(localStorage.width) / _0x11fbd4.getViewport(_0x320b2a).width);
          const _0x196424 = {
            scale: _0x5bf593
          };
          var _0x256155 = _0x11fbd4.getViewport(_0x196424);
          var _0x1df31a = document.getElementById(_0x49bb33);
          const _0xaa9e57 = {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            failIfMajorPerformanceCaveat: false
          };
          var _0x255014 = _0x1df31a.getContext('2d', _0xaa9e57);
          _0x1df31a.height = _0x256155.height;
          _0x1df31a.width = _0x256155.width;
          const _0x245fc3 = {
            canvasContext: _0x255014,
            viewport: _0x256155
          };
          renderTask = _0x11fbd4.render(_0x245fc3);
          renderTask.promise.then(function () {
            _$("pdf_chapitre").appendChild(_0x1df31a);
            showPage(_0x1911e9, _0x18ef23, _0x4492ac + 1);
          });
        }
      });
    }
  }
  async function showPagess(_0x56bb4f) {
    for (var _0x56345f = 0; _0x56345f < _0x56bb4f.numPages; _0x56345f++) {
      let _0x1d76b0 = document.createElement("canvas");
      let _0x4c98cb = "canvasid" + (_0x56345f + 1);
      _0x1d76b0.setAttribute('id', _0x4c98cb);
      _$("pdf_chapitre").appendChild(_0x1d76b0);
      var _0x286e0d = _0x56345f + 1;
      _0x56bb4f.getPage(_0x286e0d).then(function (_0x31c45c) {
        const _0x1a608a = {
          scale: 0x1
        };
        var _0x528ca1 = resolution * (parseFloat(localStorage.width) / _0x31c45c.getViewport(_0x1a608a).width);
        const _0x3e1a91 = {
          'scale': _0x528ca1
        };
        var _0x342019 = _0x31c45c.getViewport(_0x3e1a91);
        var _0xdd9b78 = document.getElementById(_0x4c98cb);
        var _0x40c3c3 = _0xdd9b78.getContext('2d');
        _0xdd9b78.height = _0x342019.height;
        _0xdd9b78.width = _0x342019.width;
        const _0x1618b5 = {
          canvasContext: _0x40c3c3
        };
        _0x1618b5.viewport = _0x342019;
        var _0x4366b5 = _0x31c45c.render(_0x1618b5);
        _0x4366b5.promise.then(function () {});
      });
    }
  }
  var db = openDatabase("comics", "1.0", "comics", 2097152);
  db.transaction(function (_0x41cdee) {
    _0x41cdee.executeSql("CREATE TABLE IF NOT EXISTS comic(id INTEGER PRIMARY KEY AUTOINCREMENT, titre VARCHAR, synopsis VARCHAR,auteur VARCHAR,dessinateur VARCHAR,statut VARCHAR,langue VARCHAR,traducteur VARCHAR,miniature VARCHAR)");
    _0x41cdee.executeSql("CREATE TABLE IF NOT EXISTS chapitres(id INTEGER PRIMARY KEY AUTOINCREMENT, chapitre VARCHAR, lien VARCHAR, comic INTEGER, lu INTEGER DEFAULT 0, pris INTEGER DEFAULT 0)");
    _0x41cdee.executeSql("CREATE TABLE IF NOT EXISTS categorie(id INTEGER PRIMARY KEY AUTOINCREMENT, emoji VARCHAR, nom VARCHAR, comics VARCHAR)");
    _0x41cdee.executeSql("ALTER TABLE chapitres ADD COLUMN pris INTEGER DEFAULT 0", [], () => {}, _0x3ad3ac => {});
    _0x41cdee.executeSql("ALTER TABLE chapitres ADD COLUMN note VARCHAR", [], () => {}, _0x143f90 => {});
    _0x41cdee.executeSql("ALTER TABLE comic ADD COLUMN total INTEGER DEFAULT 0", [], () => {}, _0x3135ed => {});
    _0x41cdee.executeSql("ALTER TABLE comic ADD COLUMN lus INTEGER DEFAULT 0", [], () => {}, _0x220a6 => {});
    _0x41cdee.executeSql("ALTER TABLE chapitres ADD COLUMN download VARCHAR", [], () => {}, _0x194902 => {});
    _0x41cdee.executeSql("ALTER TABLE comic ADD COLUMN categorie VARCHAR DEFAULT '1'", [], () => {}, _0x3370b4 => {});
    if (!localStorage.importer) {
      set_comic("Webtoon Tuto%%%-%%%Je suis un Webtoon qui sert de tuto. Ma vie est bien triste puisque personne ne m'aime à part mon créateur. Dès que les gens me lisent, ils m'oublient. C'est triste. Ce monde connaîtra donc la souffrance... ma souffrance!%%%-%%%Le créateur%%%-%%%Encore lui%%%-%%%Terminé%%%-%%%FR%%%-%%%Personne%%%-%%%img/splash_back.png\nL'intro%%%-%%%tuto/intro.pdf\nLe début%%%-%%%tuto/debut.pdf\nAprès le début%%%-%%%tuto/fin.pdf\nBonus!%%%-%%%tuto/bonus.pdf", '%%%-%%%');
      localStorage.importer = '0';
    }
    if (!localStorage.lus) {
      localStorage.lus = '';
    }
    if (!localStorage.categorie) {
      localStorage.categorie = '';
      _0x41cdee.executeSql("INSERT INTO categorie(id,emoji,nom,comics) VALUES(1,'📚','Tout','1')", [], () => {}, _0x41b5b8 => {});
    }
  });
  function _0x2476() {
    const _0x24e993 = ['DwXmtvu', 'zhzRweO', 'q0zoCMS', 'rvfTDNG', 't05uC0G', 'Ew1IA0q', 'BMXVy2TLzcC+pa', 'BwzNC0e', 'zw5JCNLWDa', 'te95zwG', 'rxrtq3O', 'B25MB2n1C291Da', 'uLLtALm', 'u0vmrunuihrPDa', 'CL9PBwfNzsH0Aa', 'BM9Tx2nHDhq', 'A01zBMW', 'C3rry3m', 'tKXsDxi', 'uuzkDfq', 'vxrztKG', 'ufPQB2u', 'zgvWDgG', 'z3nrCKy', 't2TXsxy', 'CL9UB3rLjZ5djW', 'sMuGzg9PCYbYzq', 'uxrdA1e', 'ufzmsgO', 't1v4sKe', 'B0vJrKu', 'r3LXzLa', 'rNDhzw4', 'z0n4C28', 'ze9gDLG', 'uKrhA2G', 'EvL3ywu', 'CNzlshK', 'rgnbr2W', 'DMfSDwu9jW', 't0DqywC', 'sLL0ufe', 'BK1rve4', 'ue90tKG', 'ig1VBwvUDa', 'rgLMzSoPCMvUDa', 'BhvLpsCXnYC+ta', 'tweGChjVChjLia', 'ywfdEg4', 'rfDmzuy', 'quXksue', 'rKLuuxi', 'sevsrsbPzd0/ia', 'u1zbqLe', 'y2LfAvO', 'vLjJrve', 'DfbJqMi', 'A1DmtvO', 'DhjLkcC', 'y1DntKy', 'z1bTAw0', 'ywFdQsa1igzPy2G', 'AuzbuxC', 'tNzVzuS', 'C0r5wei', 'B2fmC3q', 'EhrfCwu', 'zgfYA19ZAgfYzq', 'q1P2zgS', 'rKv1thq', 'Durbv1q', 'Be1zqva', 'sKnsuLu', 'W6KGmZaGBgLRzxm', 'ideWmdaGCgLJzq', 'sKj0EKG', 'veTqBNa', 'y01fzMO', 'BMjYzv9KAxnSAq', 'tgvlrwm', 'EM90wfy', 'W6aGDxrPBgLZW6K', 'Cwn6vwC', 'B3vnEuK', 'vK55t0K', 'Bhvxsue', 'ywDLCL9WAxbPka', 'D3znEfu', 'u0fgBwK', 'Bw1LBNq9', 'B3nbsve', 'CLrACfC', 'zMvsDuq', 's1jfB2i', 'svzuvgS', 'zMjjsgO', 'wwX0weG', 'tfL3Ewu', 'v0HfuKuGBgLLBG', 'uxvLigrHBgXLia', 'Cg9cEvG', 'y0zTr1G', 'zg93BL90CM9WAa', 'zgfYA19KAxzFyW', 'seLkq3y', 'yxLTtwK', 'zw5JzsK', 'Dhv0ieXjs0uGjW', 'uhjqB2O', 'zKHeq0C', 'smoPigfYCSoQDguH', 'yvHry3u', 'DwXeDum', 'CLH5Bfe', 'qvLxAe8', 'yMTvsNG', 'l2i+pgK+mdWVAq', 'ywnLAg9SzgvYpq', 'r09Tt1G', 'u1j2AgK', 'Eer6ueu', 'DwjIjsuT', 'z3rZ', 'D25MANm', 'AeTLse0', 'qNvsyu4', 'A3LfrM4', 'zePst3e', 'u3LVtve', 'CLfpu2q', 'vuzHvfu', 'DMfSDwu9jZiNpG', 'vfboqLm', 'BNvTugfNzxm', 'DhqGrLjptsbJAa', 'zMfKzsaXCYbMBW', 'yMHMtNq', 'z2v0qxr0CMLIDq', 'Dgv0zv9MzwvK', 'ELrkyui', 'y2fUDMfZ', 'AvvbDwK', 'BLrnAg4', 'r2PnDgq', 'BMvMufm', 'AfDlvwu', 'wK9JzMK', 't2SGBM9UignYEq', 'ywrvEMW', 'y2XPy2S9j3jLDa', 'ENnqs0G', 'C2nYB2XStgvMDa', 'twfdtfu', 'vKnYBMu', 'yMLtDgO', 'A05Puxu', 'A0nJtKi', 'tg5rvgy', 'D2LoCLq', 'BNnJzw5KW6KH', 'sgnstw8', 'r1HPrNm', 'u1LhDKG', 'B29UCY4', 'psDIDg4XjZ5pAW', 'rufSC0K', 'C09eAwm', 'y2jHBNq', 'zxnZzxvY', 'rLDQC1m', 'wezdDgm', 'qKDZv1G', 'B3DPEK4', 'tMvbB1C', 'yMfJA190CM9WAa', 'yxfry2q', 'Cfrft1O', 'D2TZDge', 'tMHgtfq', 'Awr1ywS', 'ChnjzxO', 'z0Lotxa', 'At54EhGGChrZpa', 'mhWXFdv8oa', 'qM5cy2m', 'Ahr0Chm6lY9WAq', 'BgfPCMuGoG', 'wMTwwK8', 'EhnYuuO', 'u0rUExm', 'AwmGu0vuigX1CW', 'uxHurwC', 'AgfWAxrYzxmGvW', 'zsGP', 'BhfIzei', 'qwXSzxOGB24GCG', 'rgrtCfq', 'DcCSjZeNkq', 'BNfRweO', 'yw5ZigXLidXIia', 'rwvfv2q', 'qNriuxy', 'v2v0uwu', 'zt0NmJaNpK1LAq', 'rvjfigLKpt8Gta', 'EfnoCuS', 'Bgv6iq', 'zsbPBwfNzsaOza', 'vvDcue4', 'vcDLBIbHihbHia', 'Dg9ju09tDhjPBG', 'BM90zq', 'ChDKx2LUChv0', 'rer6Cfq', 'CgfUig9Uy2XPyW', 'AfrkCe0', 'tfruyu4', 'CNHTBwu', 'wwDpqNi', 'CMvZB2X1DgLVBG', 'B1LPrfm', 'BunwsKS', 'ywDbvwS', 'lI4/', 'BMzksvq', 'BMnLktWVC3bHBG', 'ze1Quee', 'sKPcrxu', 'B2rL', 'BLzfzxG', 'C2LSDMvY', 'yM9frvK', 'BgLLBG', 'BfvIqMO', 've90vhy', 'rgnOr2m', 'rmoPDMLHBMnL', 't1qGsu4O', 'DMfSAwrLCL9UBW', 'tfvfuYG/ld8SpW', 'DmoPz29YAwu8l2G', 'yxbWzwfYic41CW', 'rgvZDgLUigvUia', 've1mq3K', 'EwzyCwW', 'De5rEMu', 'lNrVDgfSiefora', 'j3rLEhrFBM90zq', 'v2LjAMC', 'C1DyAfq', 'ieeP', 'ldaSpYK', 'ztWVyNv0Dg9UpG', 'lhrVDgfSksbwqq', 'Aw9UjZ4GpgLUCa', 'CfvXs2K', 'B2Hqv1a', 'Bg9HzefZEw5J', 'tfzQu0O', 's3jfre4', 'wKPLA0y', 'DhjVCgH5x2XPCW', 'uwHuy24', 'C0TlB1m', 'EfLNAfa', 'zw1L', 'BgziA0i', 'CI4UlG', 'r3fHugS', 'ihrVDxqUifzHCW', 'v1LMvxy', 'tuTIrwq', 'sw5ktM0', 'y3bMD3O', 'v25jtwO', 'BgLJAZ0NCgfYDa', 'zMvYBwvY', 'zM9drfi', 'D2LKDgG', 'j2vTB192B3rLka', 'A01qAg8', 'r1zQu1O', 'zM5AvwO', 'DgfPBJSNpJWVCW', 'vw1hq0e', 'wwHesvm', 'CgLWAq', 'B3vMzNjHBMnLiq', 'BMXeBLm', 'D0XeCLe', 'r0XItue', 'zdOG', 'DxjSka', 'BvnMDvq', 's2jwtwm', 'ruLfAvq', 'svvkwLC', 'tu4GBM90zsbwqq', 'qNjVBNPL', 'CKnhuMW', 'uKDQvMW', 'ru5ulcbLBw9QAq', 't25cCKO', 'uLH2zKG', 'uxvuzLO', 'B1PqD0S', 'Ee1ZB3m', 't0z6yxe', 'yxbPDhjL', 'EM9bAKi', 'qwzMzNe', 'yxr1Dcbwqvjdsa', 'p3jLChm9', 't3DqCNq', 'B0nnwhm', 'yxHVDLO', 'su5uruDfuIbquG', 'CJ0NvgL0CMuNia', 'zgf0yq', 'renryM8', 'igP1C3rLigfWCG', 'ELL5vwi', 'mhW0Fdn8nxWXFa', 'yMTRz0q', 'CMvUzgvY', 'W6KGmJuWigXPA2u', 'BKnPv1u', 'C3bSyxnOC2nYzq', 'sfrft3i', 'qNnkDfa', 'C3vOCNq', 'ze9eCuy', 'D3DXBxK', 'jYKIpIa8B3b0Aq', 'AvD0BvG', 'AvrYrxC', 'thnKqxa', 'zgDgz1O', 'BwLJlNrVDgfSia', 'y3LXu0C', 'q252reG', 'Dg91y2HLCW', 'qM9LvK4', 'y0D0EgC', 'zxnZihzHBhvLpq', 'ugHLD1K', 'y09Ly3u', 'z29btMy', 'ALD4Eeq', 'Avfwwgy', 'C3bHBJ4', 'zfPWwem', 'CunAte4', 'r2HJA2O', 'ugfZig1VAsbWyq', 'ELjxrvO', 'yMzAEwq', 'svvOse4', 'vKfQvLK', 'C2nYrgS', 'sgvkr2e', 'W6KGmtaWmcbSAwS', 'ywFdQsa5mcbMAwm', 'EujvB3e', 'svbcEvm', 'ieXjtuLuide', 'jYbJBgfZCZ0NyG', 'rKzsue0', 't24GzgL0ihf1BW', 'u0vmrunuignOyq', 'EKH5tgq', 'p3jHBMTLzd0XjG', 'CNrnyuK', 'DwvYka', 'BgP5Efy', 'DvrhBLa', 'rxbhDKG', 'zvPAr00', 'Au1dEwO', 'y2f0x2j1DhrVBG', 'BgrLCJ0Nvg9Uia', 'yKn5vei', 'CNqGBw9UignYW6K', 'ANDUtLe', 'vuTNrwi', 'ihzLCNmGDw5Lia', 'ywzMAwnOzxjFyW', 'ywFdQsb1BIbMAwm', 'thL0uhm', 'AK1NBei', 'DmoPiq', 'Bw9QAsaRifrPDa', 'tw9eW6LsyvrLvxi', 'W6LNB3jPzq', 't3bjDuG', 'B3b0Aw9UCW', 'ltuWjsWG', 'CujnshG', 'yLjbzgq', 'ucD0AxqGChjVyG', 'qMHrqKG', 'zgfYA19WBhvZ', 'q1HNsLC', 'y0zswLi', 'CwPHtxC', 'mcuSidaLkq', 'CNrIu1C', 'vwzNtfK', 'BLr1v3e', 'u1b4thO', 'zufyy3K', 'rhngyuO', 'q2jeB2K', 'z0Xbvu0', 'C29dy2u', 'uhjLBwNdQhjLig4', 'Cw1wt2W', 'ugrcshu', 'kdiPlNbUzW', 'qYDLC3qGBguGyG', 'BgTKEhi', 'zureveu', 'pc9IpIdWN5gn', 'y2XPy2S', 'ltuWjsWGmtaWjq', 'C29YDa', 'ignVBwLJpt8', 'vMrJz0C', 'zgvZC2LUyxrLDq', 'vvjm', 'zLjzEuy', 'DhvYzsbHDxrV', 'r1PMBfG', 'nhWWFdj8m3WX', 'BMPzrM8', 'whL4ALi', 'AgjMrgG', 'wejHCeO', 'CM94rha', 'Aw1Hz2uGkgrLia', 'ugfZigrLihbLCG', 'zejKAMK', 'vhngyMS', 'Df9ZAgfYzwqNpG', 'ufbuEeC', 'vKDmrum', 'DxrLDxiGteLlrq', 'zt0NCMfKAw8Nia', 'tgX5EuC', 'rvL6r0q', 'Bejwruq', 'C3fRBK8', 'zvrrsfm', 'zxnZyxNdQsbSzxm', 't0DyuMi', 'AM1oBxK', 'ywX1zt0N', 'AwzLrNq', 'psCXncC+vmoQDgu', 'tuDHtuO', 'sMDeAgy', 'y3Hbueq', 'vhuGy29UDgLUDq', 'tLrfr0vsierfrG', 'uhjVyMZdQg1Lige', 'yNLSAvG', 'mxW0Fdb8m3WY', 'ugfYDgfNW6KH', 'qungr0e', 'Aez5uLu', 'BgvUz3rOpsC2ma', 'q1v3AvG', 'we1QB2G', 'lteXmcuSidaLkq', 'tM90W6K', 'yurosuq', 'wfnXv3m', 'zxH0jYbPzd0NCa', 'CMXjA3G', 'vM9YywnPDmoPicG', 'uwvVwei', 'tffACg8', 'ChjPCW', 'vKLyrNu', 'zgfYA192B3rLCW', 'W69Zpc9VChrPB24', 'BMrLigqNyxjYW6O', 'EMjluMW', 'BMnMqKO', 'jsaXmdaLkq', 'rgL2Aw5LicGYkq', 'qxjJAgL2Axn0zq', 'yw5Zie5VDgu8lW', 'z1z5Bg8', 'qKz1Awy', 'wwDgr1q', 'uvjdyMe', 'vgDAAey', 'ywXgAwXLu3LZDa', 'CMnVy1O', 'wMHzt2K', 'y2TLzca', 'Cu5Zt0C', 'y1DZzMu', 'q1jfqvrfifrbqG', 'zfvWtuy', 'q2f0W6LNB3jPzsa', 'ChbuDu8', 'BxbKD3G', 'qMLLBMzHAxrLDq', 'z3zVwve', 'CK94qLK', 'jtWVAt4', 'EeH2v0C', 'lhbYAxmSzg93BG', 'igrLihbHC3nLia', 'twLSBgv1CIbJBW', 'DM5WAhO', 'y3jLyxrLrwXLBq', 'Dg90ywXFDhjVCa', 'Axj1vhu', 'u1DPtNa', 'W6KGmJuGzgLZBgK', 'DhjLCW', 'DxrL', 'zujnDxq', 'tK5kCue', 'zxHPDa', 'sfHWq3e', 'CwDKueS', 'uxvMCwC', 'y2HHCgL0CMu', 'A3LhEgG', 'vxPrzLK', 'thnqCeq', 'BxHMBvu', 'yxbPDhjLCW', 'CMLLie9srevsia', 'Aw5UzxjizwLNAa', 'q2fMuwq', 'qwrdBg9Zzwq', 'uNLPqKi', 'D1jZBfy', 'rmoPASoGihzVDmoP', 'D3nRue4', 'zgL2x25VDgu', 'z1zfAeO', 'wMT1sKm', 'q29Ou2y', 'zgjfrwO', 'vuv0Bfe', 'zMfQtvy', 'A2nkBeO', 'uwHmuxq', 'zxvMl3vUig1LyW', 'Dc5Tzs9WAxbPDW', 'zY90CM9WAgvLxW', 'W6aGz2f1y2HLiha', 'BM55zxq', 'zhbKsNm', 'u0Xyte0', 'whnOtKu', 'z2v0q29UDgv4Da', 'wgrnv1u', 'BMXdBeK', 'zeT6EuK', 'C2XHvgO', 'CYKGvKfmvuvtka', 'tMHgq0K', 'yu5ewfy', 'ELvMweS', 'AwuGzxn0igjPzq', 'Dg9FyMXHy2SGmW', 'u0vmrunuigLKia', 'v0HfuKuGkhn0yq', 'ld8SpYW/ld8SpW', 'zw5rvxe', 'EezWD0u', 'zK1uEfq', 'sw1nEMW', 'BMnSAwnRpsDJAa', 'j2vTB2PPx2nHDa', 'y2f0x3vWic44CW', 'rgvduee', 'venMvuW', 'ldmPjYbPzd0NCW', 'ywrvBML0swq', 'vhjVDsbcBgfUyW', 'ksC+pgi+8j+KQtWVyG', 'DLHJt3K', 'CxPgzgG', 'msWN8j+tMICSj1rVDq', 'sxrttgW', 'y1zXCfi', 'jZ48At4', 'CgfYBgvY', 'kdaPjYbJBgfZCW', 'DNDfrLe', 'igrLignOyxjNzq', 'rvHju1rtignOyq', 'BM9T', 'rMX6zfu', 'DNbAvvO', 'wfjrzwC', 'r3rjCwO', 'yuLPC1O', 'sLzpwLm', 'rMr5uKS', 'twrwC28', 'A3nQvKe', 's3PKEuq', 't2X4sKO', 'BuXwBMO', 'CMLNAhrFC3DPCa', 'zLDss2i', 'BwPeAuC', 'ierfrKfvtfqGma', 'rNPcsgG', 'tu4GChjPCYbjtG', 's3jTu28', 'DLbewfe', 'mtG3nda4tMfIB1zr', 'BMTuuwG', 'sK5jDNa', 'r0zkt3a', 'yNzOCgq', 'CgL2EMy', 'zxnZ', 'ufPNu2q', 'D01WA2G', 'y3nFzg93BIaUnq', 'CxfStM0', 'msWGiG', 'tLbMse8', 'zKX4BuK', 'twTsA0i', 'pgrPDIbPzd0NyW', 'DgjeBhK', 'wMvYwvm', 'wezlA3m', 'uw5wA0W', 'B25Zzq', 'x3zVDguODgHPCW', 'DhjVCgHLzv90Eq', 'AMHfBfy', 'EgPmr04', 'wg5ewhm', 'z21sC2W', 'CM93CW', 'svjvr1e', 'ywFdQsa1mdaGzMK', 'uwXdBgu', 'rLnoCwC', 'DNzOuhK', 'B0X5v3e', 'sMfjzgy', 'zMPAtwC', 'u0jRCNO', 'ALjfwfa', 'ywrKsgfUzgXLCG', 'A0Pnv0e', 'Aw5JBhvKzxm', 'zwDVCMLLlgLKia', 'EKrcvey', 'ignOyxbPDhjLCW', 'C2HYCMm', 'CMvKDwLYzv9KAq', 'BfDry1q', 'r1Lorfu', 'y29TBwvUDmoPid8', 'Ae10Bfe', 'BuPhC1a', 'AwqGit0GpYbbtG', 'DMP3zLe', 'B3jLpW', 'EKv1zee', 'sfzRqLO', 'thffq1y', 'B09xCg8', 'AvDWD1K', 'CIXZDgf0DxqSBa', 'AxzFy2f0zwDVCG', 'y2r2zMLSztOVlW', 'BMjYzv9WCMvTAq', 'CMrZ', 'uwH3sMS', 'A1Hyt24', 'Bcb5j2vUigeG8j+KQW', 'rNvLs3G', 'zgL2x3rVCf9KBW', 'zhjHz29UicGYkq', 't1DPvLu', 'r3jHBMqGzmoPDM8', 'q3LYqLe', 'pIa8C3bHBJ48CW', 'C3vUueK', 'z0XQBui', 'B0fvC3e', 'AwvYCW', 'mhWXFdn8mNW1Fa', 'yMLOu0e', 'AwXkDwK', 'r1bSuwu', 'zg93BL9JB21Tzq', 'B3bLBNzVDguOjW', 'Axnuzxn0Aw5N', 'vMLPvwO', 'zxPIshu', 'DwDO', 'yxbWCMLZlcbOzq', 'vwDAC0m', 'yNzWqwC', 'reTcrMG', 'CNn0AxrPywWUza', 'AgLLCNm', 't1nQtxe', 'zgfYA19JB21Tzq', 'C3vWChjPBwvYka', 'rvvwC08', 'BgrhvhG', 'yNPHBeO', 'BLb2Exy', 'D1PXr0C', 'rs1mrsbfvcbhqq', 'ywHOqMC', 'tvfvvwK', 'CgfZC19KAxy', 'A2vK', 'v0HfuKuGy29TAq', 'vwTrvvq', 'y2HLy2TLza', 'BLf2qwO', 'uhjVChjPW6L0ywK', 'v1z6twC', 'y2XcBMi', 'suLcv0W', 'v2rPvfC', 'vejMuMK', 's1vrAhK', 'D1HkEgC', 'yxHqDeq', 'Dg9UigLKpsDHza', 'rMHiC2i', 'yu1jBg8', 'whHsDuO', 'Ehf6DM4', 'CvntCg0', 'Ahfrvee', 'qKvYAM4', 'txrksLK', 'BezuuM8', 'Dwu9jZeXjZ5uBW', 'DfzRANu', 's3r5vg0', 'Ew1QCLe', 'AZ0NDM90zxiODa', 'thLtCvu', 'zfDmCei', 'rMXtsMi', 'AvrSy0G', 'BuXYtxO', 'AK51yKe', 'zML0lwnVBNrLBG', 'D2HPDgu', 'B0rNwLy', 'yMXVy191CgrHDa', 'EMzQD0O', 'zgruzLy', 'werREui', 'zxHesKW', 'Aw5KzxHpzG', 'zxnyB2W', 'DCoPidqWig5VDgu', 'zwLzyKK', 'wvf4rhK', 'CMvWBgfJzq', 'wMvNtgS', 'qKzwCe4', 'wu1XsMW', 'qMnKAM0', 'v0XhDxC', 'tw1sEMi', 's29ituu', 'DgfPCMuNksWGjW', 'uufss0G', 'nZuPigDYyxLZyW', 'yM9ZALe', 'AKHlteK', 'whjPBKO', 'yu9yCwu', 'Aw1Nl3nWBgfZAa', 'y0jUyKi', 'igX1', 'whHPww0', 'yKzzrfy', 'DM9Pzse', 'rgL2Aw5PDmoPiem', 'Dw5SB2nRzwrF', 'y05yze8', 'q0XHsLC', 'zhjHwuy', 'DejhELi', 'nhWZFdj8mhWX', 'msaXic8GmtuLkq', 'uMnOwNe', 'B2vhtLC', 'txv0tfK', 'rM1hAM4', 'CSoPigXLihDLyNq', 'jYb8Fca/ihX8ia', 's2rpwxe', 'z3jHExnJywXLka', 'pgrPDIbPzd0Nza', 'DgvZig1LBwvZla', 'zgfYA19TB2rL', 'thPxDK0', 'BfnZzvO', 'ugjXyNe', 'zgvSy28', 'yKXsvuK', 'D29VzcaOmIKUCa', 'Aw5gBfi', 'veLnt3m', 'BM5LjsuLlsuLjq', 'zNLjzha', 't3fwAfa', 'A1Leqxy', 'sM9Puwe', 'Ahr0Chm6lY90zq', 'AeTnvK8', 'uKr3vwW', 'uuX5qMS', 'yMXVy19UB3rL', 'pgLUChv0ihr5Ca', 'svvmq2e', 'zMLSzxm', 'EwL3z2u', 'BhfLqu4', 'zw50ywLYzxm', 'svvSyNu', 'yxjJAgrLDMLSia', 'C3bKuKi', 't0vdzue', 'wLfdBLC', 'qxLyzg8', 'uLbMCMO', 'sMDTseW', 'CgrM', 'EhnJDvi', 's2H5Ae0', 'sIDHAsbKW6LQW6aG', 'wxnQC1G', 'rvzoruy', 'zsa/', 'CxzZvMK', 'zw1Vx3zVDguODa', 'quvJDgW', 'D2HLCMu', 'turLD2u', 'AhbewMm', 'vhuGyxmGChvIBa', 'q3fvs3e', 'rNjfEhu', 'qLLvsfC', 'zgLHBw9UzcaOmG', 'zt0NmtiNpK1LAq', 'twDfA2G', 'qK9iCgK', 'yuvbyNy', 'B2LUjZ4WifbPyW', 'uKvhCLG', 'smoPigZdOMnOzs1T', 'ANjWv1u', 'ufDey2K', 'BgvNCMfTlM9YzW', 'rNjSz2e', 'Dg9T', 'DxqGDhLWzt0NDa', 'u2vWAha', 't24Gzw5YzwDPCW', 'CujnrMS', 'B3vYigXHigXLyW', 'yM9KEq', 'q0T6tvG', 'yYKGvKfmvuvtka', 'vej4we0', 'B3rHBcbjtLrfrW', 'ueLfvKG', 'D3nuDMy', 'zgvNkq', 'AsbZzxj0igrLia', 'BhHzugm', 'mJuWigfQB3v0CW', 'u1jtyLG', 'vxvPq1i', 'zuHPtxa', 'wwzereO', 'rvr6ANi', 'Aw9Uigf2yw5JW6K', 'pJXIpVcFMii8l2i+pa', 'C3jJ', 'wu9QAfm', 'i0jemda1mIb1CG', 's3vJB0u', 'r05ovMi', 'zMLMrLa', 'BwLUAwf0DxjL', 'tvvoD0q', 'Bg9Hza', 'ideWCYbLyxnLia', 'DvrsAvy', 'CeL1EhO', 'v05evM8', 'zg5tqLC', 'zMfKzv9PBMzPBG', 'CwLzzfa', 'kcGOlISPkYKRkq', 'rviGrevgqvvmva', 'zez2ENm', 'termv2C', 'sgjTAe4', 'DMLLD3bVCNq', 'vuPKu1m', 'vxD5D2q', 'sMjdBu4', 'CezkuwO', 'zsHLBw9QAsXUBW', 'v1j1DeG', 'pt8GteLnsvqGmq', 'C05PCNu', 'sKv2zee', 'tNDfz2q', 'CMfYzxrL', 'y2vUDgvY', 'Dw1LCJ8', 'u29QyvK', 'ic4ZCYbMB3j3yq', 'CgLOqMW', 'BI9Wzgy', 'zw1VAMLFy2f0Da', 'zgvYpsCWjYbPza', 'D1fQEM0', 'B25PyY1NCMfKAq', 'Aw1N', 'swWGDguGzMf1Da', 'DgLrDK0', 'z2v0rMLSzq', 'wNzZrxC', 'u0vmrunuignVBq', 'tuLuide', 'DMfSAwrLCL9Syq', 'ww1NAuG', 'B0XLvLy', 'twfTq1O', 'AM1uyNe', 'v2P4Egq', 'zMjusxy', 'ALfhBMe', 'veD4Ewy', 't3zkwfC', 'jYCGv0HfuKuGyW', 'qwTdCg8', 'z2Xfrve', 'A0zTB1q', 'C0nHA3u', 'AxrLBq', 'uxzfveu', 'yw4+', 'BM90AgLUzYGP', 'y2LTB3a', 'r0vsifbssu1buG', 'zxLitLy', 'BwDjtfe', 'ignHDmoPz29YAwu', 'y09HvgS', 'tgXwr2q', 'BhuG8j+yIsbej2fJyW', 'CxPOthq', 'yYXSDsXWCMLZla', 'qwDnvNO', 'Aw5MB3nFD2vIDa', 'B3rLpc9OmZ48Aq', 'pc9IpJXPpKrLia', 'wu9YAMm', 'BNrHAxjLCW', 'A3LjA3i', 'Be5fA0q', 'yw9TBM0', 'runJvgq', 'x3DOAxrLlNbUzW', 'uMLICMLHBM5L', 'qxfRr0S', 's1Liu2S', 'tg1ju1G', 'EurkBhq', 'uhHQz1G', 'Bejlru8', 'Ae92vw0', 'BMr3uMy', 'BNbuA1i', 'jImWmZK7', 'qvDNrei', 'yuDyvuG', 'DNbjs2G', 'y2HPzxjZ', 'A0jyEMq', 'DCoPideWmdaGBM8', 'v3zACg8', 'swWGzMf1zhjHAq', 'vuPWu0e', 'CgXHy2vOB2XKzq', 'ze9ZsMe', 'CKXPC3q', 'BhP3Dgi', 'q2XHC3nLDxi', 'AvHwq04', 'Dxf0she', 'BID5igf1CMeGua', 'wMz3BeS', 'wNrKwhC', 'swf3uLi', 'wfbkz3K', 'W4DHihzHlI48l2i', 'vfjPtwy', 'wKPdue0', 'EKfNu2y', 'BwLJ', 'Ee9Oshe', 'zu5sDve', 'qvLqAwS', 'r0TZvva', 'rvPwCgu', 'CeDPChy', 'ruj1Dve', 'vM9jqKq', 'teXwCvK', 'wxrnAw4', 'CMLL', 'y1jeCM0', 'zerpCu0', 'uw15EMG', 'DeviAg0', 'AwvY', 'serKuNO', 'svLAwhu', 'CMfXAhi', 'EeDbwgS', 'ihn1CIbqAxbPta', 'wePevwS', 'CfzrBKC', 'mdaGy2HHCgL0CG', 'r3j4v2e', 'mczTywLSpq', 'zxjfAMe', 'r3vyyLK', 'ls1IywnRz3jVDq', 'lsqLyMX1yI0Lja', 'qM91Dg9UihrVDq', 'Eg9Xq3q', 'DLP0y0G', 'pgLTzYbZCMm9jW', 'zuPIDhm', 'zenvwwS', 'zgL2x3bKzL9JAa', 'yxLQwMS', 'B3vYx2LTywDLka', 'ChjLDMvUDerLzG', 'EfL1CKO', 'rurfy1e', 'vfr6B2K', 'CLD0CeG', 'rLjptsbJAgfWAq', 'z2Xnq2e', 'BJ4Gpc9KAxy+ia', 'DhrVBIbVBMnSAq', 'rMfPCY1SzsbLBG', 'yxnLsNe', 'vwPkAuO', 'wg9uug4', 'ihbVDxjYywLZia', 'C3bHBL9HzgrFAq', 'qLP5AKm', 'wKL6Aee', 'C21gzK4', 'jNzVDgvFDhLWzq', 'vg9WieH1C2jHBG', 'ChjVz3jLC3m', 'DeXIAey', 'DJ4GpgrPDIbPza', 'ksC+pgLTzYbZCG', 'zgy6', 'vgrQrvq', 'uMPHv04', 'CLbSz3e', 'uvnfuKW', 'zKr4sLi', 't0Lqzeq', 'CYGP', 'qMvtENK', 'yKnvr1C', 'r2Lpufe', 'rwv4que', 'yw5gz2C', 'r2rosLO', 'ChvPzsbUj2LTCa', 'qLbVvu0', 'BMXpD0O', 'vNnOAha', 'vgzhwfy', 'zgv2AwnLCMvHza', 'kgLTzY9SB2fKAq', 'CMuGzhuGtw9Uza', 'zv9Jyxq', 'jIm5nJu0oW', 'zxjYB3i', 'tLnpve4', 'tLbWBwy', 'DwL4seq', 'Awq9j3bZzxvKBW', 'Ag5Svfa', 'vK9bEvi', 'zxvY', 'ic8GmtaLkq', 'psFdIwnYAxmGDg8', 'zxn0lxnPzguSia', 'BJ48yNv0Dg9Uia', 'EfrdChy', 'CMvTB3zLqxr0CG', 'uhHNy3q', 'ww5yDu4', 'n2HmEvzKrG', 'y0PssM0', 'u2rdz2e', 'oMfWCgXPy2f0Aq', 'uvfnt2K', 'rMLJAgLLCIbPBq', 'AwTvqvK', 'sejqwKK', 'DIbPzd0NC2LKzq', 'u2Lyy0q', 'v1PksxK', 'ANvPt3q', 'BuPHENa', 'DNj1u1C', 'vxLdqva', 'AwL1quW', 'yw5PBwf0Aw9U', 'BwNdQhjLihbHz2u', 'rxPjrKy', 'vuTNrfe', 's1fYD00', 'ANrQuLm', 'wuD4DvC', 'sfvJsKK', 'DLHPt2O', 'zMXLEa', 's1Pvr0u', 'yK5Htgm', 'ieforcbJAgfWAq', 'wMTwwfm', 'shr0Du4', 'BuzKEwS', 'wMTPuvK', 'ideUosK', 'wev5uvu', 'A2niquu', 'B255BwvTzw50kq', 'j3rPDhjLjZ4MiW', 'tLPeD3C', 'j3rPDhjLjZ5bAG', 's1PMC1y', 'r25mEhK', 'ALbvrwO', 'thPrsgm', 'rKnhzgq', 'DvnxyLa', 'swHhuuu', 'ig5VDgu9pYbxsa', 'ice9ideGksbpuG', 'DM15wwy', 'itWVB3b0Aw9UpG', 'qw5Lsg8', 'ignVBwLJpt8Gqq', 'Ahjzr2K', 'ldmP', 'BLfZBwC', 'CuDjBKS', 'vg1ft0q', 'vhH2qNy', 'CIC+pc9KAxy+', 'v0nrDxG', 'BwfUAxa', 'zgvSDgfFy2f0ka', 'jsuTjsuLrLiLjq', 'CMfUA2LUz19WjW', 'BhnSwe4', 'seH4yLG', 'tvnhEw4', 'r1btzei', 'Ew93D0W', 'ufPHtwu', 'zNP4DMe', 'r21wq3K', 'txzPu20', 'Ee9jtMe', 'ue1eC0m', 'qLfOs2K', 'whvHr28', 'DvLAvwq', 'swDdz0i', 'zxmGvmoPBSoOyNjL', 'ugfZigvUDM95W6K', 'yw5Jzxv4pc9VCa', 'wvH6AMC', 'yNjVBNPL', 'BxzOBxm', 'qxjJAgfUz2u', 'D0LOzhG', 'CKrOEgK', 'AMvTAwK', 'BxP4v0m', 'zsbZDwLZihvUia', 'z2Lyr08', 'EM5oB3O', 'CM90yxrLkc05ma', 'Evn4B0C', 'wKfMyw4', 'DfDVz1i', 'Awrfsfe', 'uMv0AxldQse', 'C0HpteK', 'u3Hfu04', 'rLvnrwm', 'y2LmsxO', 'qwDHzLe', 'As4UlG', 'CgTfBMO', 'y29TAwm9pYbpuG', 'sNfgA2e', 'qKLPvvC', 'y2f0y2G', 'BfD4uM0', 'yw1St2m', 'A01Sv04', 'y2XHC3nmAxn0', 'ufHprfy', 'vNP0AfK', 'whLuugS', 't2XOy2S', 'quXeAvi', 'ysbZB3vMzNjHBG', 'DevoqKG', 'ChnPCZ0/iefora', 'sLnNzLq', 'u1Dqv3i', 'rvjfignVBwLJpq', 'zhfsswW', 'yMXVCxvLCIG', 'wfryEfm', 'qw1IzKy', 'BMf2x2j0BG', 'yvzNz1O', 'wur4wwe', 'CMv0y28', 'zgykqM9UDxmHjq', 't1f5zwi', 'ywXbza', 'r01iue0', 's3PbveK', 'zMLUzeLUzgv4', 'uIWGBgLLBIbwqq', 'C2HVDW', 'uhvOvgK', 'qLzsEwe', 'z2v0t3bLCMf0BW', 'rgLIzMK', 'ltuWjsWGmcuP', 'BuPJEfK', 'AvbqC2O', 'zwDVCMLLkgLKia', 'ywLLigrLignOyq', 'sw5JyxjUyxrPBW', 'vhb1B1e', 'BgfUz3vL', 'zsbWCMvTAwvYia', 'zgDLwKm', 'AxrLidjZigLUzG', 'r0rXyNy', 'EhzYy0y', 'DgnTDha', 'zMfKzwzHzgu', 'ru1Zuxu', 'zg93BL9IywnRxW', 'sw92sw8', 'ALLHv3O', 'AhL3Exa', 'u2nWAeO', 'DeTsrui', 'yvfYBey', 'EuDAvha', 'jZ48l3bYB2DYzq', 'zw50igzPBMK/', 'AwvZ', 'y2PJru0', 'quHVwNK', 'CMLTW6KGmtaWihq', 'D3bcu3O', 'EvfJCfe', 'rgL2Aw5PDmoPigq', 'Dg5utNe', 'y3Dwrxm', 'DfjpuvO', 'DKzUuxK', 'zuLrAhq', 'tvH1BMq', 'BM9Tx2nHDa', 'svbdBLO', 'wwPsEhC', 'ldiP', 'x3vWic41CYbMBW', 'yMLLBIbKzsb2BW', 'ALrNt0O', 'EMjsAMm', 'C3rHDhvZ', 'BgLRzxm', 'rvDtuxm', 'wMvtyNq', 'DsbguK9nignOyq', 'DxrVDxrPBc5MCG', 'uu9fvMe', 's1HHBNC', 'C3vIC3rYAw5N', 'B2L4x3bHCNrHzW', 'zg9KEhC', 'q3zgB2O', 'zfbqtKW', 'C1Dkz1i', 'y1v1uNe', 'vKnAywC', 'CufPyMq', 'zgLZCgXHEq', 'C0HIz1i', 'mIKUCg5N', 'qMfhCu4', 'yNv0Dg9UpIa8za', 'lCoQDhjLihrLiha', 'BNH1wgm', 'E30Uy29UC3rYDq', 'zYC+pgi+', 'C2HVD0LUDgvYCW', 'B2K/', 'reXdt3a', 'C0zOuMy', 'ignSyxnZpsDZCa', 'u0vmrunuicOGrG', 'AguGyYDLC3qGCa', 'BM9Uzq', 's2z4wu8', 't2jIrLm', 'CLD5AvG', 'y2f0W6LNB3jPzq', 'psDUDw1IzxiNia', 'qwTqtKe', 'ntaWignOyxbPDa', 't3zgy1K', 'DhjHBNnMB3jT', 'r2jyC2m', 'AMHqyNq', 'ueLjv2G', 'Ce1vtwS', 'C3vPCYbXDsD1BG', 'v3DAAw0', 'DuXQtfi', 'EvvWru8', 'y3D0zgC', 'pYbmsu1jvcaX', 'tgvJDgv1CIbcBW', 'vhldQhmGyMvSBgu', 'zwDVCMLLlgLKla', 'z3jqAwq', 'B1vLt3C', 'ExziAfa', 'AKLssKq', 'yLPPyM0', 'mtaWjq', 'D24GlJvZigzVCG', 'vLvuENy', 'CvPhBgO', 'sMrMDKy', 'B05yBLC', 'CNjnyNO', 'wePMwM8', 'r3LnD0e', 'z2jgB2y', 'DvP5seO', 'zgfJv2e', 'EuvMB3q', 'ENbZq1u', 'A0zAyu4', 'zv9JyxqOksCGyW', 'ANjIqvy', 'BwvZC2C', 'DvPOrM0', 'sgDKt2W', 'n3mGzM9YD2fYza', 'zsaOCMfUzYbtuW', 'A1HoBhi', 'pJXPBNb1Dcb0Eq', 'zw50khzHCIGTlq', 'vxvitNC', 'zM9PCW', 'u3zSBNu', 'ldqP', 'wM5uz1G', 'psDTB250zxiODa', 'AxjL', 'zfzey0m', 'AxyGAwq9j2rPDG', 'qKfbrLa', 'yvPKthG', 'EuPwALO', 'u29ZAeu', 'wgHKrgi', 'x2nVDxjZlNbUzW', 'ChLpEhe', 'CM9IvLO', 'DKDAtem', 'DgLUzsC', 'A21vDxq', 'yNv0Dg9Ux21LCW', 'y2HLigjPzw48lW', 'zvHRyvu', 'wgLfyKK', 'BxzMuvq', 'pJWVzgL2pIa8za', 'BuPdrfe', 'CuHqBhe', 'B1jRvfG', 'zgH6vuO', 'CvHuzKq', 'ugX1CYbNCM9Zia', 'C3rLBMnPBa', 'CxnIBNm', 's2vQrxy', 'C3jHt3G', 's2DgD0u', 'CgfKzgLUz1rVCa', 'BLrRtLy', 'qK5uuxG', 'sKriuNq', 'we54uMS', 'zMvfteC', 'BgLYzv9JAgfWAq', 'rfLRzxa', 'lNbPCgK/pc9OmW', 'vLrJDuW', 'ks5WBMC', 'DwLvteq', 'BgXyAxq', 'C2nYB2XSvg9W', 'sxvRDvu', 'DgvYB0q', 'A05csfm', 'sM90zgu', 'ugfZig1VAsbOzq', 'DhnICKe', 'DxvPza', 'D09vAMS', 'AvnpC3K', 'pLzHBgLKzxi8lW', 'D1vLDvu', 'zeLNAfa', 'CgX1z2LUCW', 'sLjNC3m', 'B25YzwfKExn0yq', 'DgnTwxa', 's2ryvfC', 'zxrYywL0x2rLxW', 'A1bgwfi', 'q2T0BfC', 'DNvXsgm', 'vM9SB250W6KGzMu', 'yKL2Aw4', 'B1Pbt08', 'yuvVDuW', 'Bxbjug4', 'W4DHigeGzMfPDca', 'ic8GmcuP', 'yKv1y2i', 'uvL5Dvq', 'v3jnA20', 'zwrPDgnV', 'CLn6D2i', 'D0X1sKm', 'AvPRC0m', 'pc9OmZ48C3bHBG', 'twuGDg91y2HLia', 'zgLLBNqOy2XVCW', 'B2XKzxi9j8ojy3i', 'BMjlveq', 'ywvZtgm', 'EMD1Bxu', 'vwztsxK', 'wgPLDKq', 'suLWDvi', 'D0nQB20', 'quLjCNC', 'Euz1s2K', 'tMncD1y', 'ntaWmcbJAgfWAq', 'DKrpwuS', 'CwXRvw0', 'wvnQwKW', 'lcaXksC+mdWVyG', 'C21nyu4', 'vgL0CMuNpJWVCW', 'uefeB24', 'ChGSmhb4ksbYBW', 'rhH4qvi', 'EM9VBwvY', 'A2TYD3C', 't0fyqMu', 'BNPfte8', 'BgrIwei', 'AePKz1i', 'zxjZDxa', 'vhvHwMW', 'Dg9Uig1VDcbKzq', 'vhuGyxmGBhuGmW', 'AxnTAxnZ', 'AgvLCW', 'zwXoBNO', 'CgvSx3nJB3jLjW', 'CfvIA2i', 'EeTsv3C', 'r3jHBMqGyMLIBa', 'C2v6Dvm', 'zsbSzsbYzxn0yq', 'DKL6t2u', 'AxnqyNa', 'nhmGzM9YD2fYza', 'BMD0Ad0NmJuNia', 'vwfUtwe', 'BNfqwLG', 'zNbeu0K', 'qK9sthy', 'EvbeAhC', 'r3DdDvK', 'B25SB2fKzw5K', 'ueT5sfa', 'zgf0ys1JB2XVCG', 'yLPnu2C', 'zw1xEva', 'sw1WB3nZAwjSzq', 'rNDLyNi', 'B3bLBNDPDgG', 'DgHPCYW0ksC+pa', 'mtaNihbSywnLAa', 'v0HfuKuGAwq9pW', 'CMLzEw0', 'u0vmrunuignHDa', 'CNtdQsaXnsbMAwm', 'C2PKCfO', 'C3bHBJ48yNv0Da', 'wgLSEKm', 'vhuGyxmGCMv0Aq', 'uNjjqKy', 'CYbMywLIBgvZpa', 'idXPpJa8l2K+', 'Au9LqLy', 'zhbmsu4', 'vNrlwhe', 'Bgnhvei', 't2vPBcbmW6LNzw4', 'A2v3rLm', 'B24GyxbWyxjLAq', 'q3Pfq0W', 'DMfYigKGpsaXna', 'vfDMqwG', 'Bhu9msK', 'tfPYuha', 'DM90zsC+idXIDq', 'j2fPBwuGW6aGCge', 'BwfNzsaUm3mGzG', 'CNrqAMy', 'EufvEeG', 'rhbmvNm', 'jZ48l2i+phnWyq', 'BMjYzv9HzgrJyq', 'sNnyyuK', 'sNb6tLi', 'z3jmruW', 'tMjlDhy', 's0Hrtvq', 'D0DOCuW', 'C3bHBJ48yJ5MBW', 'zwjpu2C', 'sxf6CgC', 'D1fhrgC', 'uLberNi', 'wMrNCxO', 'mtG1mtDFodi2oa', 'sgvyvLG', 'rvndweC', 'yuvowKq', 'Axv3tg0', 'nsC+tgvZihbSDq', 'ihbYAxm9msXKBW', 'q2HLy2S', 'rg9zD3G', 'tM9UihbHCYbTBW', 'zxjZB19Hx3n1zW', 'DhLWzq', 't2nRr2i', 'rgXhseu', 'zKnXz2m', 'r1byswu', 'ChjPCYXUB3rLia', 'BNmGzguGDgvZia', 'veXeAwC', 'm3WYFdr8mhWX', 'sKPgALu', 'pgrPDIbJBgfZCW', 'rhz0EgG', 'CJWVyNv0Dg9UpG', 'AeTTs3i', 'AxyGAwq9j3jHCa', 'vLLRy0O', 'DunRvLC', 'CwrTtNi', 'zt0NsMuGBwuGyW', 'Ae9lB2K', 'BxnNxW', 'nsbJAgfWAxrYzq', 'yxb3Egu', 'qKrwvMi', 'uwfMt3m', 'yvnXEvO', 'uvzzvLa', 'tervDvK', 'ENDbAuC', 'CezIEwO', 'uKTqANq', 'u3bcswq', 'whzRBKS', 't2GGyxjYW6P0zse', 'vhLXy1O', 'wunWDeW', 'BwfNzv9WzxjZBW', 'yMXPBMC', 'tvzoAKK', 'BgLTAxrL', 'BhrUr2S', 'DurIyK8', 'zMXyqw0', 'x19WCM90B19F', 't0zcvvy', 'C2DF', 'D0HkAKS', 'yw5NDwuSDhjHza', 'CKDWz0K', 'B2fwCKS', 'CuLZsg0', 't2TmuLK', 's2rcB3G', 'tLHgA3G', 'q1zIDgS', 'qKjgree', 'wLHTquS', 'zgf0ys1KyxjRlq', 'EhfYywK', 'zvzMt0i', 'C0rqzKK', 'CwTyENe', 'CM1pruG', 'Cg9IBwG', 'C3m+', 'ufLPwuW', 'rhjHz29U', 'CMDIysGXideGmq', 'psDUyNjLx3zVDa', 'r1rgAxG', 'u2nQuu8', 'Eej0C3y', 'A1LtDLm', 'C2nHBguOms45la', 'B3z0Evy', 'wgjxB1q', 'v3LoAxy', 'BvjOrLm', 'W6KGmtaWigrPC2W', 'DgL0BgvFBgLZDa', 'CLvjtfG', 'p3nOB3zVDgvZpq', 'zgL2x2nHDgvNBW', 'AurPqNe', 'DgvYBMv0ig1HCG', 'y29TAwm', 'Bg94suG', 'qwDHugy', 'rezQqNq', 'y2f0jZ48Aw5WDq', 'C3vtCgq', 'zvrpC1O', 'Dg9UpJXIDxr0BW', 'y2HHCgL0CMu8lW', 'zg9JDw1LBNrfBa', 'vuHorwC', 'DLjZEKW', 'yLnKA3C', 'mZaWmcbJAgfWAq', 'rvzowLe', 'DKjfrgi', 'vxDtwfC', 'qLzHC00', 't2nrzxK', 'C0TYsgG', 't2rTy3G', 'txzOswu', 'twH0B3i', 'Dg9UigLKpsDIDq', 'EKvbDxG', 'DKzbEMO', 'W6KGmtaWigXPA2u', 'qundrvntx05fva', 'wMHIwve', 'CcbJBgfZCZ0NyW', 'igvTB2PPpt8Sia', 'DMTWvhK', 'sMuGy2HHCMDLia', 'zNvVEK4', 'DfLJExy', 'tNzpBfy', 'vg9WiejHzgfZCW', 'u1nVy2q', 'ifjVEwfS', 'qKXUqvm', 'C2vSzwn0x3bLCG', 'rLvjDwe', 'r2fRrxq', 'pgi+', 'CYb2zxjZihvUzq', 'EgvnBLm', 'zMvLzhm', 'u2rfwKm', 'uMnNBgS', 'zwrHEfm', 'y3HJwe8', 'AxPfAge', 'zgf0ys10zwXLzW', 'v3LbChG', 'uwHXyKm', 'D1zVwgu', 'yxbWzwfYidrZia', 'CgnzzwG', 'mcbJAgfWAxrYzq', 'Dgv4Da', 'tufHv2u', 'sNv2AM4', 'B1vPAfm', 'tw9gDhi', 'zw1VDM90zwq', 'wM53se4', 'yZ0N', 'zxm/', 'uhzvru8', 'qu5eigXHBMD1zq', 'sfDsseC', 'A0TLqva', 'ze1Kqw8', 'sxfntgC', 'pc9IDxr0B24+pa', 'sMuGDcDHDxjHAq', 'ktWVAt48l2i+pa', 'CfPcBgq', 'ELfZtMy', 'vvPsDu4', 'sgTPseW', 'ugfZihb1ihbHCG', 'r2rKuNi', 'tw9UihbLCNnVia', 'vgTLu0C', 'r05fD0m', 'kcKNigLKpsDZCa', 'CM1L', 'qLnjwhy', 'EuvhDNG', 'vxrMoa', 'CMvHzefZvgv4Da', 'ENDhq2W', 'wMTzrMu', 'vuvAAge', 'zvDqB0W', 'ugjlvLO', 'ALrVrKO', 'B3HdA2G', 'zgLLBNqODg8GCG', 'zg1IANC', 'tvbYtKW', 'EwvdtLe', 'EwXjtg4', 'teLnsvqGmq', 'wu5hAKq', 'BMuNig9Uy2HHBG', 'ic8G', 'D0zOtwK', 'z2v0vMLLD3bVCG', 'rcbdt0Xvtu4GyW', 'sMuGDMfPCYbTzq', 'ChjVyMXLBwu', 'zw5Zig1LigXPCW', 'pc9PpJWVC3bHBG', 'sg5Xt2W', 'CMHYswC', 'CvvXquG', 'BwvUDd88l2GZpG', 'yKrRvvy', 'u01LyMS', 'svLNDee', 'B3zLCMzSB3C', 'vKXAANC', 'wfvUzvG', 'xYqOj2nVBw1LBG', 'zNPxt2i', 't2jZzxj2yxrPBW', 'rw1IuhO', 'B25UDq', 'yLv4C1u', 'tvHytum', 'vvvutLC', 'DM90zxiOjW', 'C2HVD19HBgXFyW', 'D0PkDuq', 'CMLkvLq', 'r3rRAMO', 'zsbKW6LIDxqLjsu', 'rs5olKq', 'z2v0ugfNzq', 'zwXQBNq', 'BNDhywi', 'ihbYAxm9mcbxsa', 'rhHlBKK', 'jZ48l2j1DhrVBG', 'phnWyw4GAwq9jW', 'r0fdB0u', 'u1DHB20', 'A1rjs0C', 'CMm9j2LTzY9SBW', 'DmoPz29YAwu', 'AwfNDMK', 'CYbMB3j3yxjKCW', 'wuDiwem', 'EgTIALO', 'zLDUqum', 'vwzhyvq', 'yMvWv2O', 'shLwCxu', 'pc9ZCgfUpJWVCW', 'ENHRvKG', 'twDHuLy', 'DCoPiduWmcbUB3q', 'vgHHBM9Z', 'zuPevgm', 'uNLJDwO', 'DujwtKq', 'DxmGBw9JAgvZpa', 'BgLZDgvFy29TAq', 'Exv4CMG', 'AwXLjYbPzd0NAq', 'BxDxBxe', 'D0zIt2i', 'AhrJrvq', 'phnWyw4+pgi+', 'phnLBgvJDcbPza', 'y2S9iNn1z2DLCG', 'EMLkAwS', 'rNDwC2m', 'ru9RrhC', 'vLfTDKG', 'AgvYy2HLidO8yG', 'yMrXr0K', 'ALjTEKm', 'u2fUCY4UlIbJBW', 'Dwr6Auu', 'sKnjzMO', 'u0vmrunuigX1ia', 'uw5vruK', 'pc9PpJWVzgL2pG', 'sevbra', 'rSoPW6LYAxf1zq', 'r055Eem', 'wsblrvKGqvvutW', 'ywXLCNqGlJrZia', 'B3bLBNzVDgvL', 'qM1TBNy', 'AxnQDMS', 'CgfUpIa8C3bHBG', 'CJ4GpgLTzYbZCG', 'De1Tsue', 'B3bHy2L0EsGWlG', 'CxfwCgu', 'pJXIDxr0B24GAq', 'vLPyu0m', 'qxD3rM0', 'zgL2x3vWic43CW', 'DxjLCIbVDsbKzq', 'rfHlqxe', 'z21Nt1i', 'tef2v08', 'Cw5MAvm', 'wwvpD0O', 't2XAELm', 'v3LvB3i', 'zsbguK9nignOyq', 'shjstfG', 's3Hbz04', 'Afz0A04', 'rKrTq0G', 'ihjHAM91DgvYia', 'zwP2A28', 'yLHtsKi', 'wgfAwee', 'BwfNzsaUnxmGzG', 'vhuGDMfZigfZCW', 'rMLJAgLLCIbHyG', 'zhj4vee', 'y21RsxO', 'igLKpt8', 'A3LYCgi', 'zgPuAei', 'CgfYzw50tM9Kzq', 'CMvTB3zLq2HPBa', 'EwjuyLq', 's0D2uuK', 'tNHNAMS', 'tw9xvMe', 'qMLLBNzLBNvLla', 'BNP1qKW', 'CYaHpsbJB21PyW', 'ntuGmJu1ic8GmG', 'B25mAw5L', 'idjZigLUzMLUAq', 'uYG/ld8SpYW/la', 'ugTVDgi', 'qNDMr3y', 'DwnbC1m', 'tKPpEM8', 'u0HWrvi', 'p2fYDwTHpq', 'ExDqCxO', 'rKfTv0K', 'ueTKELu', 'zsaUlI4Nig1HEa', 'BgLUzwfYlwDYyq', 'BLrfz3u', 'wuviCfC', 'tvvfrhu', 'tKqGy2HHCgL0CG', 'reHus0e', 'pgrPDIbPzd0NAq', 'BvLhwKm', 'DMTXyNO', 'vuDxzeC', 'DxbOvve', 'u0vmrunuig5VDa', 'AxHmtxG', 'wejjvfu', 'C2HHCMu', 'l2rVD25SB2fKCW', 'sevsrsbJB21PyW', 'qMf3wfO', 'DMvYCYb1BMuGyW', 'BgvZx3zVDgvZ', 'BMrLignVBM5HW64', 'y292zxi', 'BwXsEfa', 'uNndu2u', 'ELzMuMu', 't0fUsxa', 't0jZCuG', 'qw5Nzq', 'BwvUDd0', 'uu9cD2W', 'EfDQv00', 'uxDMre0', 'ugH6y3m', 'rfP1sg8', 'Cuz4Exa', 'CMfKAwfSlwDYyq', 'idXVChrPB24GDG', 'z29SzcaOmIKUCa', 'z1bszLe', 'AKfPyKO', 'z2PfyKq', 'yNbzCwO', 'vvbeqvrfignOyq', 'wNfMD3a', 'zLvyCfi', 'zLrLuhG', 'ksbZy2fSzsG', 'yKPAvxa', 'C2LVBG', 'qMrlteu', 'BgLZDgvFy2HHCa', 'wuTgzgK', 'qxPHEeW', 'Dwjysvu', 'AxrYzsbguK9nia', 'uhDAs3e', 'BYCGDMfSDwu9jW', 'j291yMXPzw50lG', 'zLbqsgK', 'z0rzvMO', 'vMDLBfe', 'yxv0zxvY', 'EgLKiezst00GyW', 'quryq0u', 'EwPssue', 'y2XHC3nLBwvUDa', 'vhLAzxy', 'jYbTyxHSzw5NDa', 'z3zlEe4', 'A1rMsuy', 'qwLjtLm', 'ww5Zq2q', 'ExfXuxC', 'nJaWmcbJAgfWAq', 'yvflCM0', 'Dca1mcuGntaL', 'D3bTBvG', 'zsbSDwKLjsuTjq', 'tujyBgO', 'BxvlAKO', 'CLjrs04', 'vgT6wwS', 'D2fYzhm', 'tuPVswy', 'rxLMAxe', 'Cwf3sgS', 'B3b0Aw9UpIa8BW', 'DeDmtLq', 'u1fiqK8', 'rfLgtLC', 'uw1sywC', 'zd0NBM9Tx2nHDa', 'lte2mZe4nJy4na', 'sgnLtge', 'C0LfEfq', 'uwj1v3y', 'ue1ku1a', 'lJvZigLUzMLUAq', 'wuLhseG', 'vvz4BLK', 't24Gy29UDgLUDq', 'rvnxBNa', 'y29Yzse', 'AhD4txG', 'DgL0AwfSqwrZ', 'Ewnrrgi', 'Aefwufa', 'y2XPzw50v2LKDa', 'rxnWCML0', 'tM9Uig5VBIe', 'ugrTzuq', 'B2PPx2nHDcCGBq', 'yM90Dg9T', 'q213Bgu', 'zMfPBeLMtwfQBW', 't3DYDKi', 'uu5LuxG', 'CK5mtg4', 'uhnLDwrVihn0Ca', 'rxfvy0m', 'mxWZFdb8nhW1Fa', 'qwDguNy', 'te5UCwC', 'DefADfK', 'r3jfueW', 'uLzZB0u', 'y2f0x2nVBwLJCW', 'CeT5vfa', 'tfLvvei', 'v3f1uwC', 'D0HlvNG', 'l2jVBNvZlNbKzG', 'Dxi9', 'vw4GywPVDxqGDG', 'phnWyw4GB25JBa', 'BJ48C3bHBIbVBG', 'mJuNihbSywnLAa', 'sMPdEMS', 'BfP0ue4', 'BwjLyLm', 'qMvcrui', 'zhvJyLm', 'B25JBgLJAZ0Nzq', 'jNbZzxvKBZ0', 'sKDnwNy', 'wxHvEKG', 'BwvUDcbHBM51Ba', 'wKPwBgK', 'sxPmr3O', 'rM1Xue4', 'uKniqviSignVBq', 'mNW2Fdn8nhW3Fa', 'r2v3Ehm', 'C2vSzwn0zwq', 'Cg9Hthe', 'yuHzrvi', 'B0Tft28', 'igWNB3jKCMuGsq', 'C1bkDha', 'ACoPiduGy29TBwu', 'DfLqCw8', 'wwP1ywi', 'wMjTwhy', 'rgvZDgLUihrYyq', 'rMDLEuS', 'uNnHAKq', 'pc9ZCgfUpIa8Aq', 'zfLvyxu', 'ALrlv0G', 'CMTXwvG', 'rwHLAuS', 'Cw5kENq', 'BML2zwf1x2XLyW', 'ihbHCNrP', 's2D5rLC', 'W4DHihzHigzHAxi', 'AwzPzsbXDsDPBG', 'C3bHBG', 'AwmGu0vuignHDa', 'zgr3B2y', 'mxWYFdn8mhW0', 'zgnVjZ48l2j1Da', 'sLLnqxG', 'vNzqBKy', 'Be55AKu', 'DujMBMO', 'BvPyv2i', 'svHzz0O', 'lduPjZ48yJ7WN5IHpa', 'AKj5BMC', 'yKDIA0K', 'vwjtuwS', 'wKz0r0W', 'AMKSAwqGrLjptq', 'DK9HCxa', 'wxPTyvG', 'v01Rywm', 't1jerviGqLKGBa', 'Cvndt0W', 'CgL0CMvZifDirq', 'wwvQvNG', 'CejryMi', 'Bw9WDwiGB2S', 'AeD5z3i', 'rgvpDhm', 'CNb6rLu', 'ihnVBgLK', 'jZ48C3bHBJ48yG', 'ExnSzgW', 'yxPmA2W', 'qxjJAgLKW6LTB24', 'yMLUza', 'Cg9YDmoPiq', 'ota5ota4vKnXqvDk', 'A0XOqwe', 'DhjVCgHLzxm', 'AxmSnYKNpJXIpG', 'CM5jv0K', 'AeLLtuK', 'uLnuwhO', 'vM1orxy', 'AxmSyxv0zxvYla', 'vejHt0e', 'uuP4zKK', 'y3r1zwW', 'tfvgq1y', 'swTfBLC', 'ignLy2K8l2G0pG', 'z2THq3u', 'De1zrwC', 'DhrVBJ4Gpc9KAq', 'q05swgK', 'vhuGyxmGBhuGmG', 'vxrQzgm', 'BJ48zgL2igLKpq', 'vfnUwgi', 'm3W1Fdf8nhWWFa', 'icHKzxnZAw5HDa', 'qviSyxv0zxvYia', 'Aw5PDcbZDwnJzq', 'thvrq3m', 'z1fKCMy', 'i2u2n2uYmG', 'ywXWAge', 'AfLnDxu', 'phnWyw4+pgK+kG', 'ANP0rvK', 'rwL3EwS', 'CNnltNu', 'zuXUA1y', 'zwHtzuC', 'swnKsMS', 'whjbt3C', 'BgXVA0e', 'EvD3zw8', 'DhrVBJ48yNv0Da', 'z2PyweK', 'zNPzDfO', 'thbRDgO', 's1zKwhK', 'q3DqsLu', 'wLjyveS', 'CMfUzYbtkq', 'yK1Py0q', 'uLHvv2S', 'yMTcCwK', 'DgDrqLO', 'BKnXr0O', 'uLzluw4', 'Ed0N', 'C3vWChjPBCoPzq', 'BM9JB21Tzw50', 'j2jHy2TFAw5MBW', 'C3mH', 'j2fKzf9PBwfNzq', 'we5qzwC', 'AgLZldePjYbVBG', 'qvnZyKe', 'BgeGChvIpc9IpG', 'D0TirNG', 'sgv1CMv1Ea', 'EM56Bfu', 'W4DHihzHihbLDxq', 'vgzREKK', 'ywXPza', 'BMDLx3zVDgvFyW', 'z1vhww0', 'j3rLEhqNigLKpq', 'tM5jwKW', 'yMr2qMu', 'y2uUlI4GBweGCW', 'ugfREMe', 'vhuGyxmGBhuGmq', 'W4DHignVBw1LBMm', 'Avjbq3q', 'vKzABu8', 'qwPVDxtdQq', 'D2zbzKu', 'yw5Niee', 'vxzbAxu', 'Bvrur1a', 'ChrNBLm', 'pc9IpJWVC3bHBG', 'Bhnoseu', 'EwPgEhG', 'se9NDem', 'Afvcq0S', 'y29TBwvUDhm', 'pIa8yNv0Dg9Uia', 'uhHwsfe', 'ALb6uui', 'ysbKW6LJAwtdQsbW', 'u2noqK4', 'wwzjtgy', 'Dwu9jZyNpKXLCW', 'ExbsEKi', 'seTyB0K', 't0veA1u', 'CNtdQsaXigzPy2G', 'uLffrLm', 'ihzHBhvLpsC', 'yvvAzvq', 'W6KGntaGzgLZBgK', 'DhjLigvUy29Yzq', 'DMfSDwu', 'ChjVBwLZzq', 'l3nWyw4+phnWyq', 'rNfRufa', 'uLjpALK', 'CYbHAM91Dhm', 'ru5nz0S', 'Aw90AmoPy2fPCMu', 'tgeGCMvJAgvYyW', 'mJyZDhDIv2D5', 'DhDMy1O', 'BMXHuxC', 'tfnUAMK', 'turwsMG', 'idi1igfQB3v0CW', 'rfbmwNm', 'yKzZveu', 'jsaXmdaLksWGyW', 'weHnC1K', 's3bSvNm', 'CMvZCg9UC2vuEq', 'rM5qEfC', 'u2vyBMm', 'zhHerxG', 'vKzLBgG', 'AgLKzv9KAxzFAq', 'EuT3BNu', 'pJXPpJa8l2K+pa', 'sLHdt08', 'CYbWCSoPDMvUDq', 'vu5WzMq', 'B2zMC2v0sgvPzW', 'Eu9dEfG', 'sgfRAsbKzsbSjW', 'CvDAwwG', 'zgL2x2rVD24GlG', 'uuLdy2e', 's3nnyxm', 'CMvZifDirvjfia', 'y1bQCLy', 'psDZzwXLy3rFCa', 'tvn3B1u', 'CKDeBvy', 'AhjbvfG', 'B3rL', 'tLqOkIKGyxmGDG', 'BgfZCZ0NyNrUmG', 'y250', 'vvfUEKK', 'tfrUBhi', 'zfftsgW', 'CuTly1u', 'rMPKEMK', 'Dg9mB3DLCKnHCW', 'zMnhwMO', 'tMfRyw1H', 'uu9isMS', 'B3jPzq', 'C05xCxC', 'yMnwrM4', 'yxtdQwDVCMLL', 't1vNru4', 'veTfD2C', 'CK9Ys1K', 'B3bhwMy', 'ywXS', 'Dwn0zxvYlg1PBG', 'wLzkswW', 'pc9IpJXPpG', 'qNf2yuW', 'Cfz4AMW', 'swXSDMm', 'pgK+vhjVCgJdQwu', 'rLbVz2u', 'iduGywPVDxrZia', 'z3LgDKq', 'qvPvyNa', 'jYbVBMnSAwnRpq', 'v1Hrs1a', 'AhHzCKC', 'EhP6Bva', 'BhPbwK0', 'Bw9UBLC', 'pJWVC3bHBJ48CW', 'ihrPDhjLifzbuG', 'DNb4qwq', 'D0PuyM4', 'u0vmrunuigX1la', 'v1zMC1m', 'AxrYzt0/', 'CxDmqvy', 'qwreAxnWBgf5zq', 'DwD3r2W', 'C2v0qxr0CMLIDq', 'tMnjqLe', 'jsuTjsuLDhv0BW', 'BgvMDg9sAwDODa', 'v2HnrK8', 's2vgAw0', 'A3j2q3C', 'u0zMBNi', 'AhHesKe', 'r3jHAw5LigrLia', 'q2HVAxnPCYb0BW', 'CK5XwKe', 'rNrMA04', 'vMXqthK', 'ExbLpsD0zxH0jW', 'BeLIufG', 'q2Tbt0W', 'CgL0CMvZifnfva', 'tKHoz3y', 'wLDWq3G', 'Awr3rNi', 'B2fUuwW', 'EgXgrKC', 'AgfYz2uNpJWVCa', 'tNHLqKu', 'yxrLz29YAwvZ', 'ChvVyKu', 'mNWWFdr8mxWZFa', 'AwnP', 'uKuGAwq9pW', 'Aw9U', 'yvLjzKy', 'pJXZCgfUpIbuDq', 'x3jPz2H0jZ48Aa', 'y2XnzgG', 'yNDXvNK', 'zguGChldQwBdQxjL', 'zhnArfq', 'AxPsCfu', 'BhjXvNC', 'zd0NChDKx2LUCa', 'pteMBwfPBd0', 'jsuLlsuLjq', 'tMLpuMm', 'D1LtyLG', 'qxfwsKG', 'uNr5vee', 'BfzmBeC', 'CxnxCgG', 'u3nrt0q', 'vuHeseG', 'rLLtuei', 'At48l3nWyw4+', 'EMzXCgu', 'vgngAuO', 'rgvYBMLLCIbIBW', 'DhjHBNnSyxrLka', 'BhLsCvK', 'B0XJAK4', 'weHqywS', 'B2vkyLi', 'y1nADLa', 'jZ4GphnWyw4+pa', 'CIGXlJvWEcK', 't24GCMvWCMvUza', 'yxiGDgL0CMuSia', 'jZ48Aw5WDxqGDa', 'BKfirgS', 'yxvnC0i', 'D2joDNC', 'CNHTrgK', 'zsbIB25OzxvY', 'z2vYpc9IDxr0BW', 'W6KGmtaGzgLZBgK', 'DMTxsu4', 'AfrRquG', 'ANjIAw0', 'te1NCwS', 'Auz0EuW', 'DxjL', 'qwXcu1m', 'ACoPideWignVBw0', 'CgvYC2LZDgvUDa', 'AMnnsxG', 'y250Da', 'qurnBMu', 'AgLLCG', 'DcbICMvHAY4UlG', 'yNrnweu', 'rhftB2S', 'wur6Ahy', 'wKzhtuq', 'B0DIBfK', 'Axm8l2i+pgKGAq', 'qMHwruu', 'vhuGyxmGzg9UBG', 'C3m+pc9ZCgfUpG', 'yuLABKm', 'C3vIx21LDgfZ', 'q0zvqvu', 'CxPAzMK', 'yLjis0u', 'ExvHCu0', 'BMvItxa', 'y29TBwvUDgfPCG', 'Ew1UuvC', 'mcuP', 'Au1ZEKe', 'CMfTlwrPC2n1CW', 'ue1uue4', 'l3nPCZWVB3b0Aq', 'CM1PBMuUCg5Nkq', 'rMLJAgLLCIbUBW', 'Bg90ihr3Axn0iq', 'uxbuEK4', 'mJaWmcbHAM91Da', 'z2fXv2W', 'txPxuwy', 'igLKpsDUB21FyW', 'BNHvEwK', 'ywDLjZ4GpgLUCa', 'rvnnthe', 'rgvZDhj1y3rPBW', 'tMHAsNe', 'v2LYrxq', 'q3nfsfm', 'tw9cr3C', 'sgvVC2q', 'CYbbreqGq09mvq', 'rMnWA0e', 'CMuGBguGChjLBq', 'thH1Bfu', 'sNj5DMW', 'yu1kA00', 'nxb4ia', 'ww95sK8', 'y01Oy0O', 'AgLZla', 'mtaL', 'q0DmtMC', 'qwDjzLe', 'rgL2Aw4', 'AuXhAMi', 'ugvguwu', 'A2feuKq', 'A2v5CW', 'EvLWDKm', 'Cg5N', 'qw9yA0S', 'AgzSu0m', 'qvb1wxe', 'tfHXqxa', 'pJXIDxr0B24GBW', 'BxjduMu', 'ChfOEuK', 'y3PvBuq', 'ugPjs3e', 'l29WDgLVBJ4Gpa', 'DxjLtLy', 'reTrBKy', 'AxnWBgf5oIbUBW', 'tfrfqKW', 'y2fUDMfZAwq', 'BNzuwLe', 'DgG9jZeWjYbWBa', 'wurswNK', 'D01Jwuu', 'CMLLCW', 'tsbJAgfWAxrYzq', 'AM9ztxi', 'AvL1u2u', 'BK9kwwy', 'CgfZpYbpAW', 'j3bYB2DLBMqNia', 'q3PYC24', 'CgvYC28', 'twrbt0G', 'DgfUDa', 'rLfgywS', 'EMfHzfy', 'q0TfzNi', 'q3jXCKW', 'zLHItg0', 'vfbpwfi', 'qu5eignOyxbPDa', 'u1v2ug4', 'CNPOENe', 'qNrVsvy', 'Dfz3Auq', 'EM5UqMq', 'AMLODxu', 'z0nSAwvUDfjLyW', 'EwLTu1m', 'q0zxqMy', 'svHPquG', 'CNLQr0S', 'EMLZr1a', 'zMfVALq', 'r1zgvxa', 'AwnOAwvYigLUyW', 'zxjFCgvYC28OjW', 'AMPruhC', 's1Deq0W', 'x2nVBwLJCW', 'C2Dnrwm', 'C3vWChjPBwvY', 'zgL2igLKpsDSzq', 'zgHmuKy', 'uwH0A1a', 'zLfRBLK', 'y21Su0C', 'zw1VAMLFy2f0', 'zwnRx3b3zcGPjW', 'BgLJAZ0NC3DPDa', 'C2DTy2q', 'i0jemda1mG', 'B2fKiezst00GyW', 'tsbJyxrLz29YAq', 'BLHOwKm', 'CgfKzgLUz0jVDa', 'u3D0yLi', 'yvD6uhe', 'rfPkv3K', 'BMjYzv9UB3q', 'CML0Axf1zq', 'ywrHBgvYDa', 'r3bvrMC', 'zezvqMm', 'Bw1LBNrHAxjLCW', 'BwLJpt8Gqu5eia', 'uLfrru0', 'B3bjCK0', 'BNHWAxm', 'v1jluMu', 't1jerviGqLKGDa', 'D1j5zLG', 'y1n5D0O', 'BM9Tpt8GifDirq', 'yxbWBgLJyxrPBW', 'zw1LBNqN', 'u2jqCe4', 'EMXfsNC', 'rvjfigLKpt8', 't1bJwuO', 'yvHSuwe', 'BMCYlMDPzIKGmq', 'tM5Oz2u', 'tgvJDgv1CIbHzW', 'z2XmAgu', 'ywWGit0GmcbbtG', 'y2XPy2S9j3bYBW', 'C2HHCMvxAxrOtW', 'sgeGDg9PigvUyW', 'DcbLBIbOyxv0ia', 'ze1vEhG', 'yMnKv2u', 'CIbtDxbYW6PTzq', 'sgj3veC', 'uwHyq1a', 'ugfZihb1igXPCG', 'lcaTmsKNpJa8lW', 'BMfTzt0NCgvYCW', 'DgHLBG', 'qK1hDLK', 'tNbMruS', 'CMfUzg9T', 'quTVq3i', 'z2DLCMvY', 'zKzOyMy', 'D0Xsy3a', 'ELLireS', 'r3jHBMqGtCoPy8oO', 'ksi+uMvWB25KCG', 'zuL1vg8', 'BvvLyKG', 'ywrKy28', 'BMDLCIb0B24Gra', 'zMfKzv9VDxqGmq', 'B3v4twG', 'CM4GDgHPCYiPka', 'DxrVBIddOcbNyxu', 'pIa8zgL2igLKpq', 'C3bPCML0DwfSia', 'whLgswq', 'Aw5IB3CTz3jHza', 'zxm9', 'uePAsMi', 'q2n1DKq', 'qw1iwNG', 'BgD4Ag0', 'pgLTzYbPzd0NAq', 'thLgv3q', 'DxnuuLC', 'CNvIEsaOmIKUCa', 'thP1v2O', 'Be9MwKG', 'yw5NifntuW', 'EuvqAgW', 'uLjlt3e', 'r2jRCMu', 'jZ48l2LTzZ4', 'tgrVC08', 'ueX5ywS', 'zxrQB24', 'sxHvvNe', 'rg54DLm', 'uLP6DhG', 'B3rLkhrOAxmSmW', 'uvjOsLy', 'zezMrK0', 'D3LMD1q', 'BMv4DfnPyMXPBG', 'lIbqCM9IBmoOBwu', 'Dgf0zsG5mgrLzW', 'EK5YsuO', 'W6KGnsbSAwTLCW', 'B05bBw4', 'CMfUzYbdkq', 'CMvTB3zL', 'y2S9j2nVBNrPBG', 'shzNsum', 'ignYzwf0zs1Yyq', 'jNr5Cg89', 'C3rzuMK', 'zgyUD29YA2vYlG', 'DLbZB3y', 'sMj1s0G', 'CZ0Ny2f0x2j1Da', 'ywDgr0O', 'zwDsvfu', 'weTksKW', 'psDIywnRz3jVDq', 'zgfYA190CM9WAa', 'vK1Irfu', 'sw1vD0K', 'yLfhqxm', 'y1vwvu8', 'sM11Aw8', 'BNn0CNvJDgLVBG', 'W4DHihKGzxn0iq', 'y3nFDxaGlJvZia', 'DLDQqui', 'C1vTBe8', 'C0LLqvq', 'CeToEgO', 'ANHbq2G', 'zxvuuNu', 'y29TBwvUDgvYka', 'AZ0NC2f2zv9WDW', 'rxP1CvC', 'AwvYid8', 'CfbSAKK', 'vM5qve8', 'zgL2pG', 'DgfNzxiUlI4', 'ELz5vNC', 'vfbLyMe', 'zsbjsuK', 'EuzgvwC', 'zw1VAMK', 'vu5MrMm', 'D2vIDg9VBG', 'C2Druhq', 'EwjKA2q', 'zMfKzsaUohmGzG', 'u1jIA24', 'vuTTyxG', 'y1nvtxm', 'su1buLKGs0vzia', 'zgv0ywLS', 'ELL5Dfm', 'Aw1HAxmUlI4', 'Dg9FC2nYB2XSxW', 'BM90Awy', 'vLPZAMq', 'wgffwMm', 'y2XXtw8', 'v3rKzxa', 'rM1qsei', 'sMjwBuq', 'teuGsuyGtK9uia', 'su52suu', 'quvt', 'sKTgAve', 'BhzOq2S', 'uIWGy29TAwnZia', 'qNnZt0i', 'ChGP', 'sfH5r3O', 'sNL3veq', 'C01OsfO', 'rfnxCeq', 'rufqB28', 'CuHyy00', 'CMLLBMLJAq', 'DujrrMW', 'EvvUr0W', 'yxbW', 'Bw9HB0y', 'yw5Nifm', 'swvUqKW', 's2PIu0y', 'rNHor28', 'EK9OsgO', 'shLnB1q', 'rvL0C2O', 'mcbMB2LZ', 'q29SB3i', 'jMnHDf92B3rLpq', 'DenHExC', 'rxrvAM8', 'suHNrKm', 'C2nHBgu', 'wMf6u3i', 'EwrABMq', 'Aw1Nl3jHBMDZlW', 'nhb4icfPBxbVCG', 'verLB2O', 'ifbPy2vZpc9PpG', 'zMnruLa', 'z2v0rwXLBwvUDa', 'AgLKzgvU', 'Cwz5ChO', 'swDOq2O', 'AeHhC24', 'wxrbugO', 'sMjuqLC', 'v1HoExK', 'runbC04', 'sKLyD2W', 'lhrVDgfSlgnHDa', 'wxPduNm', 'DxqGlG', 'tvvPBxi', 'yLjqBvC', 'zuHvCwC', 'wu5NEvK', 'r1nVvei', 'r0HUDuq', 'BNbzDNa', 'DwCSigvZC2fPzq', 'Eg1xBfa', 'BJ48ChjVz3jLCW', 'C2nHBguOmsWGmq', 'AuPbEuu', 'DuvUtKC', 'Ee5Nq2O', 'CgfKzgLUzW', 'ChrPB25Z', 'tKjVA24', 'zu1kq08', 'v2PnuKy', 'DcaOzw4GCSoPCg8', 'zfHIqNe', 'BK9nzvK', 'uKf5Bxe', 'zwTdsu0', 'vvbeqvrfignHDa', 'CYC+pgGZpKHTlG', 'Evfize0', 'tfbryLy', 'A25trfu', 'u3HYCgO', 'DfbNwuW', 'vhuGyxmGBhuGnq', 'C2nYAxb0', 'Ew1mDhe', 'u2L6zq', 'CMvZCg9UC2vuzq', 'DwzdDva', 'pIa8B3b0Aw9Uia', 'BMLZy2LLBNq', 'C29JAwfSC2HHCG', 's2TrEhK', 'rhbWAKO', 'zw50lcbPBhmGBq', 'pc9PpJWVAdm+', 'sgTeqNO', 'z0TtEvy', 'igvZDcbHDxnZAq', 'wKHSz1K', 'swDuAK0', 'ENr3vLm', 'C2nIy3K', 'sw5bChbcCM93CW', 'BxbxD3y', 'tLLZt2W', 'jMf1DgHVCJ0', 'zxfXuuC', 'pJXIpKH1Bs4UlG', 'vfbpvNG', 'B25JAgfUz2u', 'tg1pseC', 'l2PZl3rLBgvNCG', 'EuDlshq', 'zMvTvfu', 'EMLsrxK', 'EwXSt08', 't2TIywG', 'BYCGCgXHy2vOBW', 'DgvYiq', 'DfLqsw0', 'twvTyNjLihjLyW', 'rMTwEuq', 'DgL0BgvFy2HLyW', 'ChvZAa', 't3jVsLm', 'zt0NDgv4DcCGAq', 'r3vIuNC', 'yKXts0K', 'yxrFy29TAwnZka', 'vhuGDMfZigfPBq', 'BMHrD1i', 'BfzytM8', 'AhjWvuK', 'zv9JAgfWDgvYia', 'DhjHBNnHy3rPBW', 'BwDFBg9HzcCGCW', 'tgvJDgv1CIbVBq', 'ELv1yKW', 'EhHRvfG', 't2zHqM8', 'zxn0igjVBIe8lW', 'B2zMC2v0tgvMDa', 'whzlAfm', 'uezSt0q', 'C3pdQwvZ', 't0fTyxe', 'l2K+pgi+', 's3fQChO', 'uKXwz2y', 'u0vQBKi', 't24Gzw5JAghdRM4', 'Aefwtve', 'wLndDNu', 'CLnVANC', 'u0vmrunuigLKla', 'zxmGCgX1CYbJAa', 'AKnUthO', 'u3PRDMy', 'zxHLy3v0zvnXBa', 'BxbKy0m', 'mxWWFdr8mNWZ', 'qNbHtei', 'yMfJA2j1DhrVBG', 'x2nHDa', 'wevlt2K', 'CvvxreO', 'q2XHC3nLDxiGCG', 'ugvHsu4', 'q29ssfC', 'Dufmvw4', 'vM1kwha', 'tKffsLe', 'DKDtDgK', 'AMHnBeG', 'whfvD0C', 'A2rcv1m', 'y3vAAMC', 'zgv2AwWGkdiPlG', 'revsiejzigLKia', 'ifDirvjficHJBW', 'yvjwz3i', 'yw5Fy2f0jZ48Aq', 'quXurviGvefcta', 'B01SyMe', 'CcbZzxH5', 'DxjHCYb2B3vSDq', 'zg1ptMq', 'DxbFywXLCNqGlG', 'yuP5DeO', 't0DRvei', 'z2Tnuxa', 'B3LPs3a', 'yLPOuLa', 'B25ZzxmGkhmNAq', 'zwnVBMrLCY48lW', 'u2vPz25LDxiGza', 'C3LUB3bZAxm', 'q3LLuwO', 'DCoPidKWig5VDgu', 'yxHSzw5NDgG9jW', 'DhjVCgH5ic41CW', 'yu9jEwe', 't24GEsb2yse', 'sufrDxK', 'EMzoz2q', 'tgXgDK4', 'qYDLC3qGDMLKzq', 'rg5ku08', 'v2v2vKO', 'DfvWqxK', 'ihvUzsbJyxtdQwC', 'DgLUDwvZid88lW', 'C0j5q2XHC3noyq', 'wvzYCxa', 'sNbnDLu', 'B1HMvhq', 'zMfKzwzHzguGmq', 'vKHmAxq', 'idaP', 'rNvAsg8', 'we1byu8', 'EwvMqLi', 'tCoPBw9PCMvZigq', 'zfzhrgC', 'sfPgt1C', 'AuL0quC', 'wMXhrha', 'vM90W6NdQCoPiq', 'sgjRvLi', 'sKzhr2C', 'igfYDgLZDgu', 'Dg8LjsuTjsuLsG', 'rvvcs2y', 'veXVt2q', 'pgK+mdWVAt4', 'qLvKqwO', 'A3vez1m', 'ExHOwee', 'jZ48l2rPDJ4', 'Aw1Nl25VlwLUDa', 'ieqNywjVCMqGCG', 'CKXnyxu', 'otaL', 'DgTbuK0', 'Aw5N', 'zKP4B3y', 'AgzQBfK', 'wKHUywO', 'zhrIwfi', 'AgTJvem', 'rgrhr3G', 'yu1LELq', 'veLPzwS', 'Cw5rC2m', 'seLmEuu', 'pJXKAxyGy2XHCW', 'DujNB3O', 'vvHpu3m', 'D2j2DxC', 'reDhy0i', 'ue15wfy', 'rejmrNq', 'txjms0W', 'z2XUww8', 'vgnjzM8', 'ihbVDxiGy29TBq', 'tgDJt3e', 'wxjOte8', 'zvnxD0e', 'CgfZiq', 'BNfQreW', 'zLD3r0u', 'BgrLs1u', 'Cg5SCMO', 'C3bHBL9TzxnZzW', 'vu1OB0e', 'jIm4ntK0oW', 'v3nxD1i', 'q3zez0S', 'v25fveW', 'ieiP', 'BLLOBum', 'uK9nignHDgvNBW', 'v2npzKS', 'wLLOvwu', 'D290A1u', 'quTAruq', 'zgLMAwuGy2vJAq', 'C1nHzLa', 'sMuGzgLZihn0BW', 'vuH2EhC', 'yLrbC1m', 'igzPBhrYzxm/', 's1jjD2u', 'CMvZ', 'rKfuC28', 'BLzQEw8', 'zgfYA19YzwnVBq', 'lxKGBgLZihvUia', 'zYKGC2nHBguOmq', 'ueHjEKy', 'mhb4ldaLkq', 'zwT0v2W', 'y0HTrxa', 'yw50', 'ic8GmIuP', 'v2rSvxy', 'zxzUBvq', 'EePervG', 'swXpz3q', 's1buvhq', 'zxHJzxb0Aw9U', 'qwHiugy', 'revmrvrfiezstW', 'zKrKC2q', 'qw9frue', 'EKzuCve', 'thbxr1i', 'EwHksxm', 'CMv0CMfPDf9JAa', 'v05UzLu', 'Aw1Nl2jVBY5WBG', 'yMHjr3m', 'yJ7WN5ITpc9IpJXPpG', 'BKHutu8', 'BLDuzve', 'B2Xos2O', 'sK5yveW', 'C0LjCvm', 'uKnVvfa', 'ndyYnLHKChPbrG', 'lNPPCa', 'ideWigfQB3v0CW', 'sw9AsMq', 'qMfZswG', 'y2fUDMfZq29UDa', 'wendzwy', 'BNrYBY5Wzgykta', 'DhPXAfe', 'DufLzK0', 'A2LKs1C', 'uuDiB3i', 'C2vAr2i', 'AxrLigzVCNDHCG', 'DgvJAgfUz2u', 'u0vmrunuie1bwa', 'DeLjBvG', 'DNf0zgu', 'B21Py3mOmsWGwW', 'Dg9kCgvN', 'r3bPq0K', 'B25SB2fK', 'Dw5vr1u', 'wgrdvei', 'pc9VChrPB24+ia', 'kdaUnYK', 'qvzPyMK', 'B25UywDLpc9IDq', 'rw52B3NdQq', 'BhfKsMK', 'yLLxBKy', 'r0joqKC', 'suPjwNm', 'zMfKzv9PBIaUnq', 'CMLlEwi', 'DxvAz2i', 'uLDzu0e', 'Ew55sMC', 'igXHieHHAw5L', 'DM5HvwG', 'sw5KzxHLmIa6ia', 'CeHqqKu', 'y2L1Cxy', 'BLnTugK', 'DgLVBIb2ywX1zq', 'ExH6Avy', 'wez1vg0', 'y2fzvKW', 'CMvWBgfJzufSBa', 'vLrpyxi', 'wK5PAKu', 'q3nvwxa', 'we9YAg4', 'u2Povui', 'nNW0', 'jMXPA2vZptaMza', 'u0DUr0C', 'y3rLDxiGkq', 'Dgziz0i', 'rhbnA2W', 'BLzTBee', 'CKrYz1O', 'DgzXzwm', 'js0LjsvfBMnVCG', 'BMzWB0m', 'Bg91lNbUzYC+pa', 'twLPBKG', 'igXVywrPBMC9jW', 'Cu9kA2y', 'Bwf4sgvPz2H0', 'yxrlyxG', 'CKHYzNe', 'zvLQEwq', 'Aw5KB3CUB3bLBG', 'Axy+', 'rgLLDsbKzsbSyq', 'C3nPBMf0zxvYia', 'BcHPBwCVC2f2zq', 'vhuGyxmGBhuGnW', 'yKj4rMq', 'tNnjAhO', 'qKPlyLm', 'Ehv6Dfu', 'B25JBgLJAZ0NyW', 'ug12tfG', 'D0zdCMm', 'vuj1twG', 'y2XPzw50wa', 'tujOuLa', 'zvfHuKy', 'z3PWyLq', 'Bw5QsMm', 'twrRt1i', 'CeTfz2G', 'u25uweC', 'ELvqyxm', 'zLjiCuW', 'jZ7dH2eGDMeUlJW', 'D2jlsgC', 'uwzxq3C', 'pgGZpLr1ignVBG', 'ierVzNvZ', 'ANrbCuq', 'DwLZCxvLihbLCG', 'CgPvuM0', 'zxvYCW', 'AMHyAKu', 'DMfSDwu9jZmNpG', 'sMnrDui', 'wMLPs2S', 'q0TuELy', 'Bwv0yxnFD2vIDa', 'vgvYCMLIBguGua', 'y1nNCg4', 'ExLprwK', 'yxjYyxLIDwzMzq', 'ywr1y3rLDxiGvG', 'Bw5uDe8', 's29LrMy', 'B1jmyvu', 'CM9IBmoOBwuGzgu', 'sgjZu20', 'tNjWqLm', 'ENPquey', 'rfLZuMG', 'B1rJv3i', 'ChjXCxu', 'ELvmvvK', 'At4Wpc9PpJWVCW', 'BxPusM4', 'uNPOtKK', 'A3vUyxe', 'C0TtzMi', 'ufPxvgW', 'y1zWD2y', 'zgvYBMLLCNnFBa', 'CgLJCMvHDgv1CG', 'ywDVEeq', 'tLLezLG', 'EMD1y1a', 'yLzKsgq', 'zxiGpW', 'psD0CM9WAhLFDq', 'quzlt3m', 'yKTcyw8', 'BuT1wKG', 'uvPSzxC', 'ksCGy2XHC3m9jW', 'yxbWBhK', 'wNjkCwG', 'D3bzzgy', 'yw4+pgj1DhrVBG', 'yMPprgC', 'ktTYzxnLDf9IDq', 'sKDIBuS', 'uhjVyMZdQg1Ligq', 'AxzFCgfZCYCGCW', 'B21PyYbmsu1jva', 'C1L6rva', 'tgeGDM9PzsbKzq', 'DxHXAMy', 'qxPqv3y', 'W6KGntaWigXPA2u', 'qKrbu0W', 'm3mGAw5MAw5PDa', 'lg5VBsXJB21PyW', 'C2vUza', 'v09ss19tvefurq', 'zgfYA19TywLU', 'psDUB2nVBw1LBG', 'r0LnuuG', 'ugXszwO', 'rgrNwfy', 't24GysddOcbKAxi', 'pgLTzYbZCMm9iG', 'CNtdQsaXmdaWigy', 'DePcAfi', 'AfLivhC', 'ihb0CZWVAt4', 'rhLHrK4', 'wxDQqw0', 'Duj1rMC', 'CvfVA2e', 'AM91Df9Hx2nHDa', 'C0jqyuG', 'wvL5zxu', 'BMrUs2i', 'BxjQCLO', 'qxb0yMK', 'twfYCxvLlvbHzW', 'CeLZB1O', 'yKvgwxO', 'v2jivKe', 'AwXNwhm', 'q29TBwvUDguGlG', 'CNrPiq', 'yuzoBKS', 'vKfcD0G', 'pgrPDIbPzd0NCa', 'r016sfu', 'BuzZDwG', 'B3mOmYKNignSyq', 'Bg9HzgvK', 'rLzOzMq', 'svHrEfG', 'uhbHAwG', 'qvD3tfC', 't09gC3i', 'uKftv2i', 'v29Mswy', 'D2L4rhu', 'v3rRz3m', 'rw5Zzw1IBgu', 'uerTCuW', 'zcGPjZ5tyxv2zq', 'r0TAugu', 'ug9czfq', 'x25VDguO', 'DfD4tvy', 'rxnlsgi', 'B3Dxu28', 'ywFdQsaZmcbMAwm', 'DvjHDuW', 'u1rpEe4', 'Dg9Nx2j0BG', 'q1vYvwi', 'AevxBNG', 'qMjbvwO', 'uMXzv2m', 'Dw5Zzxq', 'ignVBwLJpt8Gta', 'BfPNB0C', 'yNbkBe0', 'CcbhW6LUAwvZpc8', 'DKzzuwm', 'rMH2BKe', 'rKPSqwC', 'A3bttvi', 'BvfiuNO', 'EKnpB0C', 'iejPzw52zwLSBa', 'DenvtKK', 'BNnPrvy', 'uw5QyuK', 'zxjUzxqUCg5NiG', 'uxPRvgm', 'zgzZweO', 'B2H2z2G', 'uvjIBKS', 'vNf3wNu', 'iduWigfQB3v0CW', 'iezPy2HPzxiGBG', 'DxvPz1u', 'wNfeD2G', 'tLHXBvy', 'jMLKx2nOyxbPDa', 'vK16uem', 'DNHgsuy', 'Eez5zeW', 'suTUtvO', 'B3vYihrVAsa0ma', 'Bw56vvu', 'vxLcy3K', 'CMn5Exu', 'DxHHA0K', 'DsbnB25Kzq', 'EgjMtg8', 'tM9Xzem', 'tLP6Exa', 'ALzrvha', 'rLnOzgS', 'DhHsBhm', 'A0n0s0m', 'zMLNDui', 'odaWmcbJAgfWAq', 's2PXAxa', 'D2f5C1y', 'BffTz24', 'CKHNu3G', 'D0DhBhu', 'Awzbt20', 'yxvZDMC', 'l2PZx3nJCMLWDa', 'yuH6sM0', 'AxHxyM0', 'BLzRz3y', 'yxn5BMm', 'W4L0AxjLihvUiha', 'Bvjwtgu', 'pc9PpJXIpG', 'thvJA3KGq29PBG', 'vw5LihjLy2HLCG', 'vgvYBwLUW6K', 'Def1AK8', 'twvTyNjLigLUza', 'pc9PpG', 'uSoPAw5PDgLHBgK', 'uK1XD1e', 'revHr2y', 'ifDirvjfigLKpq', 'AvbNv1m', 'Dg9Uig9Uy2XPyW', 'B1HPvhe', 'vNnYrhm', 'vendqvm', 'C0j5vgfNtMfTzq', 'phbYB2DYzxnZia', 'tgLNAhqGwwfNyq', 'BgXwBxy', 'qvvmvcaWkq', 'AxHbwNC', 'pYbpBIb0zsb0CG', 'zg93BMXVywrPBG', 'wuHzq2m', 'mZGYshjLugzc', 'zvvkEu0', 'sKnPD1q', 'zvvYBuC', 'v1PowNq', 'wLzNEMS', 'whfqrum', 'vLncDM8', 'z2DmDLC', 'AvvxugW', 'zw50zxi', 'zxrABg4', 'BwLUpsCWjYbTyq', 'EhD3tvG', 'zwXHBMnLigXLia', 'ihnVBIbZB3vMzG', 'zg5ID2S', 'tLDbExu', 'CMfWCgvSx3nJBW', 'zwT2A0W', 'q1DlCLO', 'BgvUz3rO', 'DK1jAw4', 'CK9czhG', 'A0Hyyvm', 'A2fouui', 'ruv6uLq', 'zgffrxy', 'rwXMDNe', 'qKL4wvG', 'CMnLihf1j2LSia', 'zMfHC0S', 'uvnRDKK', 'yxDiCgS', 'tLDxtKK', 'ChbSAtWVAdu+ia', 'Chv0ihr5Cgu9jW', 'C2uGBcDHChbSAq', 'u0z2zwK', 'CZ0NyNrUmIC+W4C', 'DcCGBwf4BgvUzW', 'uu5Tze4', 'wxn1rKW', 'AwHxDuW', 'BK1LA2e', 'A2LoEKG', 'serKwe8', 'BMq6ihvYBcHPBq', 'BwPkB2W', 'C3bLy2LHBhm', 'A3vTwLy', 'BMjYzv9JCMvLyW', 'u2HZsxC', 'ueDnBhK', 'AuXfu3G', 'wvH2AMe', 'sKzOELi', 'wundAKO', 'AM1ot20', 'W6KGmtaWmcbKAxm', 'rfbYzve', 's2rXA3i', 'BM90AwzFDxa', 'rKrLz2m', 'swnqB1K', 'ruvuzve', 'DgvZid8', 'BKXou24', 'zgnkugC', 'qxbWDwLLihbVDq', 'uxPhD3K', 'vevlsMG', 'tNzAv0O', 'tKnNshu', 'msKGB3bHy2L0Eq', 'r29SieqUifjVzW', 'ltjWEcWT', 'BMjYzv9ZAge', 'At48l3nWyw4+pa', 'zwj1Dc5Wzgykqq', 'DgHPCYWI', 'B1fPuuy', 'yxrLDxiUietdQhm', 'reDyvwC', 'tvDzyMC', 'BgLZDcC+pc9KAq', 'u3vvExm', 'q1b3EwG', 'u3PWtxC', 'DMvJigXHihb1yG', 'wfnhsfG', 'zsbj', 'ueLLEue', 'zsbZDxbWCMvZCW', 'CeXmu0m', 'D2nqufe', 'ufvxtuW', 'BhvZ', 'whf0qKC', 'ntaGy2HHCgL0CG', 'AgjqzLe', 'txn4u1q', 'r0jlyxC', 'CeLNt2C', 'mZC3me9AzfPiuG', 's2TzzKe', 'qLLhvfK', 'AKXduLu', 'qNLjza', 'BMjYzv9ZDxa', 'ExrAAfu', 'ChjVz3jLC3mGDG', 'rezTs1y', 'BIbYzwnVBM51ia', 'CgjuCNu', 'otaWmcbJAgfWAq', 'q2zMwKy', 'yvvRCLO', 'AeXwvfm', 'yLLdrue', 'psDJywXJDwXFyW', 'yu90AM0', 'vhuGyxmGAw1WBW', 'y3Dlzw8', 'sfjev3i', 'qK1XCNK', 'veXxvMC', 'tgPLzLu', 'DeHMyue', 'BezmyNu', 'vhuGDMv1EcbWyq', 'C3zjEKG', 'BwLZC2LVBNm', 'qxzMvvq', 'qwrjAKy', 'vuH5uMe', 'AwnOAwvYCW', 'CYaUnZvZigzVCG', 'BgD6uuK', 'tYbJB21PyYH0Aq', 'yNrLBNvZ', 'tw9PigPLihqNyq', 'svbPz20', 'BMnhChC', 'AwmUkIbguK9nia', 'uuXXCuS', 'qw52B2y', 'AeXkDMe', 'CMuGzM9PCW', 'B3bHy2L0EsGWkq', 'B25JBgLJAZ0IDW', 'y3vhDgS', 'AwjjzLq', 'Bvbxt0m', 'z2v0uMvZCg9UCW', 'vxnYBKS', 'whnbtwu', 'wLLws1u', 'AxzFCgfZCYC+ia', 'BIbTB3qGzguGCa', 'B2KH', 'sNvRy0y', 'AwvUDc1ZAgLMDa', 'wgPuu3K', 'u1nzB0G', 'CMLLifDirvjfia', 'B2LSDge', 'D3L0uKG', 'quTWyLe', 'B3jPzxm', 'yLbuEeS', 'uuj3zK0', 'rxj1Dwm', 'rhDJwhm', 'yK9hDvq', 'yMLlANG', 'nhWXFdj8mhW1Fa', 'mtfUvhjdzvq', 'BvrnqKy', 'DvjxyMG', 'q29TBwvUDgf0zq', 'At48At4QifBdQxi', 'wgnzrw4', 'y0DuBKi', 'yu9SANm', 'zLjstvC', 'wvvRD2m', 'C29UBMuGBMuGBq', 'C3rLBMvY', 'BufMAfy', 't05osNK', 'u2vrvLu', 'ExbVuxq', 'CKXdy1e', 'CgrMx2nOyxbPDa', 'vvDmtgS', 'C1rJzM8', 'B0LOBu4', 'v09Kqva', 'zhuGBwLSAwv1', 'uvfsufm', 'D09yvgm', 'q0TYthG', 'B2jSW6HTzq', 'qLrtBKe', 'v21myMK', 'DM93v3C', 'EwTYDKK', 'zgL2x2LTywDL', 'uwH0Egy', 'qKvJtwi', 'wNz3wgK', 'zgHJAee', 'v2ncrKq', 'BIbVBMnSAwnRpq', 't2DxwvO', 'mYC+tgvZihbSDq', 'uwr4A0y', 'CJ0Nq29TBwvUDa', 'BMf2AwDHDg9Y', 'Ev91BMXVy2TLza', 'CIbYzxrPCMvY', 'AgvPz2H0', 'DwvSBgvTzw50ia', 'C0j5tMfTzq', 'wgLRzMW', 'zw50zxiHpc9Ona', 'tLmGyxzLyYb1BG', 'BvfHtw8', 'q1byCNy', 'vwTNsw8', 'q0TivgO', 'zxjZihvUzsbJyq', 'zw1LBNrtAwjSAq', 'ugntzgW', 'wLjMzNG', 'DKzRzvO', 'zt0/ieXjtuLuia', 'vMfWDMu', 'ltjWEcWWChGP', 'ChjLDMLVDxnfBa', 'rungwgu', 'DMrUAxK', 'sMHhr0q', 'W6KGnZuWigXPA2u', 'uxH3sgC', 'zfflBMC', 'yxr0jYbTyxHSzq', 'tMH2yw8', 'v0HfuKuGkgnVBq', 'z2vYkcKNpJXKAq', 'y2f0x2rVD24GlG', 'B3bHy2L0Eq', 'AffdAuu', 'yu5cz1a', 'ue1ewNq', 'z21ss28', 's3rVsvi', 'CwndEvq', 'te1wsKO', 'A3jjC0O', 'vuHWt1O', 'Bu9gAeW', 'AfzQB1G', 'Cgz0vgy', 'udWVyJ4SimoNysa', 'Bwf4', 'CeH1ENO', 'zw1LBNq', 'uwnnAwe', 'qMDov1C', 'igrLihbYW6LMW6LY', 'zvvwAMC', 'qvLLquG', 'ExvhwuC', 'uuLOCwq', 'DhDmrLa', 'C2HVD19KAxzFAq', 'Aenmrxi', 'tun0t3m', 'seDJr0i', 'ven0Bfq', 'zgvJCNLWDa', 'jYWN', 'DwDZsgG', 'ExrTy28', 'uhrsv1G', 'u3f5CeW', 'D09bDvO', 'r1jyrLu', 'EfPOy3K', 'AMD6sKi', 'qxbWCSoPy2LL', 'CMLNAw4', 'uMTYwK8', 'vcDHCNldQNrLCYa', 'ieqNywnJB3jKpa', 'kcDODhrWCZOVlW', 'svfgzMO', 's25KANG', 'zMvYEKu', 'veLOuMK', 'tuHPB3O', 'yNrUmIC+W4DHihy', 'jM5ICMvFDM90zq', 'CNHhyMG', 'uwPLBvO', 'CMn0wfa', 'zuTIs1e', 'sLvODKy', 'B2fKzMfPBa', 'u0jqDLG', 'tu4Gzg93BMXVyq', 's2f0D1y', 'yMXVy3nFBhvZ', 'yMrmt2G', 'Dg9Nz2XL', 'B3vxv0G', 'yxj3Cw0', 'Aw1Hz2vFCgvYCW', 'B0Xyrvm', 'vhuGyxmGBhuGnG', 'uwTJzeq', 'Avn0rhi', 'ywDLkhrOAxmP', 'rvLQrK8', 'DLDZt20', 'rLnPCwi', 'B3v0', 'jYbTyxG9jW', 'sgvdtwO', 'BwfW', 'rNDfDKq', 'vfL6txi', 'r01pt2W', 'r2Dcz0q', 'y29TAwmSy2HHCa', 'DxbFAw5MB193zq', 'rKfJBNq', 'zd0NzgvSy28NpG', 'EKLUzgv4', 'mtKXnti0oerhB0DuAW', 'uhn3ruW', 'BeHvDuG', 'pYbbtKqGy2HHCa', 'qKnKDhK', 'zw1VAMLZ', 'A3DQyMy', 'y2LluKm', 'y2vIB29RywrZ', 'ic4YnxmGzM9YDW', 'wefdtNC', 'whHsyLC', 'yu9cvw8', 'yurvvvy', 'C2vZwKu', 'uNvIEq', 'EvjHtKq', 'B3j0zsbVW7KGCg8', 'Aw5UzxjxAwr0Aa', 'ldiSj291DcCP', 'tvflt1m', 'pc9KAxy+idXKAq', 'qvvut0Loq1jftq', 'DwffC1e', 'EMzTEMG', 'C2HVD19PBNb1Da', 'CejLB0S', 'y3flDNm', 'kgLKksbHCYbJBG', 'C0LOEg0', 'v1D5DLO', 'pc9PpJXWCM9NCG', 'ChjLBMqGmtaGCW', 'rLjptsbJB21PyW', 'DxDbB1i', 'u1H2Afq', 'De50qNu', 'mhWXFdj8m3W0', 'B3vYihrVAsa2nq', 'BwLJpt8', 'vvfvDui', 'zsbSysbmzwn0Dq', 'DgnSvwe', 'vLHfDMu', 'DfDwtvC', 'u0vmrunuigvTBW', 'C3rHDhv0', 'z1flAeO', 'su1LwgG', 'sKr6Cge', 'pgG0pKvUDhjLia', 's3bIyu8', 'Ehf6s1K', 'DLjOBeu', 'EwP6uNi', 'vhuGyxmGy3ldQCoP', 'yMPHuMS', 'ue5ns1u', 'uuTizhy', 'r0z1u0W', 'DwTnChq', 'uffOuvG', 'DcbMywLYzsbKzq', 'AxzFC3vNz2vZDa', 'BwLJqNy', 'AwDVBeO', 'C3bprgy', 'zNjzuKO', 'Bw1LidXIpJeUmq', 'jsCGFhWGpYb8Fa', 'uwHoEhK', 'tgLRW6K', 'r0DRwe4', 'vejNug8', 'EwjIBei', 'qNjysKy', 'yNPkquy', 'phnWyw4+pgK+', 'BhPNyvK', 'Dd0X', 'tg1iBhm', 'u1DyBNy', 'ChtdQq', 'igzVCNDHCMrZla', 'CgL0CMu9pW', 'CgvYC29Fyv9ZDq', 'zwLSBguUCg5Nkq', 'Bg9JywXOB3n0lW', 'tgXqywW', 'AMDtvLG', 'CLjuwvm', '8j+sQIbby3rPB248lW', 'tezsq1e', 'DKPVufO', 'yxfQD2K', 'CMD4Du0', 'su4O', 't05KENy', 'D1vcBfy', 'yw50AwfSAwfZ', 'Dwrrt04', 'qLjdvNK', 'BM90zsKGvKfmvq', 'ChjLDMLVDxntAq', 'wLzYuwi', 'y2XPy2S9j2vTBW', 'BIb0CMLZDguGCa', 'DMzRCNm', 'wLjWzM8', 's0njwvu', 'B01UuLK', 'wuvQyNq', 'zxrVEfe', 'wM9RBw0', 'D0rtC08', 'D2f4ELC', 'u01hBeq', 't0POBwm', 'lgXPzw4Sy29TAq', 'DwX0CMO', 'wfDkze0', 'odi2odG2nZq3oq', 'Cgn6Cvq', 'BuTuD00', 'yK5breG', 'Dvr5r2e', 'BMzlyvq', 'BwLJifDirvjfia', 'DMLZ', 'B25Z', 'tunXwge', 'zuvmC2O', 'yLfkzui', 'txD6wgm', 'qLfzy20', 'vKDqtvK', 'y2HHCgL0CMvZia', 'C29Z', 'zwj0yxv0zxvYpq', 'v0fZB0O', 'yw0TD2LKz2v0lG', 'vLb5z1G', 'teDRtLO', 'wwv1EcbsB3vNzq', 'rNfswu8', 'vKfsq0HbuIK', 'EeDMA0G', 'q1vLAw0', 'sLrRuw0', 'q1DjDfu', 'AKLStxy', 'DhjLpt8GteLnsq', 'q2jTrg8', 'DxjSkgLTzY9LBG', 'qvrHC1e', 'sMvWvhe', 'qLryEw4', 't2z1u3a', 'Cgu9j3bHC3n3BW', 'pgiGy2XHC3m9jW', 'mhWZFdr8mxWY', 'mhb4', 'uxvLBhf1zxmGyq', 'z0LYzeK', 'B0jhtgy', 'wefPCvG', 'igBdOMnOzxi', 'su5trvjuieLova', 'Dw94veO', 'B25JBgLJAZ0ICG', 'tKzJtLy', 'Aw1Hz2u', 'zwHoBwC', 'BwfNzv9ZAgfYzq', 'yuvWr2K', 'sxLpvuu', 'Bg9uDuC', 'B25Uzwn0zsC+pa', 'uK9nignOyxbPDa', 'wxblEhK', 'zuDXA0e', 'BNLJq2m', 'idi1ignHDmoPz28', 'AwLxrvK', 'EMXLENm', 'Cw9jBNu', 'ExPksvO', 'z3jVDw5Kkq', 'y2HVAxHFCgfYDa', 'BgXLDxiGrhvVpa', 'q215A2S', 'q29UDgvUDc1uEq', 'ifbPy2vZ', 'Aw5WDxrMAwXL', 'wgHMuu4', 'ic8GnYuP', 'wM9KqNu', 'vuTTrfa', 'DguGCgXHAxjL', 'zgPzufu', 'AxHJwwe', 'qLzRD2C', 'zM1ouLu', 'yxnZzsbPy2KNpG', 'tMPkCem', 'y3DTCvO', 'zwLSlI4U', 'CLnNyMO', 'rgXHB2u', 'ENPxEuC', 'DhjHzhvJDgv1CG', 't1nhCLa', 'B2jQzwn0Awy', 'D2PrsNe', 'v2LHAMq', 'v0HLthe', 'sM1SBMW', 'BwvmAhu', 'tgvVuKG', 'tvrut2e', 'AxmPjZ4TlsbsW6K', 'se1dBLm', 'ENPywgy', 'iePHy2TWB3q', 'C2HHCMvZ', 'zgTdwMW', 'BIb2ywX1zt0Nmq', 'u0zsqLu', 'tcDbDMv1z2XLia', 'rMLHD2K', 'r0vu', 'C3r5Bgu', 'reLZwum', 'BLbQr3O', 'z0z6CuC', 'ENvsBuO', 'y2fUy2vS', 'DxPhvKm', 'Axj3thC', 'y1bNthG', 'tMXqwfm', 'rKDlz3u', 'msCGC2vSzwn0zq', 'qMT6qKS', 'rMr3zhK', 'Aw5PDgu', 'ALDrqNi', 'z3H4Cxm', 'DgHPCYW', 'sufTzgm', 'rvLlC2q', 'CMvZDwX0', 'CgfUpG', 'BxnmDMy', 'wufxAum', 'rsbJAgfWAxrYzq', 'zxzMD0G', 'yxjLzcC+idXIpG', 'Dxr0B24+pgj1Da', 'EujkBg4', 'EMH4Aei', 'zxnZignSyxnZpq', 'vfLgwNa', 'B25MAxjTW6K', 'C1PiCvq', 'D0zPs00', 'sePmy0S', 'BNrZ', 'lI4UCMLLBIbKDq', 'qLbMz3m', 'uNnNywW', 'z01cC1O', 'rfvJsxe', 'yxbWzw5Kq2HPBa', 'yvvPwuq', 't2H6tfq', 'yxPwzhK', 'zwDVCMLLiezstW', 'B25JigPLig4Nyq', 'CNtdQsa1mdaGzMK', 'uNjXtuq', 'ENrksgK', 'pYbxsevsrsbPza', 'ug12uNa', 'wLHWDeO', 'zLbdAum', 'tuL2rvG', 'CM9REMG', 'DfH3qui', 'zsbHChbSAsbJBW', 'AgTgEhq', 'tYbJyxrLz29YAq', 'rwPWA08', 'CgfUpJXZCgfUia', 'ENvczxG', 'sfvOvum', 'CMuGlYbfEca6ia', 'v29tsxu', 'BND4t08', 'y2HLihbVDxiGBW', 'BvjxBKC', 'EMfgDMq', 'DLLVreq', 'ze1jwhe', 'twTlqxO', 'zxmGCgX1CYbIyq', 'yNztqNu', 'DhvYzq', 'y2XLyxi', 'r0fqB0G', 'yMHdDMS', 'yNbgyvy', 'y29UBMvJDgv0BW', 'ug9qEei', 'AxmPjZ4GphnWyq', 'swnWt0G', 'v09qtxm', 'pt8Gqu5eignOyq', 'CNDer0e', 'sMvPrfC', 'z2vUzcC', 'tLvZC04', 'DMX2uLi', 'z0rZr0W', 'yNv0Dg9UpJWVCW', 'rvHju1rtignVBq', 'tu9ksLG', 'EuvXyvq', 'nd5pBIbZzsbJBW', 'vhuGyxmGCgfYDa', 'CMfNzq', 'EhHRDxq', 'BgnlAgy', 'y2XHC3m9j3bYBW', 'tvPyqu8', 'CYbPBMzPBML0zq', 'msz3zwj0yxv0zq', 't1jerviGqLKGAq', 'DKDwDLu', 'qNvWsMW', 'Dt0Xkq', 'z2uGAwnP', 'wenesg0', 'C0Dnyvm', 'wMrMqNm', 'vhr6Dem', 'rLzyBxm', 'Dg4YjYbPzd0NDG', 'Bwnfww4', 'q3ldQwf0zxvYigq', 'EKHzuxy', 'A0nfsxK', 'r1D0uMO', 'j2vUCMvNAxn0CG', 'jZ48l3nWyw4+pa', 'tfrVBNa', 'uLPtqwu', 'u2jlDeG', 'whDNCw8', 'vuvwDxK', 'vw5SDNq', 'zM9JDxm', 'DhjVCgH5x2nOzq', 'pc9IpIa8At4', 'D3LMswq', 'ugzJufm', 'zgu/', 'zM91qxC', 'rMHJrwe', 'DKDbq0W', 'uuXYCfm', 'uuXlDee', 'rvmOpYW/ld8SpW', 'y2nkBvK', 'CwDLy1y', 'wNjUB08', 'B25JBgLJAW', 'r0P1wwG', 'pc9ZCgfUpG', 'vhzlu0y', 'C2XPy2u', 'z2v0u1zh', 'EePnAe4', 'DwDcv0e', 'pIa8Adu+q09qsq', 'AM11DLK', 'vw9tzNG', 'ChfOrKO', 'reLgBMG', 'wKn0wee', 'wxjAtxi', 'ue9Iqwm', 'u2f5AMi', 'zgfYA19WzgzFyW', 'twvZC2fNzsb2Aq', 'sMrnqKK', 'Aw9UpIa8B3b0Aq', 'DMv0Dw4', 'B0f1Beq', 'x3n5C3rLBq', 'y2XHC3m9j2LUza', 'ugLSzsbVDsbgyq', 'yvLrCwm', 'EMDgt2W', 'EfHMDwm', 'yvnNuMu', 'Dg1Pt2u', 'DhjVCgHLzv9Yyq', 'BLbWzgO', 'BM90zsXKB3DUBa', 'qvHXyxG', 'rvPhDvG', 'C3bHBL9Yyw5N', 'vhuGyxmGywn0Dq', 'Aw5PDcbMywLSzq', 'yLjtu2O', 'DgHPCYWTmsK', 'D05xBxe', 'z29NvLC', 'tNrktfe', 'ACoPiduWmcbJB20', 'rwPzuxe', 'vhuGyxmGBwfYCq', 'EfPzBvy', 'tLnUB0m', 'l2j1DhrVBJ48yG', 'j2vUDM95zxiOlq', 'pg9WDgLVBIb2yq', 'zhm8l29WDgLVBG', 'z3vzA3y', 'sg5quuy', 'rsbJB21PyYbbra', 'DhLRr3i', 'W6KGDw4GzgLZBgK', 'yxrLz29YAwuGvW', 'BMjYzv92B3rL', 'yMXVy19JCMvLCG', 'z3z6q0W', 'wNvfBhm', 'uxvLBhf1zxmGDq', 'A3jcqKS', 'Avbeuva', 'vhuGDMv1EcddQNq', 'yw5Niem', 'ksbUBY1YzxbLyq', 'CgnAr1m', 'lNbPCgK7zgf0yq', 'ywLizxa', 'tenNqLC', 'zhvmEvO', 'u0LjA2C', 'y25jCfO', 'lcaN', 'vMHArgW', 'Aw5WDxq', 'CvLgC0y', 'EhH2CNK', 'wurqt3a', 'rxLdD2q', 'q0vTv2G', 'CMvJB21TCW', 'DNDQBKO', 'uxPTzfq', 'EhnJAuy', 'ihbVC3rLlwXLCW', 'idaSihbYAxmGsq', 'vxLnyKS', 'ueDWuxu', 'u2KGBgeGseqGyG', 'DMPUBwW', 'B3vYihrVAsaZma', 'B2DSzvG', 'wLrADum', 'DgvZDa', 'Dhj1yY4UlIbbBa', 'vLHKA0q', 'pc9IpIa8C3bHBG', 'm3W3FdL8ohW0Fa', 'B1jyv0m', 'zw50', 'ChjLCgfYzxjFCG', 'vhL3ywe', 'wwjbAwG', 'AhHtqNe', 'ihnVBNqGBgvZia', 'tgLICMfPCMu', 'BNb1Dcb0ExbLpq', 'CIbJB21Tzw50yq', 's1rKuvG', 'seH5zNK', 'vgHiq1K', 'sLvytu4', 'ChjVz3jLC3mTyG', 'BIbWzxjZBW', 'BNLMqKK', 'EeD3u2y', 'y2S9iNbLCNnVxW', 'yxbSzNO', 'zLLQyLq', 'wNrkz2W', 'CgXHDgLUDw0Gka', 'C1jsDLO', 'yxr0zwLUDa', 'zMDQEhG', 'C2zzAwe', 'swr1zvy', 'BhvXAu4', 'DxbyugG', 'tK9ZteK', 'yMfJA2DYB3vUza', 'yxvSDa', 'EM1IrxG', 'qMLIBgLVDgJdQwm', 'C0DMBxu', 'B2LUCYH0AgLZkq', 'z2neCgu', 'pgi+iW', 't09svxa', 'ywFdQsaXntaGzMK', 'qvbwD0q', 'CwzZs2C', 'mZu2otG1v0XcDNfV', 'BMvnze8', 'wvbuqMm', 'y2XPzw50wq', 'DhjHy2u', 'Au5gyNq', 'q09vtLqOkIKGyq', 'BwvUDhmODgHPCW', 'rw5YzwDPC3rYzq', 'rMr2EvG', 'DKTls3u', 'B25Uzwn0zxrVAq', 'ChbQrgO', 'vM16wvq', 'B24GB25JBgLJAW', 'DuTnC2u', 't3bxAwK', 'Aur4s0q', 's3bJB3G', 'zurJzKq', 'BNjlz0i', 'zMLSDgvY', 'u2TLs1a', 'uuPQt3O', 'B3zWyuq', 'wgHNz2S', 'y2uGpW', 'yxjKCW', 'uMnQCNu', 'tevmANC', 't29QEKO', 'B2vwDwO', 's3LnrgS', 'zMvYBwvYx2i', 'EwnTzhO', 'rM10wgG', 'zMvLza', 'ze9vuKW', 'y0PhwLu', 'CZ0NDgL0CMuNpG', 'q2fKCNi', 'DMrNthG', 'A0Hpzfq', 'pc9KAxy+', 'D2DgBfe', 'yM9qEgW', 'CKjgvKy', 'BMn3B3O', 'vu94ChC', 'zwDVCMLLksbwqq', 'rLDjwMC', 'Dg9FD2HPDguGmG', 'tNbgCwS', 'suHwq2C', 'uKHvAM0', 'y2HLihzPzguGyq', 'Evbrvfe', 'rNDQtxa', 'zevur2m', 'A1f1q3q', 'BwvUDwj1DhrVBG', 'Cw9KBMq', 'DcC+tw9KAwzPzq', 'zwzVC2G', 'CNDHCMrZigvHCW', 'sev4AxO', 's1fAvfy', 'ug9IANG', 'yKDzAgm', 'uNz0A0W', 'zgfYA19KB3DUxW', 'rvzJvgy', 'BKj6v28', 'uSoPCg9UzhmGW6aG', 'ALPnuuK', 'BNb3rKe', 'u8oPCMLLDxG/pW', 'DgL0CMu', 'teTet2q', 'AgzVr2O', 'BgjHCe8', 'lJeUmsaRifDbuG', 'Dxrfzgu', 'DxmGsu5uruDfuG', 'rMLJAgLLCIbPBG', 'uMjUtMu', 'BMzPCM3dQq', 'z2uOksCGAwq9jW', 'B3v2CMLYx2f2zq', 'AurSB2K', 'zMLSkhrOAxmSmG', 'z1bTBNe', 'z3jVDw5KmIK', 't3fYq3m', 'D2DnBuK', 'shngz2O', 'AhjAEKC', 'rvDtt2m', 'vw1pENq', 'wenQD1a', 'tKzvtLO', 'ALbfy1O', 'uLrxAvi', 'ztWVAt48l3nWyq', 'yM1eELm', 'zwvKx2XVywqNpG', 's3HNvKG', 'sxbxvwO', 'z05gq00', 'yxffsgO', 'lNbUzYKGntaLia', 'uLzhq2q', 'zwj0B29UBwvTzq', 'D0TcsvK', 'rerJywW', 'zgfYA19JAgfWAq', 'wKX6qLG', 'Dg9VBNm', 'CePkrKe', 'txLoDfC', 'EMfMD2m', 'C2LNBMLUC3vJyW', 'tMP0u0O', 's2rJEMO', 'DuL3rxm', 'Euvdvgi', 'mhWXFdr8m3WY', 'BM90zsbguK9nia', 'BfbAz0m', 'C2HVD19JyxrFyG', 'sw1Hz2u', 'z2n3v0e', 'zw1VAMLFyMfJAW', 'BNrwshO', 'tguGAgfZyxjKia', 'vw4Gzg91yMXLlq', 'A05Srwm', 'DgHPCYKNpJWVza', 'whbuwhe', 'twnwwNG', 'y29UC29Szq', 'zYaYCYbPBMzPBG', 'uMv0AxldQq', 'yujzC0m', 'qvnd', 'wMz4vei', 'tw1Iv1u', 'BhnuB28', 'y1Diuee', 'qvbIvgS', 'ignOyxq', 's1v3B1K', 'rKf4A1m', 'tNztBhe', 'yK5Vsg8', 'psDIywnRx2LUzG', 'BM1PBvi', 'r0rICee', 'r0L5t0W', 'zMTnzuu', 'rMfpsNi', 'EKHwvvG', 'AwTLCW', 'r3LrCxy', 'uxbgA1C', 'AeHvvg4', 'zxzSuKO', 'EuHds20', 'v0DJAKe', 'C2vUDa', 'Dg9fsK8', 'A0HyAMS', 'vKzcBLG', 'CujKr1y', 'jYbTyxG9jZeWma', 'B2KGpW', 'sKDLDuC', 'ELzdwKu', 'BMzVCYGZksCGyW', 'CMfUA19TB3zLia', 'vvbvwKK', 'DxH3A00', 'vw5nCxe', 'y2XHC3m9j3bSyq', 'wwrlswm', 'yxmGy29TBwvUyW', 'wLPTEvm', 'pgG0pKvZC2fPzq', 'EenTywK', 'sKX6vuy', 'Bhjptxe', 'Cg5jsw8', 'tcDHCNrPC3rLia', 'q2P1AfK', 'rgDLExi', 'A1jJsu0', 'js0LjsvqzxjZBW', 'Dg9tDhjPBMC', 'zNzbA1y', 'yMX1CIGWChGP', 'Exzdsg8', 'rxnZywLL', 'wwPuEeW', 'nduLidq1jq', 'zxbHCNqH', 'zgL2x3bHCNrHzW', 'wu9syK8', 'lsuLjxr1Dg8Vza', 'DMr6qxi', 'DNzuDLu', 'Dwu9jZeWjZ5qBa', 'Dfbet0S', 'whrAwLC', 'v2X0ywC', 'zMvLzf9SB2fK', 'whncsKe', 'DhrRCuS', 'CujTuem', 'y3z3shG', 'twvhsfC', 'Axz4rei', 'y3ldQCoPzq', 'AhvT', 'sw5hAwq', 'txfbsue', 'pgGZignSyxnZpq', 'r3PjDMK', 'wK90yKi', 'EMLkwva', 'y0vTq1q', 'zMfPCNKGkdiPlG', 'Cfvsvu4', 'sMvxEhC', 'DgfIAw5KzxG', 'qwTosvC', 'wuPtu3m', 'EhrbzLu', 'DK14BuK', 'tfjvvwO', 'y2f0zwDVCMLL', 'CIbtywnYW6K', 'uvPLrM8', 'yxvjwxa', 'vvbeqvrfignVBq', 'z3zLDfG', 'BgfJzwHVBgrLCG', 'DuDeC2q', 'CNtdQsaXmdaGzMK', 'sfjjweC', 'ywXPzgvYx2nHDa', 'v2HZsvi', 'Aw5PDa', 'tNbzAg0', 'wfbjAgm', 'yKzcz1u', 'rKzrq3C', 'uMXuDuS', 'igzVCNDHCMrZ', 'EgHXB2C', 'suDNEfi', 'B3fVAMO', 'Ee5KBwS', 'BwvUDcbpsW', 'se5gu1u', 'mZuWmJK4zKjgCw5Q', 'ue10rwK', 'C3bHBJ48C3bHBG', 'AwDODcWGDMfYka', 'BMzVC19ZAgfYzq', 'Cw5NCwm', 'DfDuELm', 'vvvpzMy', 's0zvswq', 'qwrmB2fKzwq', 'y29UDhjVBhm', 'quXnrKi', 'yxbYzxm', 'BM9Owe4', 'DMzWvNi', 'v2vdAvy', 'igvUihrHz3vHBG', 'rKLerxi', 'BJ48yJ4', 'wwrzrK0', 'v2vIDg9VBIbuDq', 'whv2que', 'BMjYzv9PBxa', 'rNPnthG', 'BMnSAwnRpsDIyq', 'zd0Ny29UDMvYyW', 'uK1lyNG', 'p2vUDM90zt0XjG', 's1vXy3K', 'r2jXEuy', 'BM1LBwvZlZm', 'AwnRpsD1CgrHDa', 'shrjrxK', 'r0TQuuO', 'y3Phv1C', 'D25SB2fKpt8GvW', 'uNj3sKm', 'vwTOuLK', 'r2niEKm', 'ihzVDgvZpc9PpG', 'zMLYC3rdAgLSza', 'AsbKW6LQW6aGCg91', 'uw1Nq0q', 'wvzbwKO', 'DhjLCYbxsevsrq', 'ruvkEhu', 'zfvdD0K', 'mhWXFdj8mtf8mq', 'mdCZmJKWotC', 'vK5csuO', 'reXeuNu', 'DeXdq2G', 'DwvYCMK', 'BgHnsfy', 'yuL3uuq', 'ufjXt3i', 'DgvSzwnOyxjNzq', 'v1DAEKO', 'DhrVBNmODgHPCW', 'CLzosfK', 't0TZqLm', 'zxbNAvq', 'zxqGBgvZihldQxa', 'rvLZEue', 'igzVAxm', 'CgfUpIa8l3nWyq', 'twPtt1i', 'mdaWignOyxbPDa', 'reTODNm', 'zMzPy2HLihrVDq', 'swfmELi', 'r2TPu1C', 't3ndsxy', 'yvPizeG', 'txvSDeC', 'ifDirvjfigLKia', 'ywX1zt0NncC+ta', 'y2HFywnOAwv2zq', 'CMvgDw8', 'D2r3suu', 'sKP5ufK', 'jZ48l2rPDJ48lW', 'AxbZyxG', 'B2fKksbwquXvrq', 's1vbthy', 'B1nqveO', 'yuD1wfC', 'DevlCw4', 'vhuGyxmGzMfPDa', 'rwPhv3K', 'EhPWCgu', 'B29OtNG', 'AfP4z1a', 'ndaYnZC1mY80nW', 'BezgCwG', 'BxnerLe', 'C3rHCNq', 'twLZzsddOcbQB3u', 'uhv2BK4', 'BMjYzv9SAwTL', 'zuHctMS', 'vhrJB2G', 'y1bcrKm', 'z2v0rg9JDw1LBG', 'zuznD2C', 'AwKH', 'su5urvjorvq', 'ywrTz00', 'vevhrviGrevgqq', 'D09sCuO', 'yw5Jzq', 'CMDIysGYntuGmG', 'ls0Ljs0T', 'uhfQveW', 'sgvVrhu', 'r0vnqwy', 'uK9nignVBwLJia', 'zxf4EeK', 'Bfz1whi', 'sLfHrfu', 'DfLny1O', 'BgfZDeLUzgv4tW', 'pgj1DhrVBIbVBG', 'BLnotei', 'ChLHBue', 'uKrfluXfisbqyq', 'wKXXzfq', 'zujWB2S', 'v2vTz3K', 'v3z2r2C', 'BLrQvLm', 'sgLMEeS', 'zgPxAwu', 'BwX3u2y', 'uKuGy29TAwm9pW', 'ldaP', 'C21zBeq', 'BgL2Bgq', 'uwjYC3i', 'rvrdshG', 'whL1zK8', 'j3rPDhjLjZ5nBW', 'r3r6qMq', 'Awq9pW', 'Dg9UCYC+pgj1Da', 'D3LIrMS', 'B3bLBG', 'CgzluNC', 'zw5AB0W', 'rtiYrJm4', 'ENjXuwW', 'vhzMDgq', 'shDhAwG', 'CKHTv1u', 'sLvsDLC', 'z1bTEvm', 'qxuGChjVy2HHAq', 'AwnPjZ4Gpgj1Da', 'uhnQuuW', 'DJ4Gpc9KAxy+', 'rufZzM8', 'ANbeEuK', 'uKTrExu', 'B2zMC2v0vg9W', 'C1b0reC', 'Aw9UihzHBhvLpq', 'CMvZCg9UC2u', 'EhDXwwu', 'CKn5wuC', 'r0DdsMS', 'idWVB3b0Aw9UpG', 'CK10ExO', 'zhzdv2u', 'D29or20', 'z3n3uxq', 'AvfKCuK', 'EMn1ue8', 'vhjnDum', 'CgfmtfG', 'quDID1i', 'zw50CMvYzgvKyq', 'rgPiq2q', 'ugLJvLa', 'vuXuida', 'CMvZB2X2zuXVyW', 'ywn0Aw9U', 'x3nOyxjLza', 's2rvC3i', 'vg9UihbYzw1Pzq', 'CMfUzYbbkq', 'wxfwrK0', 'z3ndEuq', 'yxjNzw50', 'tgT6ANm', 'u1jivLC', 'y29TAwmGlJm1CW', 'CMfUzYbckq', 'zxn0ywjSB2rV', 'pgi+jIm5nJu4oW', 'zLPzsgq', 'u2ndwwK', 'rLrHrMu', 'wuPcr08', 'ignVBM5LEgLVBG', 'B0f4vKK', 'thvJA3KGthvRzq', 'BI96Axa', 'ntaWigfQB3v0CW', 'zwXSzw1LBNqGpa', 'Bhnrwhm', 'zwj6sKG', 'Dg90ywW', 't3ncr24', 'Bwf4Awq', 'EwXpvum', 'yxnHsKO', 'AuD1qMm', 'A0TpyK8', 'qxvMCvK', 'y1bzC2G', 'yxnfwu8', 'tfr4sMi', 'yNv0Dg9UpG', 'v2rMA2e', 'BLDxB3G', 'AgndsNG', 'Chb5Evq', 'wezNzvm', 'BMjPyxu', 'DhjJDMS', 'DcC+pgLTzYbZCG', 'uK1hDxG', 'CYbJBNqGrLjptq', 'txfLBwu', 'A2fpDve', 'wNnfDKq', 'EuHLrMG', 'ywrKrxzLBNrmAq', 'CMrSvhK', 'jMX0oW', 'jsWGCMDIysGXia', 'Awf0DxjLlgX1CW', 'DMzjzwy', 'uMLIDg8', 'Aw1Hz2vFC2HHCG', 'C3bSAwnL', 'DfnnCvO', 'DLfPt2K', 'A2PPA1y', 'uhnhuM8', 'j2nSyxnZzw1LBG', 'zgTeENC', 'rfnfDLm', 'C3m9j2j0BJiNpG', 'DgfNzxjFCgLWAq', 'ChldQhmGBguGzmoP', 'p3bLCNnVpteMDW', 'sfnMBeu', 'B25Zy3jVBgW', 'rwPpB3y', 'A2vZ', 'tsbJB21PyYbxsa', 'r3bQDue', 'C2DSsxa', 'm3WXFdr8mhWY', 'AhvLBwW', 'uu1WBgG', 'tvDNwxi', 'DcbKzsbYzxnLDa', 'DNfguLK', 'Aw5UzxjuzxH0', 'BwvUDgfPCMvZ', 'zK9RA2e', 'veTOvui', 'yK9RCLe', 'tuP1sge', 'DfDnywC', 'qvmGBw95zw4Gza', 'AwnZiezst00GyW', 'BgfWDwi', 'ELHmt0u', 'qvLcCeq', 'BK9Tq0K', 'tLb2DK8', 'sLzxr1G', 'jYbPzd0NDMfSAq', 'Dvf4sfO', 'zMfKzxiODgHPCW', 'tfjhDwm', 'vuHSrNC', 'DhjVCgHLzxnFBW', 'rKXyvuO', 'D3zPtMG', 'rhnysNu', 'z1n1te4', 'BgvMDa', 'igrVD25SB2fKpq', 'v3rHzee', 'BMXXy3m', 'D0jWC2O', 'CfzAuNq', 'z2jnrgC', 'icCLjYK', 'wKXbCK4', 'sLP3u1i', 'q0TUqKK', 'ExnvvM8', 't1jkEgG', 'qYDLC3qGCMvWyq', 'tM1oCNK', 'reDdsKS', 'C3LruuK', 'CYbTB2KH', 'ys4Upc9IDxr0BW', 'pK1LAwXSzxvYCW', 'CerRzfa', 'zxvvwMu', 'Cgv0AxrLihjLyW', 'pc9IpG', 'revsiejzicHJBW', 'tLD1t0K', 'BIbJAgfWAxrYzq', 'jNf1B3q7', 'qvvmvcaNmsC', 'sg9RywDL', 'EfH4qxu', 'AxmGDg9Uig1VDa', 'u2riv28', 'Bgv1tMG', 'CM91BMq', 'Bwf0y2G', 'ENDKDuO', 'zNjHChbLCIe', 'zcC+pc9KAxy+ia', 'pJXZCgfUig9UyW', 'AuLVwgS', 'qNbMzgS', 'zwvZ', 'DCoPiduGBM90zxm', 'AxjgzLK', 'Def4svi', 'ChrPB24GDMfSDq', 'yKDJCfK', 'ANDvCwS', 'rfnxs0O', 'CgfsuNu', 'BwnSvgK', 'r2zIrNq', 'zw52B3LLCIGTmq', 'zfnut0u', 'CMvHzefZrgf0yq', 'zxiGDw4GCgvYCW', 'lsuLjxr1Dg8VAq', 'AuDgyKC', 'BKrpCw4', 'C05rq3m', 'CMv1CG', 'C1LiDw4', 'CKvpD3y', 'rgPsB3y', 'AxrYzxm', 'tgv0j3mGr28H', 'sMuGDguGy29UCW', 'W6KGnJaGBgLRzxm', 'ELr3DM0', 'wMHurem', 'BeDVwg4', 'C1rzvMu', 'B0zPvKu', 'CvrMB2G', 'CvPjEvK', 'yuHyweu', 'yNr1zw8', 'suj1rxe', 'rKDxDey', 'BwPtsu0', 'mJaWChG', 'wvD6C2y', 'p3zVDgu9mszPza', 'rgLZBgLRW6K', 'x2nOyxb0zxjFBW', 'CM90yxrLkdbKzq', 'rcbdt0Xvtu4GDa', 'DMfSDwu9jZKNpG', 'sfbgsxi', 'qu1pyLe', 'BurUzLa', 'wKTXsfa', 'su5duKvnru5ula', 'zsbxsevsrsbPza', 'EhjVwuu', 's2Dsy1C', 'Bhz2rKi', 'Cwfbz3C', 'tezPCue', 'v0HfuKuGAwqGsq', 'iZjMmZy0ma', 'vwrXB1u', 'zeT3u1K', 'rKXdz2q', 's1D1C2u', 'uMzkq28', 'zLziquS', 'zw1VAMLFy29Tzq', 'EKrPthO', 'zsH0AgLZldyPjW', 'AKXRv00', 'ihf1zsbSzxmGzW', 'AfHtCfa', 'sNnHAvq', 'BMrQCwS', 'whr4v3y', 'u2nivLy', 'ANz6Efi', 'uwrRDvy', 'zw52B3LLCIG', 's3D1A0y', 'y2eTyxbWlxb1yG', 'rg9RzLi', 'y2f0ka', 'mdWVAt48l3nWyq', 'AefHrKS', 'AgLKzv9PBNb1Da', 'twv0CY10B2KGyG', 'B3jL', 'wuPWzwS', 'z0rtwxq', 'uK1Yy1y', 'mtaWigfQB3v0CW', 'igvHC2uTB3v0', 'z2zdEvm', 'vMjoy1K', 'yvHnvxK', 'B2T5DLK', 'Aw1Nl21LzgfSlG', 'EvLYquW', 'uunYrfq', 'rMzHqui', 'DIbPzd0NzgL2xW', 'ugvYC28GywPVDq', 'vujAwKG', 'zKfzr2G', 'Dgv4DenVBNrLBG', 'CKfnr20', 'u2rvBNK', 'wg9Usfe', 'vKTqqwW', 'idXZCgfUpJXIDq', 'v0HfuKuGkhrPDa', 'BMjYzv9JB20', 'mJaWmcbJAgfWAq', 'igf1Dgv1CJ0/ia', 'y2S9j3zVDgvYka', 'vg9WieLKAw90CW', 'sw50swy', 'idXPpG', 'mti4mtKZoYbpW7K', 'z0nVBxK', 'B2L3sKG', 'EuPRsNe', 'ifqNyxmGDw4GCa', 'kgLKksbHCYbTyq', 'C1LWs2m', 's0jjs3q', 'AxHYtMO', 'ruPxyu0', 'EhqNigLKpsDLBq', 'AeDqCeK', 'C2nHBguO', 'sxnwDwC', 't0vMrgu', 'tKfMENm', 'C3m+pc9KAxy+', 'AxrLBxm', 'tNrju1e', 't3vWCY4UlIbqCG', 'sNzmDM4', 'ugv0AxqGChjVyG', 'yxbPDhjLpt8Gta', 'q29TBxvUAwnHDa', 'r1zSEKm', 'j2nTDf8', 'zKXxsxi', 'AeHJDM0', 'BhDPrMS', 'rg96zuy', 'Cu1oz3C', 'qvPmyLC', 'q3HVy1a', 'BKrcENy', 'Aw5MBW', 'EhPpwKu', 'wxf0zNe', 'zgL2x2jVDhrVBq', 'ic8GmIuPihvYBa', 'DhjLlhn5BM9WCW', 'twLhtMS', 'yxfPu2y', 'yNv0Dg9Uig9UyW', 'rxPqy0i', 'r1jrvLm', 'C2fJCMvKicGYkq', 'qvjdsefsierfrG', 'wvbutey', 'j2fMzMLJAgfNzq', 'Bw1LBNrHAxjLlG', 'mdaGzM9PCW', 'CMXSquu', 'yKrXweC', 'DKTxDe0', 'ic41CYbMB3j3yq', 'vvDlDMK', 'CMHmEum', 'zxbVBMrYzsGN', 'C3bHCMvUDca0ma', 'yxrLz29YAwuGvG', 'BwTcuuS', 'vcaX', 't2SGq3j5ChtdQq', 'ACoPiduWignVBw0', 'zfbdzeq', 'wMjlC1K', 'DhjLyw07yMfZzq', 'B3vYihrVAsaXma', 'wuTdqwi', 'iduWignHDmoPz28', 'CvrMzgm', 's1DkuKi', 'rhfVv0S', 'pgK+', 'BKPbBeO', 'C3vWzNC', 'BMjYzv92B3q', 'twfV', 'y3rL', 'zwTyzLm', 'sMPysxG', 's2Xbrhy', 'yxHgDNq', 'CNvYuMG', 'Bfj1wKy', 'wgX5v3K', 'vwfHzxy', 'vKfsq0HbuIXZDa', 'wefjrhu', 'q0zAwwu', 'y0nHqw8', 'tLLyuxm', 'rg9YW6K', 'igf2zwmGDw5Lia', 'whPIzLK', 'v3ffBwu', 'qNPhz2q', 'rgPbyKq', 'q1HkuM4', 'CNjdv2G', 'EKrNBMO', 'sLHvzKm', 'Dxn4wgm', 'wM9Pv0u', 'yMTkwuK', 'CMfUA2LUz19SAq', 'CwjbBvm', 'ywLYzsbeAxzPBG', 'Ad0NmJu1jZ48CW', 'BhbMBu0', 'CLPxAfi', 'DgPovKK', 'u1v1tvG', 'Bu9oqui', 'wfbAELa', 'zw5Kx2rVD25SBW', 'uMLUBMvNyw4', 'CK14yu8', 'zxbLyxq', 'A1vMAhe', 'ANHrr3q', 'C3bSAxq', 'qKXewvu', 'CwLPsxq', 'BufzqNy', 'vw4GCgv1ihrYBW', 'BMC8l2K+pgi+', 'weHXqwW', 'wNLds3e', 'lxjLCgvHDa', 'uxDZCgS', 'zgvYpsCWjZ4Gpa', 'lNbUzYC+pgi+', 'BMDXELK', 'r3bhBha', 'nhWWFdf8nNW4Fa', 'tw9xDeK', 'pt8Gqu5eihrYyq', 'AgfUz2u9iMnOyq', 'qNvjt3i', 'y29TAwm9pW', 'B3v0zsb1BMuGBG', 'thDPDuC', 'EMLgve8', 'tNbxuNi', 'vKnkB1a', 'vfnRDxm', 'DhjHigrVBMmGBa', 'D1nts2m', 'ru5ulcbJAgfWAq', 'vhLXC2y', 'CYHJAgfWAxrYzq', 'vMvdr24', 'C2Tmqvq', 'EhDQvLG', 'BhvZig1HCNjHBG', 'q2DnyNe', 'END0Eu4', 'CMzbq00', 'Exn3sfu', 'icbHy3rPB246ia', 'z2fYzgvYpc9IDq', 'AxPfu20', 'yxLdCLm', 'BeHwB24', 'uvv1EK4', 'z29KicGYks5WBG', 'weL2twO', 'yNv0Dg9U', 'sKzcBg0', 'BIXPzcXKB3DUBa', 'DgfIBgu', 'B24Gy2f0ywXVzW', 'DwTby2q', 'DeDftNG', 'q1PNwxO', 'DunSwvq', 'B2Tvwgm', 'zxiGC3vYigWNyq', 'DMPUChi', 'C1fOvhq', 'CYCSj19ZExn0zq', 'zg9nsva', 'vhuGDMfZigXLia', 'B0DfzMC', 'tMj4req', 'rgXWtLa', 'EuHdAvq', 'C2jnue0', 'y2nyruq', 'v0TRrLy', 'zcbervnd', 'CYWWksC+pgj1Da', 'se1pve8', 'AwnRpsDLBw9FDG', 'BfrUDgS', 'C3rLlIbdzsbTBW', 'ugr1su4', 's0HStw0', 'BwvZC2fNzq', 'rvzqEw4', 'ugzZA1O', 'sKHOuwW', 'DwjqzMS', 'zNDgwfu', 'zvzHwwW', 'rNrpvee', 'ufPyCxq', 'z0Pvz08', 'B3jftuy', 't1fxtLy', 'uM5UwNK', 'q29UBMvJDmoP', 'qxnZAwDUyxrLDq', 'u3fru28', 'CMLTW6KGmJaWmca', 'uezgCKy', 'EvjxvLe', 'zw5MBYPYW6LZpc8', 'y25Iueq', 'vhPSseO', 'Dgv1CIC', 'CKrVDve', 'zgL2', 'uhnxqLm', 'CIbHAM91DgvY', 'z2TyELi', 'C2vHCMnO', 'iZi3m2m3nq', 'Ad0NmJuNihbSyq', 'BMnSAwnRpsDYyq', 'AKDxtvi', 'DMfSDwu9jZe5jW', 'DMfYkc0TyMfJAW', 'Dg11qw0', 'vgzqAwS', 'BgrMr3q', 'DffVBeq', 'Exnzveq', 'zK1NvxK', 'CMLTW6KGmsb0B28', 'DeXUD1q', 'suXeBwG', 'D1b3vLm', 'mti4mJiXoYbbAG', 'jYbSB2fKAw5Npq', 'l2rPDJ48l2rPDG', 'vLDPDem', 'EMXksw8', 'ruzmDuy', 'yMfJA19ZAgfYzq', 's0fqu3u', 'C2LNBMLUzMfPBa', 'u1jlwKy', 'yu5xtKe', 'zxPUthi', 's2DYrgy', 'ihbHC3nLpc9Ona', 'uKXUwuK', 'W6LZzw50', 'CNHTC3y', 'BIbPzd0NCMv0yW', 'jYbWBgfJzwHVBa', 'ywFdQsaXmdaWigy', 'vw1LwMG', 'y2XhEwu', 'Awq9j3zHBgLKzq', 'yKvQyNq', 'DwroAfu', 'r3DrtwO', 'thjfCKC', 'qvjryva', 'BM9Tx2nHDcCGBq', 'BgveDfG', 'ugfZigf2zwmGBq', 'vhuGzMfPCYbXDq', 'j2fTAxrPW6K', 'B1Lsru8', 'ruPgs00', 'ALL1D0S', 'y2XPzw50sgvPzW', 'B1vAAKq', 'tgXHzK4', 'BLj3rfC', 'y29TBw9Ut2jQCW', 'ignHDgvNB3jPzq', 'thP6uwu', 'ELP1uMm', 'EvHjBuy', 'l2rPDJ4', 'DhjPBq', 'yMXVyG', 'DKPPA2O', 'uxLkAuO', 'vKfsq0HbuIXKzq', 'suTZEMm', 'y2S9j2jHy2TFAq', 've9cwgK', 'zezKvxy', 'zsbMB2LZ', 'ChjVDg90ExbL', 'z1DYEvy', 'zxjpChrPB25Z', 'sNHzDMK', 'rLrqAK8', 'BsKGvKfmvuvtka', 'z3btrha', 'EfDnqKK', 'ywrTB2iUAw50zq', 'C3bHBIbZDhLSzq', 'vMrrBM4', 'rLvIv2C', 'jZ48yJ4Rpc9IpG', 'CMDbv3G', 'uu5Qs20', 'DhjHBNnMB3jTtW', 'u0TtCMG', 'rvLhEKy', 'CK1pC2e', 'CNLbwe4', 's2rJD20', 'AxPvvKq', 'vg5bqwW', 'quHJAum', 'yvHfs1e', 'sefvte0', 'B25quM0', 'Dg9W', 'qwrdBgLJA2vK', 'CxLkBha', 'seT2Exi', 'y29KzxbSyxLMyq', 'pc9WpJXKAxyGAq', 'A0z3twq', 'BNrPvuC', 'BNvuuMC', 'y25OqNm', 'jIm4ntKYoW', 'DgHLlxn2zW', 'yKD5yLe', 'vcDLCYbZW7TYpW', 'ywFdQsaZmdaGzMK', 'rsbJB21PyZ0/ia', 'zwLmywS', 'rNjmEuy', 'sNzIA2K', 'FhWGjYuNksbpuG', 'we9Vy1a', 'u3v1Bvy', 'vevjr00', 'Bw56sgi', 'uevRsey', 'AZ0NDxbKyxrLxW', 'C1zMBNa', 'ACoPideWmdaGy28', 'q1fdD0G', 'tvvvu0y', 'DgvTjYKIpMnLia', 'B3jKid8Gpc9ZCa', 'r0DTr2q', 'zt0NyNv0Dg9UjW', 'wenhz0m', 'Aw5MAw5PDgu', 'CKPJq2G', 'yMfbveu', 'BNDKsKm', 'AwvUigf2zwm', 'tgeGCxvHBgL0W6K', 'pc9IpJXPpIS', 'AwnHDgLVBIC+rq', 'zxjHigf2zwmGDa', 'qvzND3i', 'BM9gBw4', 'zufeDNa', 'y1zVsKO', 'B2H3D0O', 'qNfbA2G', 'y2vdyxzLyxq', 'zhDSDMu', 'CeLUB1a', 'vxrwAwG', 'vKH2wLi', 'zxjZBYC+idXIDq', 'C3bMDwm', 'vxDbBKe', 'ENzMExm', 'uLfbtxO', 'yLz2zwW', 'wg5RBNq', 'y3buwuC', 'Aw5Uzxjive1m', 'tvHywgC', 'ywXLkdePigjSDq', 'ru1VDhC', 'tLflvuK', 'DvzxDLa', 'BgvJDhvYzq', 'qKHqAxi', 'At48At4QievZCW', 'lNbUzW', 'vLr6v1K', 'pwX1CYSXifDirq', 'q29SBgvJDgLVBG', 'DgXqqui', 'yuLtqLi', 'y29TAwnF', 'EgHuwgm', 'r2Tjv1O', 'zw56ywy', 'mZ48C3bHBIbJBa', 'uwrbCwy', 'EhnKtKO', 'icbLEgL0oIa', 'y2nHyKy', 'Adm+', 'igrLihBdQxjPzMK', 'seriuuS', 'DKXvqNu', 's1vXt1O', 'DNzssfi', 'su1jvcaX', 'zw5JCMu', 'Dwu9jZe1jZ5uBW', 'C3vRB3j1', 'pYW/ld8P', 'ALH0Cwq', 'ChjLCgfYzxjFyq', 'rhzPsMu', 'r1reDfe', 'rwfYtwm', 'tfvqwuS', 'B1nwzxO', 'ywDLCL9LBw9QAq', 'ChngEvu', 'z0v1Exm', 'Bgz2Cvu', 'AZ0Nzw1Vx3zVDa', 'EfzLquO', 'y3jLyxrLt2jQzq', 'zg93BMXVywq', 'zwXSB3vSB3u', 'C2vSzwn0zwrjBG', 'rxGGoIa', 'tgXwwwm', 'zNL2DNy', 'twhdRNrYzsbbCMm', 'EMLW', 'BwLuq1K', 'AfboAKe', 'CvrzExu', 'A0D3tNK', 'twXqDKq', 'yM9YzgvYtgvMDa', 'BLHnDe4', 'uNDnuMm', 'Bhjuq0G', 'uNnVtum', 'y2f0xW', 'wu9uq24', 'DKTVA1q', 'BurzBxi', 'Ee9Kve4', 'rcbJB21PyY5SDq', 'CxvHBgK', 'A3n4BxG', 'Bfz0AKK', 'sw7dQwjYyw5Sywi', 'zgf0ys1JB21Tzq', 'ANvkDvC', 'zM9YD2fYzhm', 'sfPlBLO', 'sM9osxK', 't2rwwgW', 'EfPcDgC', 'Dhbhwxm', 'r2jdrem', 'DMfSzxvY', 'yKTLDfq', 'ld8SpYK', 'mdaWmcbJAgfWAq', 'Dhv0BY4GtweGDG', 'D3betxO', 'mZrLmta', 'rwPguu8', 'y2vOB2XKzxi9jW', 'AwvVDLi', 'rNDJCLe', 'yKXhqu4', 'lxX8CgLWAsXRia', 'BNPOu2e', 'zNDPvfe', 'ruPkBg4', 'Ag1vCLK', 'Bg9N', 'vM9YCeW', 'DxjSkgLTzY90zq', 'DgLTzxvY', 't2rcy0K', 'yLHRz3e', 'CgLWAxDLyNrVBW', 'DMfSAwrLCL9Jyq', 'CMvXDwvZDfbLCG', 'EMzbCeO', 'D1LsrKu', 'zxn6ChK', 'yNrUmICGAwq9jW', 'sgv4t0m', 'ru9tzLm', 's1fRuLy', 'rMrxvhu', 'rvjoB0O', 'y29TAwnZ', 's2TjwKi', 'uMPeyLK', 'weXiAgG', 'jM5VBv9WzxjZBW', 'ACoPidC1mcbJB20', 'y210xW', 'vKv4zwu', 'sw9Zy2C', 't1P1Bgu', 'pJXZCgfUpJXIDq', 'qxDpz0W', 'y29UBMvJDmoP', 'BenNCee', 'BvDZBMS', 'uhldQNrYzsbKzsa', 'p2nOzwnRzwq9', 'zMfKzv9HBMLTzq', 'quDXt20', 'ALrvwfa', 'quzvtem', 'EMvprfq', 'ww5Ryw4', 'BNDQywG', 'l3nLBgvJDd4Gpa', 'DL9PBwfNzsH0Aa', 'refACeu', 'BMqPidaLia', 'tvzgzLm', 'CYbxsevsrsbJBW', 's2LPzeW', 'C28GCg91CIbSzq', 'W6KGDw4GBgLRzq', 'u3rHCNq', 'uLnbtvi', 'BMjYzv9OyxnHCG', 'y0rurK0', 'zwDVCMLLid0GpW', 'zxH0', 'tgvJDgv1CIbdBW', 'tvLiqxy', 'rvjsrvvsierfia', 'B24GDMfSDwu9jW', 'z2zvuxq', 'DNLwzwW', 'ugv0AxqGy29UCW', 'ugfZigrHBNmGDa', 'W6KGntaWigrPC2W', 's2PpEKi', 'zv9JAgfWDgvYxW', 'z2u9j2nOyxjNzq', 'v3LXzhG', 'rg1sALe', 'jMLKx21Zz19JBW', 'zsbuzwXLz3jHBq', 'EfDeywe', 'CNn0AxrPywWUBa', 'reX5tgK', 'AhLfD00', 'qM5WrwC', 'EvDNtuW', 's2TnrfG', 'vejlv08', 'pgrPDIbVBMnSAq', 'C2nYB2XSvg8', 'B3j3yxjKCW', 'y29TBwvUDhnZ', 'Dg1cyvq', 'DeTLuKu', 't0rvrhi', 'CNDHCMrZ', 'zMXPCcaXCYbMBW', 'quPfq2K', 'r3vduxa', 'zt0NocC+vg9Wia', 'DK1bAeC', 'zwDVCMLLifnfva', 'AgfWAxrYzq', 'BNnmA2K', 'ruTPAxi', 'AKjstgC', 'AwTNu3u', 'yxv0Ag9Y', 'CMPrB3m', 'vvfkBxC', 's01oDg8', 'DercrMK', 'BwfRDLK', 'zxPZwhe', 'A1zeqxO', 'BMjYzv9SDxm', 'sfvIs3K', 'Bfngtvq', 'ugfZigrLihldQxa', 'Ce5Xs0e', 'txbcrLu', 'wfjLshO', 'AxmP', 'wLvPtLi', 'vKj4BvK', 'DhrVBL9TzxnZzW', 'qLvcDwW', 'uwjlEvq', 'CvL2ruK', 'EhHmCNa', 'q29UDgLUDw9UCW', 'mJi2lteXndiWmW', 'sfPgvKu', 'whjpvee', 't1Puvfq', 'rKjUsue', 'vejnD3G', 'vLb1Eu8', 'vg9HAw4', 'uwfyrNm', 'C3m9j2j0BJiNia', 'wfPgANO', 'tLLUr1i', 'vvHxqwe', 'z3zbtvu', 'zw5Kx2n0CMWOkq', 'otbWEca5mhb4', 'EwTPr1K', 'zxr2uuG', 'D290D0i', 'zfriCwq', 'Bu9Azuy', 'q3bPzMK', 'vND3rK4', 'vfPbvxG', 'txvlt3a', 'rhvpDfa', 'AurdAgO', 'CvrStha', 'CM5quuS', 'AvLTDMC', 'Cg9YDguGDw5Lia', 'AfvdC0G', 'yKLJAw0', 'Cu9YC1G', 'EgjRv0K', 'CMPvrMq', 'Dgv4DcCGAwq9jW', 'm0XcBfvtEG', 'ywqGmNmGzM9YDW', 'CK9QqMq', 'Dwjbuvq', 'CYbSzxmGD2vIDa', 'yvPbveG', 'zMfKzv8', 'u0vmrunuigXPzq', 'EgTit1O', 'yNrUx3bPCgK', 'psDKAxzFCgfYDa', 'wKjovvq', 'rxjcvLe', 'ywTwBfi', 'y3rVCIGICMv0Dq', 'CgfZihbYW6P0', 'wgDPuui', 'uhnAzMi', 'yLr1Aha', 'Bg9HzeLUDgvYCW', 'A21Ay0m', 'uxrOswC', 'zvznqKO', 's0PnDgi', 'sKrqCfy', 'DuLWvKu', 'sKfnywO', 'C3zmt1u', 'wenjrNm', 'BLbZufy', 't0TOuNO', 'wxzWs1O', 'v1H0yLC', 'CMPlyKy', 'DM90zxm', 'renYBMO', 'u1HlsKq', 'DhjLifzbuKniqq', 'wgHSww8', 'zxHPC3rHBNq', 'q2HLzIbKzsbtzq', 'C2TUEg4', 'sK5XvLO', 'vxvrtuC', 't1fbzKi', 'tfrNt00', 'iIKNpJWVyNv0Da', 'vKPTvgG', 'CM9NCMvZCY1Iyq', 'sfDWwgu', 'sLH2yNy', 'y2HHCgL0CMvFyq', 'A3DRs0K', 'zw5J', 'wM1kue4', 'y3jkuxu', 'BNrZlwXPBwL0', 's3HIqMy', 'Bg5Juuu', 'B3b0Aw9UihzHBa', 'qxHTvfC', 'rg9hquO', 'qM1jr2G', 'AuXWAK4', 'yNzJBLG', 'zNLLDw0', 'CKXbt1e', 'wNz5y2O', 'Awq9pYbmsu1jva', 'EKPdt1q', 'vhjVDsboB2LY', 'BmoOBwu', 'AMDcyuO', 'seTrq28', 'p2nOzwnRpq', 'z1fnCgG', 'vxbnA3e', 'zxrSAg0', 'vw1gwxm', 'yNv0jsuLlsuLjq', 'yw5NDwu', 'rMPYy0e', 'wwrPAgq', 'svvbD2e', 'khrOAxmP', 'iemNzxn0ihrYAq', 'z1LkEhe', 'ywjVCNq', 'u1DpAwO', 'A2X2u3e', 'CMHyAgq', 'y0jRuMe', 'B3bHy2L0EsGXkq', 'swXYqMu', 'vcDLCYb1BIbMBW', 'BerKqxm', 't2fAy2C', 'C2z3Dha', 'Bgf6EsC+phnWyq', 'y2Dyzwy', 'BwXmDhy', 'vvvjzNC', 'ldeP', 'pJXPBwCGC3jJpq', 'uMHKD3m', 'qxuGC3vPDMfUDa', 'C0XyweW', 'sgPWyKK', 'ELbuBuS', 'DxqUCg5Nkq', 'CxvHBgL0zq', 'AxnOzvq', 'BgvHtfa', 'zgfYA19WCM9IBa', 'BIbguK9nignOyq', 'AxfUCxO', 'B3rzwNi', 'ksC+', 'p3jLz2LZDgvYpq', 'vgDewKO', 'Bufzufm', 'B29UCW', 'BgvMDf9ZD2LWzq', 'yKDSqMO', 'wfHzqLi', 'Cu9nC28', 'EhnXBw0', 'tfLzqKW', 'uvflBvu', 'ywFdQsaXmIbMAwm', 'rfzTtMm', 'y2rts28', 'y2n0qKy', 'CMv0zv8', '8j+yRUkaJtWVyJ48At4Wpc8', 'z1H5tgC', 'sMuGDcDHAsbKAq', 'Efjxzhq', 'u216tNy', 'vcDHCYb1BMuGBq', 'r0LPB1y', 'CMuNpJWVC3bHBG', 'uMLLBIbPy2KGpW', 'wxPRvw4', 'yxnZx2rPDIC+ia', 'jMD0oW', 'uKuGkhrPDhjLpq', 'Dxr0B24+pc9ZCa', 'y2TIqMq', 'q25uuNm', 'AfLrzfq', 'CxPTvNi', 'ihb0CZWVAt48lW', 'rg93DeK', 'B29U', 'EgHtvhq', 'CMPNteW', 'tcDHBM5PAgLSyq', 'qxbWDwLLigvUyW', 'D2nnwuq', 'Cg9ZAxrPB24', 'C2f0DxjHDguOmq', 'BwjHDcbKzxb1Aq', 'C2nYB2XSsgvPzW', 'zhzOs24', 'CNn0AxrPywWUCW', 'qwGHief1y3vUia', 'sLjhCvy', 'wNHRqLO', 'AuPSzuC', 'zsHPzcXLBw9QAq', 'rgLZy2LWBguGyW', 'tKrxzMW', 'rvfnuvy', 'Axy+idWVzgL2pG', 'tvzLrvC', 'Cgfmq1m', 'C2HYv1m', 'zhjYzM4', 'rcbJB21PyY5Pza', 'Dg1ktK4', 'vxPeq3a', 'CMvTB3zLzsH0Aa', 'Bw9FDM90zsH0Aa', 'CMuGteLlrsaNjq', 'EKjwyvu', 's2zmuu4', 'wu5Jr2K', 'sNz4tMG', 'C2PJvxC', 'CvPWA1e', 'B3vYihrVAsa1ia', 'u0jQrLy', 'zd0NBwvZC2CNia', 'B2XKzxi9j1rPDa', 'AxnSAwTLCZ0WjG', 'teP3B0O', 'CKHICKe', 'qMP5Egq', 's1n1shC', 'DwLPwMy', 'y0nXBwy', 'yMXHy2S', 'ze5vCNu', 'EM1Jvw0', 'rhPqvey', 'EMTqBue', 'D2vPz1q', 'rLbYt2K', 'Du1Lt3K', 'wgXkCM8', 'l2K+pc9ZCgfUpG', 'pgi+kZWVyJ5jBq', 'DhrWCZOVl2jPDa', 'Buj4tNG', 'mhWXFdn8mNW0Fa', 'zxuGBgvZigrVAq', 'sgnxseq', 'ksa1mcuGBM8TCG', 'qxzLyYboB3rLCW', 'igr1ig1PBgLLDq', 'v2vIDg9VBIbXDq', 'Evz6D1K', 'Cu9ADha', 'tcDHC3nPz25HDa', 'CLrnqwO', 'y2HHCgL0CMvZ', 'nJqS', 'AvnPyuG', 'vLrNDwe', 'Dhv0BY9MAw4UCa', 'y2XHC3m', 's1rTELy', 'yMLeAhG', 'rvLfEw0', 'Dgv4Df9UB3rL', 'pc9PpJXZCgfUpG', 'y0vREvy', 'Dxzlvei', 'wxf2ze0', 'sfnXwNa', 'vhuGyxmGC3vWCa', 'AezVu1e', 'wvnwDwu', 'vgHWBLC', 'BfDTyNm', 'CvDPr2y', 'ignVBwLJifDirq', 'ELjhC1a', 'q3nJrNa', 'seLLANu', 'B09ttKW', 'EfjtCKW', 'D1LishG', 'BMv1CIaOCMfUzW', 'vxPKA3e', 'C2DmueS', 'zwDkDwy', 'u2ThCw4', 'sxv1yvK', 'qMTTv1a', 'DuPmtgW', 'pgK+ka', 'AevvC0u', 'vcDHCYbKW6LQW6aG', 'CxrhugC', 'rMrcANK', 'B2jQCW', 'CuLpzei', 'W6KGmtuGBgLRzxm', 'pJXIpG', 'ugfdr0O', 'BfL3r2e', 'mcbqAwnL', 'ue5ou08', 'ANPeEw4', 'v2X4sxO', 'CKfcCvG', 'qLLmz2G', 'ms4W', 'pgrPDIbPzd0NzG', 'CKDcuw4', 'y1DdzxO', 'vMPMv3G', 'CNnwCMm', 'D2jfrNu', 'EvfiEeS', 'Aw1WB3j0zxi', 'vKn1y3i', 'thn3Che', 'BwfYz2LU', 'qMz4vxK', 'ignVBwLJCYa9ia', 'ELjNAxy', 'qKvXA1i', 'r2LAzwK', 'mhWYFdr8m3WX', 'uKniqvi', 'u1zhr3jHCgHPyW', 'mhW2Fdu', 'se96q2q', 'whLdsvi', 'j/cFKQONihzHBhvLpq', 'EeDZq1K', 'qwn6qKW', 'Efz0Bu0', 'CvvQufG', 'zgvZDhjVEq', 'tM9Uig1HAxmGCW', 'Bfzpv1i', 'z1D1BhC', 'ideWmcbJyxtdQwC', 'vLbfwxe', 'CMLTW6KGmtuGDg8', 'tgHqCxG', 'Dxm8l29WDgLVBG', 'pgrPDIbPzd0NBq', 'wKzMyLG', 'z1fKEvK', 'CMu9pW', 'tLbJuKS', 'rMTYqvO', 'uvDPt08', 'j2fMzMLJAgvYxW', 'jZ48l3nWyw4+', 'zsCGB25PBNb1Da', 'wMr6tva', 'A0fsz0G', 'rfDrvMy', 'BNmOksCGDMfSDq', 'tuHxEuK', 'ig9Uy2XPy2S9jW', 'CKPrEha', 'CMLTW6KGnsb0B28', 'uertCuC', 't3vPAwLPAwLPAq', 'EMHSwKS', 'tcDPBNrYBYuLjq', 'wvbQq0m', 'r3PUBxC', 'tKHXy1q', 'qLKGAwqGrevtqW', 'zNvXBMW', 'q0HbuIWGC3LUBW', 'i0zfrJLdmG', 'EeXLqM0', 't3L2ruG', 'pLr1igfZigfJDa', 'y1PjzwS', 'zd5uB3aGv2fPzG', 's2rXCNy', 'v0TXy2O', 'BvLesui', 'sgX4uhe', 'sfbtvhy', 'BgntCK4', 'CuDVsuy', 'B0DUu0K', 'vK14CxC', 'tenMsfu', 'Cg5NjZ48l3nWyq', 'BMzwD1e', 'wMLPvLq', 'D3ntA3O', 'ywn6yuy', 'AwnrCNK', 'vcDHCYb2CMfPBq', 'CujeAuu', 'AuD6C0e', 'sg1TlI4UienVBq', 'r2vcy2W', 'ywrPBMCYlMDPzG', 'vxvkBKm', 'qLDmzvi', 'BuXUyxa', 'qKvHyuG', 'q0n1ELm', 'yw5FywrKx2LTzW', 'DK9TwKm', 'zwn0zxvYicGGAa', 'B24+pc9ZCgfUpG', 'Bw9WDwiGCgfZia', 'AM9PBG', 'zxHPDefWCa', 'tYbJAgfWAxrYzq', 'quz3EMW', 'C3Hvru4', 'uNf5EeW', 'jYbZDhLSzt0Nza', 'ignOyxjNW6K', 'rK9sAgq', 'sfDuyK8', 'DevsAeG', 'vMHiyMm', 'DKPXv1O', 'qYDLC3qGDMLLCG', 'yLjuDLG', 'yxbWzwfYic45CW', 'AgfZugvYBwLZCW', 'DgfYz2v0', 'BgTTt3q', 'vNjMAvK', 'wgnuBeu', 'yxbWzwfYx3vWxW', 'BvHurve', 'AezHzue', 'vvbqA3y', 'ANHAugG', 'tM5ytKC'];
    _0x2476 = function () {
      return _0x24e993;
    };
    return _0x2476();
  }
  var fichiers = [];
  function isBase64(_0x15cfbf) {
    if (_0x15cfbf === '' || _0x15cfbf.trim() === '') {
      return false;
    }
    try {
      return btoa(atob(_0x15cfbf)) == _0x15cfbf;
    } catch (_0x137d01) {
      return false;
    }
  }
  function notxt(_0x23139c) {
    if (get_ext(_0x23139c) == 'txt') {
      return _0x23139c.split('.').slice(0, -1).join('.');
    } else {
      return "ugh";
    }
  }
  var input = _$("inputfile");
  _$("inputfile").onchange = function (_0x1a2dee) {
    fichiers = _0x1a2dee.target.files;
    for (var _0x11a760 = 0; _0x11a760 < fichiers.length; _0x11a760++) {
      var _0x5b774b = fichiers[_0x11a760];
      if (get_ext(_0x5b774b.name) == "pipi" || get_ext(notxt(_0x5b774b.name)) == "pipi") {
        var _0x4e5e0a = new FileReader();
        _0x4e5e0a.onload = function (_0x36a3c6) {
          localStorage.importer = '1';
          let _0x318190 = _0x36a3c6.target.result;
          let _0x4965b4 = checkcrypted(_0x318190);
          if (_0x4965b4 == 1) {
            save_comic(_0x318190.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), "%%%-%%%");
            _$("inputfile").value = '';
          } else if (_0x4965b4 == 2) {
            _0x318190 = CryptoJS.AES.decrypt(_0x318190, "var i = 14226-11420334e10").toString(CryptoJS.enc.Utf8);
            save_comic(_0x318190.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), "%%%-%%%");
            _$("inputfile").value = '';
          } else {
            notif("Fichier non reconnu ");
          }
        };
        _0x4e5e0a.readAsText(fichiers[_0x11a760]);
      } else {
        notif("Fichier non reconnu ");
      }
    }
    setTimeout("show_all_comics(1, [])", 1500);
  };
  function save_comic(_0x232a10, _0x510d54) {
    if (cat_showed == 1) {
      show_cat(_$("show_cat_btn"));
      option_actuelle = 0;
    }
    db.transaction(function (_0x223ceb) {
      var _0x3fa409 = _0x232a10.split("\n");
      var _0x20c6c0;
      var _0x44845f;
      var _0x29e3ef;
      var _0x115fd3;
      var _0x9bedd6;
      var _0x32c3ab = _0x3fa409[0].split(_0x510d54);
      _0x223ceb.executeSql("SELECT MAX(id) as cntt FROM comic", [], (_0x460598, _0x40c065) => {
        _0x20c6c0 = parseInt(_0x40c065.rows.item(0).cntt);
        _0x20c6c0++;
        _0x460598.executeSql("SELECT MAX(id) as cntt FROM chapitres", [], (_0x176fed, _0xb6bcea) => {
          _0x44845f = parseInt(_0xb6bcea.rows.item(0).cntt);
          _0x176fed.executeSql("SELECT categorie,id,COUNT(*) as cnt FROM comic WHERE (titre=? AND synopsis=? AND auteur=? AND langue=? AND traducteur=?) LIMIT 1", [_0x32c3ab[0].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x32c3ab[1].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x32c3ab[2].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x32c3ab[5].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x32c3ab[6].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;")], (_0x548193, _0x369eec) => {
            _0x29e3ef = parseInt(_0x369eec.rows.item(0).id);
            _0x115fd3 = parseInt(_0x369eec.rows.item(0).cnt);
            _0x9bedd6 = _0x369eec.rows.item(0).categorie;
            if (isNaN(_0x29e3ef)) {
              set_comic(_0x232a10, _0x510d54);
            } else {
              _0x548193.executeSql("SELECT id FROM chapitres WHERE comic=? LIMIT 1", [_0x29e3ef], (_0x51c62c, _0x2ddd22) => {
                if (_0x115fd3 != 0 && !isNaN(_0x115fd3)) {
                  let _0x3b0781 = parseInt(_0x2ddd22.rows.item(0).id);
                  notifier("Mise à jour...");
                  let _0xb06e89 = 0;
                  _0x51c62c.executeSql("SELECT chapitre,note,pris,download FROM chapitres WHERE (comic=? AND lu=1)", [_0x29e3ef], (_0x3f8ce8, _0x522523) => {
                    let _0x10657c = _0x522523.rows.length;
                    _0xb06e89 = _0x10657c;
                    for (var _0x22ab1e = 0; _0x22ab1e < _0x10657c; _0x22ab1e++) {
                      chapitres_lus.push(_0x522523.rows.item(_0x22ab1e).chapitre);
                      chapitres_notes.push(_0x522523.rows.item(_0x22ab1e).note);
                      chapitres_pris.push(_0x522523.rows.item(_0x22ab1e).pris);
                      chapitres_download.push(_0x522523.rows.item(_0x22ab1e).download);
                    }
                    _0x3f8ce8.executeSql("SELECT id,download FROM chapitres WHERE comic=?", [_0x29e3ef], (_0xc34a8f, _0x3d6d52) => {
                      let _0x30f0e2 = _0x3d6d52.rows.length;
                      for (var _0x4c87af = 0; _0x4c87af < _0x30f0e2; _0x4c87af++) {}
                      _0xc34a8f.executeSql("DELETE FROM comic WHERE id=?", [_0x29e3ef], _0x4c6380 => {
                        _0x4c6380.executeSql("DELETE FROM chapitres WHERE comic=?", [_0x29e3ef], _0xa5cb72 => {
                          if (_0x29e3ef == 1) {
                            notif("Moi je t'aimais...");
                          }
                          var _0x121b47 = _0x232a10.split("\n");
                          var _0x5d1e38 = _0x121b47.length;
                          var _0x40debb = _0x121b47[0].split(_0x510d54);
                          _0xa5cb72.executeSql("INSERT INTO comic(titre,synopsis,auteur,dessinateur,statut,langue,traducteur,miniature,lus,total,categorie) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [_0x40debb[0].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x40debb[1].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x40debb[2].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x40debb[3].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x40debb[4].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x40debb[5].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x40debb[6].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x40debb[7].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0xb06e89, _0x5d1e38 - 1, _0x9bedd6], function (_0x25716b, _0x56ccb9) {
                            _0x25716b.executeSql("SELECT MAX(id) as maxid FROM comic LIMIT 1", [], function (_0xcbe586, _0x2b9b0f) {
                              let _0x3fd3d9 = _0x2b9b0f.rows.item(0).maxid;
                              for (let _0x1fd96b = 1; _0x1fd96b < _0x5d1e38; _0x1fd96b++) {
                                const _0x4efdd7 = {
                                  chapitre: '',
                                  lien: '',
                                  lu: 0x0,
                                  pris: 0x0
                                };
                                var _0x2eb30d = _0x121b47[_0x1fd96b].split(_0x510d54);
                                var _0xbb2409 = _0x2eb30d.length;
                                _0x4efdd7.chapitre = _0x2eb30d[0];
                                let _0x33d04c = '';
                                let _0x2251a9 = 0;
                                let _0x3651ef = '';
                                if (chapitres_lus.includes('')) {
                                  _0x4efdd7.lu = 1;
                                  _0x33d04c = chapitres_notes[chapitres_lus.indexOf('')];
                                  _0x2251a9 = chapitres_pris[chapitres_lus.indexOf('')];
                                  _0x3651ef = chapitres_download[chapitres_lus.indexOf('')];
                                }
                                _0x4efdd7.lien = _0x2eb30d[1];
                                if (_0xbb2409 > 2) {
                                  let _0x8c73ea = " / " + _0x2eb30d[2];
                                  let _0x4ffb82 = 0;
                                  if (_0x33d04c.includes(_0x8c73ea) || _0x33d04c == _0x2eb30d[2]) {
                                    _0x4ffb82 = 1;
                                  }
                                  if (false && _0x33d04c != null && _0x33d04c != undefined && _0x33d04c.length > 0 && _0x4ffb82 == 0) {
                                    _0x33d04c += " / " + _0x2eb30d[2];
                                  } else if (_0x4ffb82 == 0) {
                                    _0x33d04c = _0x2eb30d[2];
                                  }
                                }
                                _0xcbe586.executeSql("INSERT INTO chapitres(chapitre,lien,comic,lu,pris,note,download) VALUES(?,?,?,?,?,?,?)", [''.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), ''.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x3fd3d9, 0x0, _0x2251a9, _0x33d04c, _0x3651ef], () => {
                                  chapitres_lus = [];
                                  chapitres_notes = [];
                                });
                              }
                              if (_0x9bedd6.length > 1) {
                                var _0x43fcc9 = _0x9bedd6.split(',');
                                var _0x10796b = [];
                                db.transaction(_0x356784 => {
                                  for (var _0xee8e59 = 1; _0xee8e59 < _0x43fcc9.length; _0xee8e59++) {
                                    _0x356784.executeSql("SELECT * FROM categorie WHERE id=? LIMIT 1", [parseInt(_0x43fcc9[_0xee8e59])], (_0x426b26, _0x3a969e) => {
                                      let _0x58ec85 = _0x3a969e.rows.item(0).comics.split(',');
                                      let _0x552bf8 = _0x58ec85.findIndex(_0x4f0737 => {
                                        return _0x4f0737 == '' + _0x29e3ef + '';
                                      });
                                      _0x58ec85.splice(_0x552bf8, 1);
                                      _0x58ec85.push(_0x3fd3d9);
                                      _0x10796b.push(_0x58ec85);
                                    });
                                  }
                                }, function (_0x1d024f) {}, () => {
                                  db.transaction(function (_0x285a33) {
                                    for (var _0x3b8446 = 0; _0x3b8446 < _0x10796b.length; _0x3b8446++) {
                                      _0x285a33.executeSql("UPDATE categorie SET comics = ? WHERE id=?", [_0x10796b[_0x3b8446], parseInt(_0x43fcc9[_0x3b8446 + 1])], function (_0x3bfdc9, _0x5ee8e2) {});
                                    }
                                  });
                                });
                              } else {
                                console.log("Dans 0 catégorie");
                              }
                              let _0x28b2f0 = localStorage.lus.split(',');
                              if (_0x28b2f0.length > 0) {
                                let _0x544096 = _0x28b2f0.findIndex(_0x4a1fc7 => {
                                  return _0x4a1fc7.split("--%%--")[0] == _0x29e3ef;
                                });
                                if (_0x544096 != -1) {
                                  let _0x508ec8 = _0x28b2f0[_0x544096].split("--%%--")[1];
                                  _0x28b2f0.splice(_0x544096, 1);
                                  let _0x53d4a7 = parseInt(_0x508ec8) - _0x3b0781 + 1;
                                  _0x508ec8 = _0x44845f + _0x53d4a7;
                                  _0x28b2f0.push(_0x20c6c0 + "--%%--" + _0x508ec8);
                                  localStorage.lus = _0x28b2f0.toString();
                                }
                              }
                            });
                          });
                        });
                      });
                    });
                  });
                }
              });
            }
          });
        });
      });
    }, _0x364309 => {}, () => {
      notif("Fichier importé!");
      up_phes(4);
      return;
    });
  }
  function retirer_bloc(_0x2e0f4c) {
    let _0x5161dc = _$(_0x2e0f4c);
    if (_0x5161dc != undefined) {
      _0x5161dc.style.animation = "fade .8s forwards";
      setTimeout(() => {
        set_bar_color("#FEF9C2");
      }, 350);
      setTimeout(() => {
        _0x5161dc.remove();
      }, 800);
    }
  }
  var interstitial;
  var interstitial_loaded = 0;
  var interstitial_first_load = 0;
  function onLoad() {
    reset_style();
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("admob.interstitial.show", function () {
      interstitial_loaded = 0;
      interstitial_first_load = 1;
      retirer_bloc("lapub");
      notif(relance[Math.round(Math.random() * (relance.length - 1))]);
    });
    document.addEventListener("admob.interstitial.loadfail", function () {
      cordova.plugins.codeplayfacebookads.loadInterstitialAds(_0x3b2303, interstitiel_events, interstitiel_fail);
    });
  }
  var couche_nav = 0;
  function onBackButton() {
    switch (couche_nav) {
      case 0:
        navigator.app.exitApp();
        break;
      case 1:
        if (feed_up == 1) {
          div_down("feed");
        } else {
          if (trophees_on == 1) {
            div_down('trophees');
          } else {
            navigator.app.exitApp();
          }
        }
        ;
        break;
      case 2:
        if (vote_up == 1) {
          div_down("votes");
        } else {
          down_infos_div(_$("chapitres"), 8);
        }
        ;
        break;
      case 3:
        if (comment_up == 1) {
          div_down('comments');
        } else {
          swipe_out(_$("div_pdf_chapitre"), 6);
        }
        ;
        break;
      case 4:
        if (vote_up == 1) {
          div_down("votes");
        } else {
          down_infos_div(_$("chapitres"), 8);
        }
        ;
        break;
    }
  }
  async function show_admob_ad() {
    if (interstitial_loaded == 1) {
      await interstitial.show();
    } else {
      await interstitial.load();
      await interstitial.show();
    }
  }
  function pipi_upload(_0x17870c) {
    if (get_ext(_0x17870c.name) == 'pipi') {
      var _0x4df632 = new FileReader();
      _0x4df632.onload = function (_0xeb228f) {
        localStorage.importer = '1';
        let _0x284fb0 = _0xeb228f.target.result;
        if (isBase64(_0x284fb0)) {
          _0x284fb0 = atob(_0x284fb0);
        }
        save_comic(_0x284fb0.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), "%%%-%%%");
        _$("inputfile").value = '';
      };
      _0x4df632.readAsText(_0x17870c);
    } else {
      notif(" Fichier non reconnu ");
    }
  }
  function count_char(_0x155806, _0x224be1) {
    var _0x3e4d36 = (_0x155806.match(_0x224be1 + '/g') || []).length;
    console.log(_0x3e4d36);
  }
  function pip() {
    if (truc_fini == 0) {
      PictureInPicture.enter(200, 300, function (_0x37ad19) {}, function (_0x2e3d18) {});
    }
  }
  async function onDeviceReady() {
    await admob.start();
    const _0xb609a7 = {
      adUnitId: "ca-app-pub-1631866844027753/4707329097"
    };
    interstitial = new admob.InterstitialAd(_0xb609a7);
    interstitial.on("load", _0x3f2e91 => {
      interstitial_loaded = 1;
    });
    window.open = cordova.InAppBrowser.open;
    document.addEventListener("backbutton", onBackButton, false);
    AndroidFullScreen.immersiveMode(successFunction, errorFunction);
    document.addEventListener("menubutton", pip, false);
    document.addEventListener('pause', pip, false);
    cordova.openwith.init(_0x4477e7, _0x47860d);
    function _0x4477e7() {
      console.log("init success!");
    }
    function _0x47860d(_0x970df9) {
      console.log("init failed: " + _0x970df9);
    }
    cordova.openwith.addHandler(_0x408723);
    function _0x408723(_0x3851fe) {
      console.log("  action: " + _0x3851fe.action);
      console.log("  exit: " + _0x3851fe.exit);
      for (var _0x11557f = 0; _0x11557f < _0x3851fe.items.length; ++_0x11557f) {
        var _0xa09738 = _0x3851fe.items[_0x11557f];
      }
      if (_0x3851fe.items.length > 0) {
        for (var _0x11557f = 0; _0x11557f < _0x3851fe.items.length; _0x11557f++) {
          cordova.openwith.load(_0x3851fe.items[_0x11557f], function (_0x7dd7b3, _0x22c741) {
            var _0x5da5ac = atob(_0x7dd7b3);
            _0x5da5ac = decodeURIComponent(escape(_0x5da5ac));
            let _0x4462bc = checkcrypted(_0x5da5ac);
            if (_0x4462bc == 1) {
              localStorage.importer = '1';
              save_comic(_0x5da5ac.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), "%%%-%%%");
            } else if (_0x4462bc == 2) {
              localStorage.importer = '1';
              _0x5da5ac = CryptoJS.AES.decrypt(_0x5da5ac, "var i = 14226-11420334e10").toString(CryptoJS.enc.Utf8);
              save_comic(_0x5da5ac.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), "%%%-%%%");
            } else {
              notif("Fichier non reconnu ");
            }
          });
        }
        setTimeout("show_all_comics(1, [])", 1500);
      } else if (_0x3851fe.exit) {
        cordova.openwith.exit();
      }
    }
    var _0x41065a = [permissions.INTERNET, permissions.ACCESS_NETWORK_STATE];
    permissions.hasPermission(_0x41065a, callback, null);
  }
  document.addEventListener("admob.interstitial.dismiss", async () => {
    await interstitial.load();
  });
  function update__comic(_0x1c383a, _0x5331d7, _0x1e9715) {
    const _0x5023bc = {
      kKObO: function (_0x582304, _0x24ad87) {
        return _0x582304 < _0x24ad87;
      }
    };
    _0x5023bc.YOrjc = function (_0x19d746, _0x11662d) {
      return _0x19d746 === _0x11662d;
    };
    _0x5023bc.nXhZC = "efosh";
    _0x5023bc.PQhQX = "INSERT INTO chapitres(chapitre,lien,comic) VALUES(?,?,?)";
    _0x5023bc.xWMBI = "SELECT MAX(id) as maxid FROM comic LIMIT 1";
    var _0x430450 = _0x1c383a.split("\n");
    var _0x1fa15e = _0x430450.length;
    db.transaction(function (_0x39f96a) {
      _0x39f96a.executeSql(_0x5023bc.xWMBI, [], function (_0x320a21, _0x32a0c1) {
        let _0x4eb4e0 = _0x32a0c1.rows.item(0).maxid;
        for (let _0x1d8a1a = 1; _0x1d8a1a < _0x1fa15e; _0x1d8a1a++) {
          if (_0x5023bc.YOrjc(_0x5023bc.nXhZC, "efosh")) {
            const _0x1a31f1 = {
              chapitre: '',
              lien: ''
            };
            var _0x31b39e = _0x430450[_0x1d8a1a].split(_0x5331d7);
            var _0x1c2f58 = _0x31b39e.length;
            _0x1a31f1.chapitre = _0x31b39e[0];
            _0x1a31f1.lien = _0x31b39e[1];
            _0x320a21.executeSql(_0x5023bc.PQhQX, ['', '', _0x4eb4e0]);
          } else {
            const _0x578403 = _0x15b246.files[0];
            if (_0x578403) {
              _0x41b5e8.readAsDataURL(_0x578403);
            }
          }
        }
      });
    });
  }
  function set_comic(_0x59a176, _0x5f3a97) {
    db.transaction(function (_0x29a083) {
      var _0x2f2629 = _0x59a176.split("\n");
      var _0x42fc7e = _0x2f2629.length;
      var _0x520752 = _0x2f2629[0].split(_0x5f3a97);
      _0x29a083.executeSql("INSERT INTO comic(titre,synopsis,auteur,dessinateur,statut,langue,traducteur,miniature,lus,total) VALUES(?,?,?,?,?,?,?,?,0,?)", [_0x520752[0].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x520752[1].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x520752[2].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x520752[3].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x520752[4].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x520752[5].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x520752[6].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x520752[7].replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x42fc7e - 1], function (_0x55e9d4, _0x501b08) {
        _0x55e9d4.executeSql("SELECT MAX(id) as maxid FROM comic LIMIT 1", [], function (_0x427569, _0x19503d) {
          let _0x18f71c = _0x19503d.rows.item(0).maxid;
          for (let _0x5ae7a2 = 1; _0x5ae7a2 < _0x42fc7e; _0x5ae7a2++) {
            const _0x24f891 = {
              chapitre: '',
              lien: '',
              lu: 0x0,
              pris: 0x0
            };
            var _0x1de0de = _0x2f2629[_0x5ae7a2].split(_0x5f3a97);
            var _0x54afb1 = _0x1de0de.length;
            _0x24f891.chapitre = _0x1de0de[0];
            _0x24f891.lien = _0x1de0de[1];
            let _0x257c3d = '';
            if (_0x54afb1 > 2) {
              _0x257c3d = _0x1de0de[2];
            }
            _0x427569.executeSql("INSERT INTO chapitres(chapitre,lien,comic,lu,pris,note) VALUES(?,?,?,?,?,?)", [''.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), ''.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;"), _0x18f71c, 0x0, 0x0, _0x257c3d], () => {
              chapitres_lus = [];
            });
          }
        });
      });
    });
  }
  function remove_lu(_0x2ebfef) {
    lus = localStorage.lus.split(',');
    let _0x5d54d9 = lus.findIndex(_0x4744a2 => {
      return _0x4744a2.split("--%%--")[0] == _0x2ebfef;
    });
    lus.splice(_0x5d54d9, 1);
    show_lus(lus);
    localStorage.lus = lus.toString();
  }
  function remove_file(_0x101f5c) {
    window.resolveLocalFileSystemURL("cdvfile://localhost/persistent/downloads/", function (_0x344624) {
      const _0x229b45 = {
        create: false
      };
      _0x344624.getFile(_0x101f5c, _0x229b45, function (_0x4aa3a1) {
        _0x4aa3a1.remove(function () {
          db.transaction(async function (_0x28b5c6) {
            let _0x2548da = _0x101f5c.substring(0, _0x101f5c.indexOf('_'));
            let _0x3d3bb8 = _0x101f5c.substring(_0x101f5c.indexOf('_') + 1, _0x101f5c.lastIndexOf('.'));
            _0x28b5c6.executeSql("UPDATE chapitres SET download='' WHERE comic=? AND id=?", [parseInt(_0x2548da), parseInt(_0x3d3bb8)], async function (_0x24a791, _0x38c500) {});
            ;
          });
          return 1;
        }, function (_0x1d47e1) {
          notif("Problème de suppression");
          return 0;
        }, function () {
          notif("Fichier inexistant");
          return 0;
        });
      });
    });
  }
  function retrait_des_cat(_0x52ffbc) {
    var _0xd6885e = [];
    var _0x54c5bf = [];
    db.transaction(function (_0x3ce4e7) {
      _0x3ce4e7.executeSql("SELECT categorie FROM comic WHERE id=? LIMIT 1", [_0x52ffbc], (_0x3bc336, _0x11c1da) => {
        _0xd6885e = _0x11c1da.rows.item(0).categorie.split(',');
      });
    }, function (_0x2f031e) {}, () => {
      db.transaction(function (_0x345e59) {
        for (var _0xef0d76 = 1; _0xef0d76 < _0xd6885e.length; _0xef0d76++) {
          _0x345e59.executeSql("SELECT comics FROM categorie WHERE id=? LIMIT 1", [parseInt(_0xd6885e[_0xef0d76])], function (_0x1681cb, _0x4738a0) {
            let _0x21e06a = _0x4738a0.rows.item(0).comics.split(',');
            let _0x361e5b = _0x21e06a.findIndex(_0x317dd3 => {
              return _0x317dd3 == '' + _0x52ffbc + '';
            });
            _0x21e06a.splice(_0x361e5b, 1);
            _0x54c5bf.push(_0x21e06a);
          });
        }
      }, function (_0x24f962) {}, () => {
        db.transaction(function (_0x553f97) {
          for (var _0x45ed4c = 0; _0x45ed4c < _0x54c5bf.length; _0x45ed4c++) {
            _$('cat_' + _0xd6885e[_0x45ed4c + 1]).getElementsByTagName('i')[0].innerText = parseInt(_$('cat_' + _0xd6885e[_0x45ed4c + 1]).getElementsByTagName('i')[0].innerText) - 1;
            _0x553f97.executeSql("UPDATE categorie SET comics = ? WHERE id=?", [_0x54c5bf[_0x45ed4c], parseInt(_0xd6885e[_0x45ed4c + 1])], function (_0x8d3a72, _0x2bfc8a) {});
          }
        });
      });
    });
  }
  function disappear_comic(_0x2960af) {
    _$("comic_" + _0x2960af).style.animation = "disappear_comic .35s forwards";
    setTimeout(() => {
      _$("comic_" + _0x2960af).remove();
    }, 350);
  }
  function del_comic(_0x33bdd4) {
    retrait_des_cat(_0x33bdd4);
    db.transaction(function (_0x5c46d6) {
      _0x5c46d6.executeSql("SELECT chapitre FROM chapitres WHERE (comic=? AND lu=1)", [_0x33bdd4], (_0x26e459, _0x429ccc) => {
        let _0x576010 = _0x429ccc.rows.length;
        for (var _0x1629d2 = 0; _0x1629d2 < _0x576010; _0x1629d2++) {
          chapitres_lus.push(_0x429ccc.rows.item(_0x1629d2).chapitre);
        }
        _0x26e459.executeSql("SELECT id FROM chapitres WHERE comic=?", [_0x33bdd4], (_0x63dd81, _0x103e83) => {
          let _0x19d69b = _0x103e83.rows.length;
          for (var _0x303f4b = 0; _0x303f4b < _0x19d69b; _0x303f4b++) {
            let _0x1107b0 = _0x103e83.rows.item(_0x303f4b).id;
            if (remove_file(_0x33bdd4 + '_' + _0x1107b0 + '.pdf')) {} else {
              remove_file(_0x33bdd4 + '_' + _0x1107b0 + '.zip');
            }
          }
          _0x63dd81.executeSql("DELETE FROM comic WHERE id=?", [_0x33bdd4], _0x46897f => {
            _0x46897f.executeSql("DELETE FROM chapitres WHERE comic=?", [_0x33bdd4], _0x511772 => {
              remove_lu(_0x33bdd4);
              if (_0x33bdd4 == 1) {
                notif("Moi je t'aimais...");
                up_phes(10);
              }
              disappear_comic(_0x33bdd4);
              up_phes(2);
              return 1;
            });
          });
        });
      });
    });
  }
  function toDataUrl(_0x518d60, _0x1e31d1) {
    var _0x45b1f1 = new XMLHttpRequest();
    _0x45b1f1.onload = function () {
      var _0x5aec02 = new FileReader();
      _0x5aec02.onloadend = function () {
        _0x1e31d1(_0x5aec02.result);
      };
      _0x5aec02.readAsDataURL(_0x45b1f1.response);
    };
    _0x45b1f1.open("GET", _0x518d60);
    _0x45b1f1.responseType = 'blob';
    _0x45b1f1.send();
  }
  function retrait_choix_partage() {
    _$("shares").style.animation = "back_share 0.5s forwards";
    setTimeout(() => {
      _$("share").setAttribute("onclick", "choix_partage(this)");
      if (_$("shares") != undefined && _$("shares") != null) {
        _$("shares").remove();
      }
    }, 500);
  }
  function choix_partage(_0x4ed296) {
    _0x4ed296.setAttribute("onclick", "retrait_choix_partage()");
    let _0x8071ab = document.createElement("div");
    _0x8071ab.setAttribute('id', 'shares');
    if (dark_mode) {
      _0x8071ab.setAttribute("class", "dark_shares");
    }
    _0x8071ab.innerHTML = "<button onclick='partager_pipi(this,1)'>Avec Notes</button><button onclick='partager_pipi(this,0)'>Sans Note</button>";
    _$('chapitres').appendChild(_0x8071ab);
    _0x8071ab.style.height = _$("supprimer").offsetHeight + 'px';
    _0x8071ab.style.top = _$('supprimer').offsetTop + 'px';
    _0x8071ab.style.left = _$("supprimer").offsetLeft + 'px';
    _0x8071ab.setAttribute("tabindex", '-1');
    _0x8071ab.setAttribute("onfocusout", "retrait_choix_partage()");
    _0x8071ab.focus();
  }
  var share_word = ["Check", "Apprécie", "Essaie", 'Découvre', 'Consomme', "Mets-toi bien avec", "Tu vas aimer", "Ça va peut-être te plaire :", "Et si tu essayais"];
  function partager_pipi(_0x857235, _0x3daff1) {
    _0x857235.style.animation = "fade_anime 2s infinite";
    let _0x2a9ed5 = localStorage.webtoon;
    let _0x46ab5a = '';
    _$("supprimer").setAttribute("onclick", "supprimer(this," + _0x2a9ed5 + ')');
    db.transaction(function (_0x5beeeb) {
      _0x5beeeb.executeSql("SELECT * FROM comic WHERE id=? LIMIT 1", [_0x2a9ed5], function (_0x116756, _0x10f808) {
        let _0x5f279a = _0x10f808.rows.item(0).titre;
        let _0x4326b6 = _0x10f808.rows.item(0).auteur;
        let _0x1e9031 = _0x10f808.rows.item(0).synopsis;
        let _0x547cda = _0x10f808.rows.item(0).dessinateur;
        let _0x36a6de = _0x10f808.rows.item(0).statut;
        let _0x63b20c = _0x10f808.rows.item(0).langue;
        let _0x3e9688 = _0x10f808.rows.item(0).traducteur;
        let _0x1ad4cd = _0x10f808.rows.item(0).miniature;
        _0x46ab5a += _0x5f279a + '%%%-%%%' + _0x1e9031 + '%%%-%%%' + _0x4326b6 + '%%%-%%%' + _0x547cda + '%%%-%%%' + _0x36a6de + "%%%-%%%" + _0x63b20c + '%%%-%%%' + _0x3e9688 + '%%%-%%%' + _0x1ad4cd + "\n";
        _0x116756.executeSql("SELECT * FROM chapitres WHERE comic=? ORDER BY id ASC", [_0x2a9ed5], (_0x250940, _0x2b0a1a) => {
          let _0xdbe023 = _0x2b0a1a.rows.length;
          let _0x2e6993 = '';
          for (let _0x193da2 = 0; _0x193da2 < _0xdbe023; _0x193da2++) {
            _0x2e6993 += _0x2b0a1a.rows.item(_0x193da2).chapitre + '%%%-%%%' + _0x2b0a1a.rows.item(_0x193da2).lien;
            chapnote = _0x2b0a1a.rows.item(_0x193da2).note;
            if (_0x3daff1 == 1 && chapnote != null && chapnote != undefined && chapnote.length > 0) {
              _0x2e6993 += '%%%-%%%' + chapnote;
            }
            if (_0x193da2 != _0xdbe023 - 1) {
              _0x2e6993 += "\n";
            }
          }
          _0x46ab5a += _0x2e6993;
          _0x46ab5a = CryptoJS.AES.encrypt(_0x46ab5a, "var i = 14226-11420334e10").toString();
          toDataUrl(_0x1ad4cd, _0x3ba011 => {
            var _0x322c12 = {
              'message': share_word[Math.round(Math.random() * (share_word.length - 1))] + " " + _0x5f279a + " sur PipiLecteur ( https://bit.ly/PipiLecteur )",
              'files': [_0x3ba011, "df:" + _0x5f279a + ".pipi;data:application/octet-stream;base64," + btoa(unescape(encodeURIComponent(_0x46ab5a.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, "\"").replace(/&#039;/g, "'"))))]
            };
            var _0x362bf8 = function (_0x1df445) {
              up_phes(7);
              _0x857235.style.animation = '';
            };
            var _0xafeefb = function (_0x73318d) {
              notif("Pas pu partager...");
              _0x857235.style.animation = '';
            };
            window.plugins.socialsharing.shareWithOptions(_0x322c12, _0x362bf8, _0xafeefb);
          });
        });
      });
    }, function (_0x3ae962) {}, function () {
      return;
    });
  }
  var webtoon_actu = -1;
  function show_comic(_0x4cdc25) {
    localStorage.webtoon = _0x4cdc25;
    _$("supprimer").setAttribute('onclick', "supprimer(this," + _0x4cdc25 + ')');
    let _0x12217c = _$("chapitres");
    db.transaction(function (_0x8f459) {
      _0x8f459.executeSql("SELECT * FROM comic WHERE id=? LIMIT 1", [_0x4cdc25], function (_0x4531de, _0x57bebf) {
        let _0x99972b = _0x57bebf.rows.item(0).titre;
        let _0xa29d1 = _0x57bebf.rows.item(0).auteur;
        let _0xfe92bb = _0x57bebf.rows.item(0).synopsis;
        let _0x167f33 = _0x57bebf.rows.item(0).dessinateur;
        let _0xc58c27 = _0x57bebf.rows.item(0).statut;
        let _0x190f82 = _0x57bebf.rows.item(0).traducteur;
        let _0x292741 = _0x57bebf.rows.item(0).miniature;
        _$("openvotee").setAttribute("onclick", "openvote('" + _0x99972b + "','" + _0xa29d1 + "')");
        _0x4531de.executeSql("SELECT * FROM chapitres WHERE comic=? ORDER BY id ASC", [_0x4cdc25], (_0x3c683f, _0x337e49) => {
          let _0x5cca48 = _0x337e49.rows.length;
          let _0x4e9672 = '';
          for (let _0x54ed5b = 0; _0x54ed5b < _0x5cca48; _0x54ed5b++) {
            _0x4e9672 += _0x337e49.rows.item(_0x54ed5b).chapitre;
            if (_0x54ed5b != _0x5cca48 - 1) {
              _0x4e9672 += "-||pipi,k ubb%%-";
            }
          }
          _0x4e9672 = _0x4e9672.split("-||pipi,k ubb%%-");
          let _0x478f21 = _$("infos_webtoon");
          let _0x4e41d4 = _$("metas_webtoon");
          let _0x198999 = _$("sub_metas");
          setTimeout(async () => {
            _0x478f21.getElementsByTagName("img")[0].setAttribute('src', _0x292741);
            _0x4e41d4.getElementsByTagName('b')[0].innerHTML = unescapeHtml(_0x99972b);
            _0x4e41d4.getElementsByTagName('i')[0].innerHTML = unescapeHtml(_0xfe92bb);
            _0x198999.getElementsByTagName('b')[0].innerHTML = unescapeHtml(_0xa29d1);
            _0x198999.getElementsByTagName('b')[1].innerHTML = unescapeHtml(_0x167f33);
            _0x198999.getElementsByTagName('b')[2].innerHTML = unescapeHtml(_0xc58c27);
            _0x198999.getElementsByTagName('b')[3].innerHTML = unescapeHtml(_0x190f82);
            set_chapters(_0x4e9672, "chapitres");
            up_infos_div(_0x12217c, 9);
          }, 440);
        });
      });
    }, function (_0x4c4df2) {}, function () {
      return;
    });
  }
  function reset_style() {
    if (!localStorage.height) {
      localStorage.height = screen.height + 'px';
      localStorage.width = window.innerWidth;
    }
    _$("body").style.height = localStorage.height;
    _$("specials").style.transform = "translate(-50%, " + parseFloat(window.innerHeight) * 0.12 + 'px)';
  }
  function niveau_lecture() {
    if (parseInt(localStorage.webtoon) != 1) {
      let _0x2cdb9f = _$("pdf_chapitre");
      let _0x1d04de = _$("niveau_lecture");
      let _0x48f35c = _0x2cdb9f.scrollTop / _0x2cdb9f.scrollHeight * 100;
      _0x1d04de.style.background = "linear-gradient(to right, var(--background) 0% " + _0x48f35c + "%, rgba(1 1 1 / 15%) " + _0x48f35c + "% 100%)";
      _0x1d04de.style.animation = "fade_in .5s forwards";
      setTimeout(() => {
        _0x1d04de.style.animation = "fade_out 1s .75s forwards";
      }, 500);
    }
  }
  var ctrl_showed = 0;
  function show_ctrls() {
    let _0x34d4e5 = _$("controls");
    if (ctrl_showed == 0) {
      fade(_0x34d4e5, 6, 'in');
      ctrl_showed = 1;
    } else {
      fade(_0x34d4e5, 6, "out");
      ctrl_showed = 0;
    }
  }
  function reglages(_0x53c80d) {
    if (_0x53c80d.style.filter.includes("opacity(0.7)")) {
      fade(_$("manip"), 7, "out");
      fade(_$("qualite"), 7, "out");
      _0x53c80d.style.filter = "opacity(1)";
    } else {
      fade(_$("manip"), 7, 'in');
      fade(_$("qualite"), 7, 'in');
      _0x53c80d.style.filter = "opacity(0.7)";
    }
  }
  function webtoon_bloc(_0x1415a0) {}
  var categorie_actuelle = 1;
  var option_actuelle = 0;
  function generer_args(_0x325c39) {
    let _0x104a18 = '?';
    for (let _0x3ceca9 = 0; _0x3ceca9 < _0x325c39 - 1; _0x3ceca9++) {
      _0x104a18 += ',?';
    }
    return _0x104a18;
  }
  function show_not_in_cat(_0x479b24) {
    const _0x40e20c = {
      QBwfM: function (_0xbd7601, _0x1728d6) {
        return _0xbd7601 + _0x1728d6;
      }
    };
    _0x40e20c.sODic = "cat_";
    _0x40e20c.LYUTB = function (_0x39f6f4, _0x542920) {
      return _0x39f6f4 + _0x542920;
    };
    _0x40e20c.soCce = function (_0x43cfd3, _0x2a8017) {
      return _0x43cfd3 + _0x2a8017;
    };
    _0x40e20c.EarMc = " <i>0</i>";
    _0x40e20c.pqhFJ = "div_categories";
    _0x40e20c.hXSpP = "flip 1s forwards ease";
    _0x40e20c.zgFOl = "none";
    _0x40e20c.XbWoT = "feed_load";
    _0x40e20c.POtNH = "lhMHV";
    _0x40e20c.AzaxL = function (_0x4f7475, _0x204a1e) {
      return _0x4f7475 != _0x204a1e;
    };
    _0x40e20c.HILyE = "kXXOn";
    _0x40e20c.vFnQy = "Appuie pour ajouter";
    _0x40e20c.SqQSo = "SELECT comics FROM categorie WHERE id=? LIMIT 1";
    db.transaction(function (_0x769411) {
      const _0x265025 = {
        'hueml': function (_0x568d36, _0x273f03) {
          return _0x568d36(_0x273f03);
        },
        'wyQYW': "Catégorie créée",
        'bmDzS': function (_0x11de52, _0x194a18) {
          return _0x11de52 + _0x194a18;
        },
        'sjdpZ': function (_0x22717c, _0xff9e86) {
          return _0x22717c + _0xff9e86;
        },
        'kunaq': "afficher_cat_comics(",
        'APVwD': _0x40e20c.sODic,
        'Kdcwm': function (_0x240f11, _0x51fe2f) {
          return _0x40e20c.LYUTB(_0x240f11, _0x51fe2f);
        },
        'qbAmS': function (_0xec4a7a, _0x323774) {
          return _0x40e20c.soCce(_0xec4a7a, _0x323774);
        },
        'RrlCd': _0x40e20c.EarMc,
        'NeAoW': _0x40e20c.pqhFJ,
        'DchGc': _0x40e20c.hXSpP,
        'SWPWr': function (_0x5ce2c4, _0x440d96, _0xa28da0) {
          return _0x5ce2c4(_0x440d96, _0xa28da0);
        },
        'ZRpfo': _0x40e20c.zgFOl,
        'hxSBq': _0x40e20c.XbWoT,
        'RASWb': _0x40e20c.POtNH,
        'qGInK': function (_0x47ac30, _0x708cda) {
          return _0x40e20c.AzaxL(_0x47ac30, _0x708cda);
        },
        'NWuOI': function (_0x30e333, _0x3803a5) {
          return _0x30e333 != _0x3803a5;
        },
        'dUpMF': function (_0x1850ab, _0x1d88e8, _0x3b2fd7) {
          return _0x1850ab(_0x1d88e8, _0x3b2fd7);
        },
        'OfaBo': function (_0x5d3319, _0x78310b) {
          return _0x5d3319 === _0x78310b;
        },
        'rgAWx': _0x40e20c.HILyE,
        'Nxgjk': function (_0x3bc78b, _0x41cb75) {
          return _0x3bc78b(_0x41cb75);
        },
        'BIiUW': _0x40e20c.vFnQy
      };
      _0x769411.executeSql(_0x40e20c.SqQSo, [_0x479b24], function (_0xdbd0b4, _0x2d80b8) {
        const _0x53fd30 = {
          'cwmqZ': _0x265025.ZRpfo,
          'jToFJ': function (_0x3d9b2a, _0x5154ca) {
            return _0x3d9b2a(_0x5154ca);
          },
          'HIJCv': _0x265025.hxSBq
        };
        if (_0x265025.RASWb !== 'ooNZi') {
          var _0x407a33 = _0x40e20c.AzaxL(_0x2d80b8.rows.item(0).comics, null) && _0x40e20c.AzaxL(_0x2d80b8.rows.item(0).comics, undefined) && _0x2d80b8.rows.item(0).comics.length != 0 ? _0x2d80b8.rows.item(0).comics.split(',') : 0;
          if (_0x407a33 != 0) {
            show_all_comics(7, _0x407a33);
          } else {
            if (_0x265025.rgAWx === 'DSTev') {
              _0x2b3327("Catégorie créée");
              let _0x363237 = _0x2238d7.createElement("span");
              _0x363237.setAttribute("onclick", "afficher_cat_comics(" + _0x48da99.rows.item(0).id + ')');
              _0x363237.setAttribute('id', _0x265025.APVwD + _0x222bd8.rows.item(0).id);
              _0x363237.innerHTML = _0x40e20c.LYUTB(_0x40e20c.soCce(_0x5d47ea.rows.item(0).emoji, " ") + _0x1ea481.rows.item(0).nom, _0x265025.RrlCd);
              _0x17e049(_0x265025.NeAoW).appendChild(_0x363237);
              _0x2f0cfb(_0x265025.NeAoW).scrollTo(_0x363237.offsetLeft, 0);
              _0x363237.style.animation = _0x265025.DchGc;
              _0x2ebdfc(() => {
                _0x363237.style.animation = _0x53fd30.cwmqZ;
              }, 1000);
              _0x13314e(3);
            } else {
              notif(_0x265025.BIiUW);
              show_all_comics(1, []);
            }
          }
        } else {
          _0x45fd1e(_0x53fd30.HIJCv).remove();
        }
      });
    });
  }
  function add_to_cat(_0x4ea520, _0x4d9d09) {
    db.transaction(function (_0x4ab2e4) {
      _0x4ab2e4.executeSql("SELECT categorie FROM comic WHERE id=? LIMIT 1", [_0x4ea520], function (_0x322ad5, _0x4ec614) {
        let _0x2b5451 = _0x4ec614.rows.item(0).categorie.split(',');
        _0x2b5451.push(_0x4d9d09);
        _0x322ad5.executeSql("UPDATE comic SET categorie = ? WHERE id=?", [_0x2b5451.toString(), _0x4ea520], function (_0x2ed7df, _0x2c0988) {
          _0x2ed7df.executeSql("SELECT comics FROM categorie WHERE id=? LIMIT 1", [_0x4d9d09], function (_0x448f63, _0x154b23) {
            let _0x8269ff = _0x154b23.rows.item(0).comics != null && _0x154b23.rows.item(0).comics != undefined && _0x154b23.rows.item(0).comics.length != 0 ? _0x154b23.rows.item(0).comics.split(',') : [];
            _0x8269ff.push(_0x4ea520);
            _0x448f63.executeSql("UPDATE categorie SET comics = ? WHERE id=?", [_0x8269ff.toString(), _0x4d9d09], function (_0x37f3b3, _0x4172dd) {
              disappear_comic(_0x4ea520);
              _$("cat_" + _0x4d9d09).getElementsByTagName('i')[0].innerText = parseInt(_$("cat_" + _0x4d9d09).getElementsByTagName('i')[0].innerText) + 1;
              notif("Ajouté");
              up_phes(8);
            });
          });
        });
      });
    });
  }
  function del_cat(_0x13ebec) {
    if (_0x13ebec != 1) {
      var _0x5f4b7b = [];
      var _0x164a06 = [];
      db.transaction(function (_0x153803) {
        _0x153803.executeSql("SELECT comics FROM categorie WHERE id=? LIMIT 1", [_0x13ebec], function (_0xc0fe45, _0x20d605) {
          _0x164a06 = _0x20d605.rows.item(0).comics != null && _0x20d605.rows.item(0).comics != undefined && _0x20d605.rows.item(0).comics.length != 0 ? _0x20d605.rows.item(0).comics.split(',') : [];
        });
      }, function (_0x539eef) {}, () => {
        db.transaction(function (_0x40411e) {
          if (_0x164a06.length != 0) {
            for (var _0xb0d5dc = 0; _0xb0d5dc < _0x164a06.length; _0xb0d5dc++) {
              _0x40411e.executeSql("SELECT categorie,id FROM comic WHERE id=? LIMIT 1", [_0x164a06[_0xb0d5dc]], function (_0x209738, _0x10b595) {
                let _0x45c313 = _0x10b595.rows.item(0).categorie.split(',');
                let _0x1e53ca = _0x45c313.findIndex(_0x248a3a => {
                  return _0x248a3a == '' + _0x13ebec + '';
                });
                _0x45c313.splice(_0x1e53ca, 1);
                _0x5f4b7b.push(_0x45c313);
              });
            }
          }
        }, function (_0x3ac18e) {}, () => {
          db.transaction(function (_0x524127) {
            for (var _0x566035 = 0; _0x566035 < _0x5f4b7b.length; _0x566035++) {
              _0x524127.executeSql("UPDATE comic SET categorie = ? WHERE id=?", [_0x5f4b7b[_0x566035], parseInt(_0x164a06[_0x566035])], function (_0x1cc4c0, _0x259aad) {});
            }
          }, function (_0x3ea892) {}, () => {
            db.transaction(function (_0x339b12) {
              _0x339b12.executeSql("DELETE FROM categorie WHERE id=?", [_0x13ebec], _0x1d997e => {
                _$("cat_" + _0x13ebec).remove();
                _$('cat_1').click();
                notif("Catégorie supprimée");
              });
            });
          });
        });
      });
    }
  }
  function del_from_cat(_0x5719ed, _0x319199) {
    db.transaction(function (_0x5391f8) {
      _0x5391f8.executeSql("SELECT categorie FROM comic WHERE id=? LIMIT 1", [_0x5719ed], function (_0x5b6900, _0x4ccbf9) {
        let _0x362f51 = _0x4ccbf9.rows.item(0).categorie.split(',');
        let _0x4538f5 = _0x362f51.findIndex(_0x33d21c => {
          return _0x33d21c == '' + _0x319199 + '';
        });
        _0x362f51.splice(_0x4538f5, 1);
        _0x5b6900.executeSql("UPDATE comic SET categorie = ? WHERE id=?", [_0x362f51.toString(), _0x5719ed], function (_0x31f265, _0x362234) {
          _0x31f265.executeSql("SELECT comics FROM categorie WHERE id=? LIMIT 1", [_0x319199], function (_0x4657c3, _0x67c34d) {
            let _0x12c621 = _0x67c34d.rows.item(0).comics.split(',');
            let _0x48b14c = _0x12c621.findIndex(_0x903b7 => {
              return _0x903b7 == '' + _0x5719ed + '';
            });
            console.log("Indexe2 : " + _0x48b14c);
            _0x12c621.splice(_0x48b14c, 1);
            _0x4657c3.executeSql("UPDATE categorie SET comics = ? WHERE id=?", [_0x12c621.toString(), _0x319199], function (_0x5c862c, _0xcd46b8) {
              disappear_comic(_0x5719ed);
              _$('cat_' + _0x319199).getElementsByTagName('i')[0].innerText = parseInt(_$('cat_' + _0x319199).getElementsByTagName('i')[0].innerText) - 1;
              notif("Retiré");
            });
          });
        });
      });
    });
  }
  function selection(_0xf5ca7b) {
    _$("delco").style.filter = "opacity(1)";
    deltacat = 0;
    _$('cat_' + _0xf5ca7b).setAttribute('class', "categorie_selected");
    let _0xedae1b = _$('cat_' + _0xf5ca7b).parentNode.getElementsByTagName("span");
    for (var _0xadf146 = 0; _0xadf146 < _0xedae1b.length; _0xadf146++) {
      if (_0xedae1b[_0xadf146].getAttribute('id') != 'cat_' + _0xf5ca7b) {
        _0xedae1b[_0xadf146].removeAttribute('class');
      }
    }
    _0xedae1b = document.getElementsByClassName("cat_buttons")[0].getElementsByTagName('button');
    for (var _0xadf146 = 0; _0xadf146 < _0xedae1b.length; _0xadf146++) {
      _0xedae1b[_0xadf146].style.animation = "none";
    }
    let _0x403ec4 = document.getElementsByClassName("cat_buttons")[0];
    if (_0xf5ca7b == 1) {
      _0x403ec4.style.filter = "grayscale(1)";
    } else {
      _0x403ec4.style.filter = "grayscale(0)";
    }
  }
  function rien_ici(_0x115cc8) {
    let _0x5822e7 = document.createElement("div");
    _0x5822e7.setAttribute('id', "rienici");
    switch (_0x115cc8) {
      case 0:
        _0x5822e7.innerHTML = "Il faudrait faire des ajouts";
        break;
      case 2:
        _0x5822e7.innerHTML = "Commence par ajouter";
        break;
    }
    _$("liste_comics").appendChild(_0x5822e7);
  }
  function afficher_cat_comics(_0x3076b1) {
    if (categorie_actuelle != _0x3076b1) {
      btn_cat(_0x3076b1);
      selection(_0x3076b1);
    }
    option_actuelle = 0;
    if (_0x3076b1 == 1) {
      show_all_comics(1, []);
    } else {
      db.transaction(function (_0x4b56fd) {
        _0x4b56fd.executeSql("SELECT categorie,id FROM comic", [], function (_0x463761, _0x40026c) {
          n = _0x40026c.rows.length;
          var _0x2290aa = [];
          for (let _0x7d086 = 0; _0x7d086 < n; _0x7d086++) {
            let _0x2a503c = _0x40026c.rows.item(_0x7d086).categorie.split(',');
            if (_0x2a503c.includes('' + _0x3076b1 + '')) {
              _0x2290aa.push(_0x40026c.rows.item(_0x7d086).id);
            }
          }
          show_all_comics(6, _0x2290aa);
          if (option_actuelle == 2 && _0x2290aa.length != 0) {
            notif("Appuie pour retirer");
          }
          if (option_actuelle == 2 && _0x2290aa.length == 0) {
            rien_ici(2);
          }
          if (option_actuelle == 0 && _0x2290aa.length == 0) {
            rien_ici(0);
          }
        });
      });
    }
  }
  var cat_showed = 0;
  function show_cat(_0x256ae2) {
    if (cat_showed == 0) {
      cat_showed = 1;
      _0x256ae2.style.backgroundColor = "rgba(1 1 1 / 10%)";
      option_actuelle = 0;
      let _0x1245d8 = categorie_actuelle;
      categorie_actuelle = 1;
      db.transaction(function (_0x3834b3) {
        _0x3834b3.executeSql("SELECT * FROM categorie", [], (_0x40856e, _0x207ae9) => {
          _$("div_categorie").innerHTML = "<div id='div_categories'></div><div class='cat_buttons'><button id='addco'></button><button id='retco'></button><button id='editco'></button><button id='delco'></button></div>";
          let _0x583c89 = _0x207ae9.rows.length;
          let _0x876476 = "<button onclick='profil(this,2)'>+</button>";
          for (var _0x1e5007 = 0; _0x1e5007 < _0x583c89; _0x1e5007++) {
            let _0x4e8903 = _0x207ae9.rows.item(_0x1e5007).comics != null && _0x207ae9.rows.item(_0x1e5007).comics != undefined && _0x207ae9.rows.item(_0x1e5007).comics.length != 0 ? "<i>" + _0x207ae9.rows.item(_0x1e5007).comics.split(',').length + "</i>" : "<i>0</i>";
            if (parseInt(_0x207ae9.rows.item(_0x1e5007).id) == 1) {
              _0x4e8903 = '';
            }
            _0x876476 += "<span id='cat_" + _0x207ae9.rows.item(_0x1e5007).id + "' onclick='afficher_cat_comics(" + _0x207ae9.rows.item(_0x1e5007).id + ")'>" + _0x207ae9.rows.item(_0x1e5007).emoji + " " + _0x207ae9.rows.item(_0x1e5007).nom + " " + _0x4e8903 + "</span>";
          }
          if (dark_mode == 1) {
            _$("div_categories").classList.toggle("dark_div_categories");
          }
          _$("div_categories").innerHTML = _0x876476;
          _$("div_categorie").style.animation = "cat_down .5s forwards";
          _$("liste_comics").style.animation = "liste_comics_down .5s forwards";
          if (_0x1245d8 != 1) {
            _$("cat_" + _0x1245d8).click();
          }
        });
      });
    } else {
      cat_showed = 0;
      _0x256ae2.style.backgroundColor = "rgba(1 1 1 / 0%)";
      _$("div_categorie").style.animation = "cat_up .8s forwards";
      _$("liste_comics").style.animation = "liste_comics_up .5s forwards";
    }
  }
  function preparer_ajout_a_cat(_0x188a46) {
    option_actuelle = 1;
    if (_0x188a46 != 1) {
      show_not_in_cat(_0x188a46);
    } else {
      notif("Non pas moi...");
    }
  }
  function preparer_retrait_de_cat(_0x564625) {
    if (_0x564625 != 1) {
      afficher_cat_comics(_0x564625);
      option_actuelle = 2;
    } else {
      notif("Pas moi hey!");
    }
  }
  var deltacat = 0;
  function delta_cat(_0x4fa271) {
    if (_0x4fa271 != 1) {
      switch (deltacat) {
        case 0:
          notif("Appuie encore");
          deltacat++;
          _$("delco").style.filter = "opacity(0.7)";
          break;
        case 1:
          notif("Une dernière fois");
          deltacat++;
          _$("delco").style.filter = "opacity(0.5)";
          break;
        case 2:
          del_cat(_0x4fa271);
          break;
      }
    } else {
      notif("Pas moi pas moi!");
    }
  }
  function btn_cat(_0x5dccd1) {
    categorie_actuelle = _0x5dccd1;
    _$("addco").setAttribute("onclick", "preparer_ajout_a_cat(" + _0x5dccd1 + ");reset_buttons(this,1)");
    _$("retco").setAttribute("onclick", "preparer_retrait_de_cat(" + _0x5dccd1 + ");reset_buttons(this,2)");
    _$("editco").setAttribute("onclick", "creer_update_cat(" + _0x5dccd1 + ");reset_buttons(this,3)");
    _$("delco").setAttribute("onclick", "delta_cat(" + _0x5dccd1 + ");reset_buttons(this,4)");
  }
  function reset_buttons(_0x4235d2, _0x8cec4b) {
    if (_0x4235d2.style.animation.includes("fadefade")) {
      option_actuelle = 0;
      _0x4235d2.style.animation = '';
    } else {
      let _0x42e637 = _0x4235d2.parentNode.getElementsByTagName("button");
      for (var _0xf9fa0b = 0; _0xf9fa0b < _0x42e637.length; _0xf9fa0b++) {
        _0x42e637[_0xf9fa0b].style.animation = '';
      }
      switch (_0x8cec4b) {
        case 1:
          _0x4235d2.style.animation = "fadefade 1.5s infinite";
          break;
        case 2:
          _0x4235d2.style.animation = "fadefade 1.5s infinite";
          break;
      }
    }
  }
  var html_final = '';
  function set_emojis(_0x40c37b) {}
  function show_all_comics(_0x9b3b9b, _0x540c20) {
    let _0x5b75ff = _$("liste_comics");
    _0x5b75ff.innerHTML = '';
    let _0x266d19 = '';
    let _0x31446f = [];
    switch (_0x9b3b9b) {
      case 1:
        _0x266d19 = "SELECT * FROM comic ORDER BY id DESC";
        _0x31446f = _0x540c20.slice();
        break;
      case 2:
        _0x266d19 = "SELECT * FROM comic WHERE (titre LIKE '%' || ? || '%') OR (auteur LIKE '%' || ? || '%') OR (dessinateur LIKE '%' || ? || '%')";
        _0x31446f = _0x540c20.slice();
        option_actuelle = 0;
        break;
      case 3:
        _0x266d19 = "SELECT * FROM comic ORDER BY langue";
        _0x31446f = _0x540c20.slice();
        option_actuelle = 0;
        break;
      case 4:
        _0x266d19 = "SELECT * FROM comic WHERE (statut LIKE '%' || ? || '%')";
        _0x31446f = _0x540c20.slice();
        option_actuelle = 0;
        break;
      case 5:
        _0x266d19 = "SELECT * FROM comic ORDER BY traducteur";
        _0x31446f = _0x540c20.slice();
        option_actuelle = 0;
        break;
      case 6:
        _0x31446f = _0x540c20.slice();
        _0x266d19 = "SELECT * FROM comic WHERE id IN(" + generer_args(_0x31446f.length) + ')';
        break;
      case 7:
        _0x31446f = _0x540c20.slice();
        _0x266d19 = "SELECT * FROM comic WHERE id NOT IN(" + generer_args(_0x31446f.length) + ')';
        break;
    }
    db.transaction(function (_0x311eed) {
      _0x311eed.executeSql(_0x266d19, _0x31446f, async function (_0x325838, _0x14b41e) {
        let _0x1b5bcd = _0x14b41e.rows.length;
        for (let _0x464205 = 0; _0x464205 < _0x1b5bcd; _0x464205++) {
          let _0x153865 = parseInt(_0x14b41e.rows.item(_0x464205).total);
          let _0x44bb20 = parseInt(_0x14b41e.rows.item(_0x464205).lus);
          let _0x9c89d6 = _0x14b41e.rows.item(_0x464205).id;
          let _0x542e0e = 0;
          let _0x577754 = _0x14b41e.rows.item(_0x464205).miniature;
          let _0x4d33fc = _0x14b41e.rows.item(_0x464205).titre;
          let _0x11c521 = _0x14b41e.rows.item(_0x464205).auteur;
          let _0x557c23 = _0x14b41e.rows.item(_0x464205).categorie;
          let _0xfcd58e = document.createElement("div");
          _0xfcd58e.setAttribute('id', 'comic_' + _0x9c89d6);
          _0xfcd58e.onclick = () => {
            switch (option_actuelle) {
              case 0:
                show_comic(_0x9c89d6);
                break;
              case 1:
                if (categorie_actuelle != 1) {
                  add_to_cat(_0x9c89d6, categorie_actuelle);
                } else {
                  show_comic(_0x9c89d6);
                }
                ;
                break;
              case 2:
                if (categorie_actuelle != 1) {
                  del_from_cat(_0x9c89d6, categorie_actuelle);
                } else {
                  show_comic(_0x9c89d6);
                }
                ;
                break;
            }
          };
          if (_0x153865 == 0) {
            let _0x1dba0d = 0;
            let _0x513b39 = 0;
            _0x325838.executeSql("SELECT COUNT(*) as lu FROM chapitres WHERE (comic=? AND lu=1)", [parseInt(_0x9c89d6)], function (_0x11ebce, _0x32eff1) {
              _0x1dba0d = parseInt(_0x32eff1.rows.item(0).lu);
              _0x11ebce.executeSql("SELECT COUNT(*) as vraitotal FROM chapitres WHERE comic=?", [parseInt(_0x9c89d6)], function (_0x42e048, _0x7de007) {
                _0x513b39 = parseInt(_0x7de007.rows.item(0).vraitotal);
                _0x542e0e = _0x1dba0d / _0x513b39 * 100;
                let _0x3d8823 = parseInt(_0x542e0e) == 100 ? "class='progend'" : '';
                _0xfcd58e.style.animation = "appear .9s " + _0x464205 / 5 + "s forwards";
                let _0x230f46 = _0x557c23.split(',').slice();
                if (_0x230f46.length != 0) {
                  db.transaction(function (_0x44dc13) {
                    _0x44dc13.executeSql("SELECT emoji,id FROM categorie WHERE id IN(" + generer_args(_0x230f46.length) + ')', _0x230f46, function (_0x49fff0, _0x33004f) {
                      let _0x55b39d = _0x33004f.rows.length > 3 ? 3 : _0x33004f.rows.length;
                      let _0x3a116c = 0;
                      html_final = "<b>";
                      for (var _0x4fa5f2 = 0; _0x4fa5f2 < _0x55b39d; _0x4fa5f2++) {
                        if (_0x230f46.includes('' + _0x33004f.rows.item(_0x4fa5f2).id + '') && parseInt(_0x33004f.rows.item(_0x4fa5f2).id) != 1) {
                          html_final += '<i>' + _0x33004f.rows.item(_0x4fa5f2).emoji + "</i>";
                          _0x3a116c++;
                        }
                      }
                      html_final += "</b>";
                      if (_0x3a116c == 0) {
                        html_final = '';
                      }
                      _0xfcd58e.innerHTML = "<img src='" + _0x577754 + "'" + " loading='lazy'><span><b>" + unescapeHtml(_0x4d33fc) + "</b><i>De " + unescapeHtml(_0x11c521) + "</i><span><progress " + _0x3d8823 + " value='" + _0x542e0e + "' max='100'></progress>" + html_final + "</span></span>";
                      _0x5b75ff.appendChild(_0xfcd58e);
                    });
                  });
                } else {}
              });
            });
          } else {
            _0x542e0e = _0x44bb20 / _0x153865 * 100;
            let _0x572180 = parseInt(_0x542e0e) == 100 ? "class='progend'" : '';
            _0xfcd58e.style.animation = "appear .9s " + _0x464205 / 5 + "s forwards";
            let _0x597e4f = _0x557c23.split(',').slice();
            if (_0x597e4f.length != 0) {
              db.transaction(function (_0x146387) {
                _0x146387.executeSql("SELECT emoji,id FROM categorie WHERE id IN(" + generer_args(_0x597e4f.length) + ')', _0x597e4f, function (_0x726eb8, _0x4d1264) {
                  let _0x46e1a0 = _0x4d1264.rows.length > 3 ? 3 : _0x4d1264.rows.length;
                  let _0x8a7fe9 = 0;
                  html_final = "<b>";
                  for (var _0x399250 = 0; _0x399250 < _0x46e1a0; _0x399250++) {
                    if (_0x597e4f.includes('' + _0x4d1264.rows.item(_0x399250).id + '') && parseInt(_0x4d1264.rows.item(_0x399250).id) != 1) {
                      html_final += "<i>" + _0x4d1264.rows.item(_0x399250).emoji + '</i>';
                      _0x8a7fe9++;
                    }
                  }
                  html_final += "</b>";
                  if (_0x8a7fe9 == 0) {
                    html_final = '';
                  }
                  _0xfcd58e.innerHTML = "<img src='" + _0x577754 + "'" + " loading='lazy'><span><b>" + unescapeHtml(_0x4d33fc) + "</b><i>De " + unescapeHtml(_0x11c521) + "</i><span><progress " + _0x572180 + " value='" + _0x542e0e + "' max='100'></progress>" + html_final + "</span></span>";
                  _0x5b75ff.appendChild(_0xfcd58e);
                });
              });
            } else {}
          }
        }
      });
    });
  }
  async function deja_lu(_0x3937be) {
    var _0x14f1f5;
    var _0x6fa676;
    db.transaction(function (_0x4b98b9) {
      _0x4b98b9.executeSql("SELECT lu FROM chapitres WHERE comic=? AND chapitre=? LIMIT 1", [parseInt(localStorage.webtoon), _0x3937be], function (_0x5942c1, _0x423fbd) {
        _0x14f1f5 = _0x423fbd.rows.item(0).lu;
        if (parseInt(_0x14f1f5) == 1) {
          _0x6fa676 = "black";
        } else {
          _0x6fa676 = "silver";
        }
      });
    }, function (_0x347ce0) {}, function () {
      console.log(_0x6fa676);
      return _0x6fa676;
    });
  }
  function set_chapters(_0xebafe6, _0x2696e7) {
    var _0x4f511e;
    var _0x1ee96f;
    var _0x918328;
    _$("liste_chapitres").innerHTML = '';
    for (let _0xfff238 = 0; _0xfff238 < _0xebafe6.length; _0xfff238++) {
      let _0x29d284 = document.createElement('span');
      db.transaction(function (_0x5403e3) {
        _0x5403e3.executeSql("SELECT lu,pris,note FROM chapitres WHERE comic=? AND chapitre=? LIMIT 1", [parseInt(localStorage.webtoon), _0xebafe6[_0xfff238]], function (_0x51d3e9, _0x56ba19) {
          _0x4f511e = _0x56ba19.rows.item(0).lu;
          pris_val = _0x56ba19.rows.item(0).pris;
          note_val = _0x56ba19.rows.item(0).note;
          if (parseInt(_0x4f511e) == 1) {
            _0x1ee96f = "var(--background)";
            if (parseInt(pris_val) == 1) {
              _0x1ee96f = '#273c75';
            }
          } else {
            _0x1ee96f = "silver";
          }
        });
      }, function (_0x5bb22a) {}, function () {
        _0x918328 = _0x1ee96f;
        let _0x40a4e7 = note_val == null || note_val == undefined || note_val.length < 1 ? '' : "<i>" + unescapeHtml(note_val) + "</i>";
        _0x29d284.innerHTML = "<b>" + unescapeHtml(_0xebafe6[_0xfff238]) + "</b>" + _0x40a4e7;
        _0x29d284.setAttribute('id', unescapeHtml(_0xebafe6[_0xfff238]));
        _0x29d284.setAttribute('onclick', "lire_chapitre('" + _0xebafe6 + "','" + _0xebafe6[_0xfff238] + "'," + _0xfff238 + ')');
        _0x29d284.style.borderLeft = "5px " + _0x918328 + " solid";
        if (_0x1ee96f == '#273c75') {
          _0x29d284.setAttribute("class", "telecharge");
        }
        _$("liste_chapitres").appendChild(_0x29d284);
      });
    }
  }
  function escapeHtml(_0x3dfc1c) {
    return _0x3dfc1c.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  function uunescapeHtml(_0x42b40c) {
    return _0x42b40c.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, "\"").replace(/&#039;/g, "'");
  }
  function unescapeHtml(_0x468681) {
    var _0x76119b = document.createElement("div");
    _0x76119b.innerHTML = _0x468681;
    return _0x76119b.textContent || _0x76119b.innerText || '';
  }
  function removeChildren(_0x1f541d) {
    while (_0x1f541d.firstChild) {
      _0x1f541d.removeChild(_0x1f541d.firstChild);
    }
  }
  function show_ad() {
    if (localStorage.importer == '1' && window.navigator.onLine) {
      bloquer("lapub", 2, 1);
      show_admob_ad();
    }
  }
  function verifier(_0x2b2d87) {
    if (_0x2b2d87) {
      var _0x472772 = new XMLHttpRequest();
      _0x472772.open("HEAD", _0x2b2d87, false);
      _0x472772.send();
      if (_0x472772.status == 200) {
        console.log("Fichier présent");
      } else {
        console.log("Fichier absent");
      }
      return _0x472772.status == 200;
    } else {
      notif("Impossible de vérifier");
      return false;
    }
  }
  function avorter(_0x16293d, _0x2dc115, _0x35bece) {
    fileTransfer = new FileTransfer();
    fileTransfer.abort();
    _$("telecharger").style.animation = "end_download 2s forwards";
    notif("Enregistrement annulé");
    setTimeout(() => {
      _$("telecharger").addEventListener('click', () => {
        telecharger(_0x16293d, localStorage.webtoon + '_' + _0x2dc115 + '.' + _0x35bece);
        _$("telecharger").style.animation = "downloading 2s infinite forwards";
        _$("telecharger").addEventListener("click", () => {
          avorter(_0x16293d, _0x2dc115, _0x35bece);
        });
      });
    }, 2000);
  }
  function telecharger(_0x36dc8a, _0x3b343b) {
    var _0x34f809 = new FileTransfer();
    var _0x46c588 = "cdvfile://localhost/persistent/downloads/" + _0x3b343b;
    _0x34f809.download(_0x36dc8a, _0x46c588, function (_0x180e99) {
      _$("telecharger").onclick = () => {};
      db.transaction(async function (_0x21c396) {
        _0x21c396.executeSql("UPDATE chapitres SET pris=1,download=? WHERE comic=? AND chapitre=?", [_0x3b343b, parseInt(localStorage.webtoon), localStorage.chapitre_actuel], async function (_0x40dcb4, _0x4eadb6) {
          notif("Enregistrement OK");
          _$("telecharger").style.animation = "end_download 2s forwards";
        });
        ;
      });
    }, function (_0x170623) {
      notif("Problème d'enregistrement'");
      _$("telecharger").style.animation = '';
      _$("telecharger").onclick = () => {
        _$("telecharger").onclick = () => {};
        telecharger(_0x36dc8a, _0x3b343b);
        _$("telecharger").style.animation = "downloading 2s infinite forwards";
      };
    });
  }
  function creer_fermer(_0x1ca9c7) {
    if (_$("fermer") != null && _$("fermer") != undefined) {
      _$("fermer").remove();
    }
    let _0x4bba1d = document.createElement('b');
    _0x4bba1d.setAttribute('id', "fermer");
    _0x4bba1d.setAttribute("onclick", "div_down('" + _0x1ca9c7 + "')");
    _$(_0x1ca9c7).appendChild(_0x4bba1d);
  }
  var cache_comm;
  var comment_up = 0;
  function commenter(_0x2c5f4d, _0x37d607) {
    _0x2c5f4d.onclick = () => {};
    if (_0x37d607.length < 1) {
      notif("Pas encore chargé");
      _0x2c5f4d.onclick = () => {
        commenter(_0x2c5f4d, _0x37d607);
      };
    }
    if (_0x37d607 == -1) {
      _$("comments").innerHTML = "<div id='connectetoi'><img id='side_left' src='' onclick='rager()'><div id='side_right'><h4>On se connecte (anonymement) pour commenter!</h4><input type='text' id='pseudoo' placeholder='Ton pseudo ?'><input type='button' onclick='entrerdedans()' value='Je me connecte'></div></div>";
      0;
      _$("comments").style.animation = "div_up .5s forwards";
      creer_fermer("comments");
      setTimeout(() => {
        _0x2c5f4d.onclick = () => {
          commenter(_0x2c5f4d, _0x37d607);
        };
      }, 500);
    } else {
      if (zone_com_ok == 0) {
        afficher(_0x37d607, -1);
      }
      _$("comments").style.animation = "div_up .5s forwards";
      creer_fermer("comments");
      setTimeout(() => {
        _0x2c5f4d.onclick = () => {
          commenter(_0x2c5f4d, _0x37d607);
        };
      }, 500);
    }
    comment_up = 1;
  }
  var percent_complete = null;
  var percent_time = null;
  var actu_download;
  var lienn;
  var chap_actu;
  var actual_extension;
  var xhr_chapitre;
  async function lire_chapitre(_0x820fa3, _0x319f56, _0x1f9b7c) {
    if (loadingTask != null && loadingTask != undefined) {
      loadingTask.destroy();
      loadingTask = null;
    }
    if (renderTask != null && renderTask != undefined) {
      renderTask.cancel();
    }
    if (xhr_chapitre != null && xhr_chapitre != undefined) {
      xhr_chapitre.addEventListener("progress", function (_0x5b2b8e) {});
      xhr_chapitre.abort();
      xhr_chapitre = null;
    }
    truc_fini = 0;
    let _0x3e6218 = 0;
    degager_suite();
    reset_emotes();
    truc_en_cours = 1;
    _$("telecharger").onclick = () => {};
    _$("ouvrir_avec").onclick = () => {};
    _$("telecharger").style.animation = '';
    _$("telecharger").style.filter = "saturate(0)";
    _$("telecharger").style.background = "#BD0052 url(img/save_white.png) no-repeat 50% 50%";
    _$("telecharger").style.backgroundSize = "45% 45%";
    _$("commentaire").setAttribute("onclick", "commenter(this,'')");
    cmt_deja = '';
    zone_com_ok = 0;
    _$("comments").innerHTML = '';
    if (lire) {
      lecture(_$("lecture"));
    }
    setTimeout(() => {
      if (webtoon_actu != parseInt(localStorage.webtoon) || localStorage.chapitre_actuel != _0x319f56) {
        _0x3e6218 = 1;
      }
      webtoon_actu = parseInt(localStorage.webtoon);
      _0x820fa3 = _0x820fa3.split(',');
      let _0x2d89b2 = _$("pdf_chapitre");
      if (!lecteur_afficher) {
        swipe_in(_$("div_pdf_chapitre"), 6);
        setTimeout(() => {
          fade(_$("controls"), 7, 'in');
          setTimeout(() => {
            fade(_$('controls'), 9, 'out');
          }, 3500);
        }, 800);
      }
      bg_image(_0x2d89b2, "url(img/loading2.gif)");
      let _0x52c4a9 = _$('navigation');
      localStorage.chapitre_actuel = _0x319f56;
      setTimeout(() => {
        notifier(localStorage.chapitre_actuel);
      }, 1000);
      removeChildren(_0x2d89b2);
      removeChildren(_0x52c4a9);
      _0x2d89b2.innerHTML = "<div id='progress-bar'></div>";
      _0x52c4a9.innerHTML = '';
      let _0x3d98ed = document.createElement("button");
      let _0x56c3ae = document.createElement("button");
      _0x3d98ed.innerHTML = "&#8592;";
      _0x56c3ae.innerHTML = "&#8594;";
      _0x56c3ae.setAttribute('class', "nav_btn");
      _0x3d98ed.setAttribute("class", "nav_btn");
      let _0x2c2812 = 1;
      if (_0x1f9b7c == 0) {
        _0x3d98ed.style.opacity = 0.5;
        _0x3d98ed.setAttribute("onclick", "nothing()");
        if (_0x1f9b7c == _0x820fa3.length - 1) {
          _0x2c2812 = 0.5;
        } else {
          _0x2c2812 = 1;
        }
        _0x56c3ae.style.opacity = _0x2c2812;
        _0x56c3ae.setAttribute("onclick", "lire_chapitre('" + _0x820fa3 + "','" + _0x820fa3[_0x1f9b7c + 1] + "'," + (_0x1f9b7c + 1) + ')');
        ;
      } else if (_0x1f9b7c == _0x820fa3.length - 1) {
        _0x3d98ed.style.opacity = 1;
        _0x3d98ed.setAttribute("onclick", "lire_chapitre('" + _0x820fa3 + "','" + _0x820fa3[_0x1f9b7c - 1] + "'," + (_0x1f9b7c - 1) + ')');
        _0x56c3ae.style.opacity = 0.5;
        _0x56c3ae.setAttribute("onclick", "nothing()");
      } else {
        _0x3d98ed.style.opacity = 1;
        _0x3d98ed.setAttribute("onclick", "lire_chapitre('" + _0x820fa3 + "','" + _0x820fa3[_0x1f9b7c - 1] + "'," + (_0x1f9b7c - 1) + ')');
        _0x56c3ae.style.opacity = 1;
        _0x56c3ae.setAttribute("onclick", "lire_chapitre('" + _0x820fa3 + "','" + _0x820fa3[_0x1f9b7c + 1] + "'," + (_0x1f9b7c + 1) + ')');
      }
      _0x52c4a9.appendChild(_0x3d98ed);
      _0x52c4a9.appendChild(_0x56c3ae);
      actual_extension = '';
      var _0x5acf84 = 0;
      db.transaction(async function (_0x27270b) {
        let _0x41b30a = 0;
        _0x27270b.executeSql("SELECT lu,note FROM chapitres WHERE comic=? AND chapitre=? LIMIT 1", [parseInt(localStorage.webtoon), localStorage.chapitre_actuel], async function (_0x21243a, _0x43dc96) {
          _0x41b30a = parseInt(_0x43dc96.rows.item(0).lu);
          if (_0x3e6218 == 1 && parseInt(_0x43dc96.rows.item(0).lu) != 1) {
            show_ad();
          }
          if (_$('div_note') != undefined && _$('div_note') != null) {
            removee(_$('div_note'));
          }
          let _0x3107e1 = _0x43dc96.rows.item(0).note;
          if (_0x3107e1 != null && _0x3107e1 != undefined && _0x3107e1.length != 0) {
            show_note(_0x3107e1);
          }
          if (_0x41b30a != 1) {
            _0x21243a.executeSql("UPDATE chapitres SET lu=1 WHERE comic=? AND chapitre=?", [parseInt(localStorage.webtoon), localStorage.chapitre_actuel], function (_0x6f19b8, _0x420e65) {
              _0x6f19b8.executeSql("UPDATE comic SET lus=lus+1 WHERE id=?", [parseInt(localStorage.webtoon)]);
            });
            localStorage.sukoru = parseInt(localStorage.sukoru) + 30;
            up_phes(1);
          }
        });
        _0x27270b.executeSql("SELECT lien,id,download FROM chapitres WHERE comic=? AND chapitre=? LIMIT 1", [parseInt(localStorage.webtoon), localStorage.chapitre_actuel], async function (_0x1d2155, _0x1eed87) {
          lienn = _0x1eed87.rows.item(0).lien;
          cache_comm = lienn;
          if (connecter) {
            _$("commentaire").setAttribute("onclick", "commenter(this,\"" + encodeURIComponent(cache_comm) + "\")");
          } else {
            _$("commentaire").setAttribute("onclick", "commenter(this,-1)");
          }
          let _0x8130bf = _0x1eed87.rows.item(0).download;
          let _0x2ae446 = '';
          if (_0x8130bf != null && _0x8130bf != undefined) {
            _0x2ae446 = get_ext(_0x8130bf);
            actu_download = _0x8130bf;
          }
          chap_actu = _0x1eed87.rows.item(0).id;
          _$("ouvrir_avec").onclick = () => {
            window.open(lienn, "_system");
          };
          if (verifier("cdvfile://localhost/persistent/downloads/" + _0x8130bf)) {
            lienn = "cdvfile://localhost/persistent/downloads/" + _0x8130bf;
            switch (_0x2ae446) {
              case "zip":
                actual_extension = "zip";
                break;
              case 'pdf':
                actual_extension = 'pdf';
                break;
            }
            _0x5acf84 = 1;
            lancer_lecture(chap_actu, _0x5acf84, actual_extension, lienn, null);
          } else {
            _0x5acf84 = 0;
            xhr_chapitre = new XMLHttpRequest();
            xhr_chapitre.open("GET", lienn, true);
            percent_time = setTimeout(() => {
              truc_fini = 0;
              if (percent_complete == null || percent_complete < 0.1) {
                let _0x440cae = document.createElement('div');
                _0x440cae.setAttribute('id', "probleme");
                if (dark_mode == 1) {
                  _0x440cae.setAttribute("class", "dark_probleme");
                }
                _0x440cae.setAttribute("onclick", "fader(this,2,'out')");
                _0x440cae.innerHTML = "<div id='instructions'><h3>Hm.. Problème de chargement?</h3><h4>Essaie ceci</h4><span><i>* D'abord relance le chapitre</i><i>* Vérifie qu'internet marche bien</i><i>* Essaie de changer ton DNS avec une appli comme <b>1.1.1.1 + WARP</b>, ça prend 10 secondes.</i></span></div>";
                _0x2d89b2.appendChild(_0x440cae);
              }
            }, 15000);
            xhr_chapitre.addEventListener("progress", function (_0x2688c5) {
              percent_complete = _0x2688c5.loaded / _0x2688c5.total * 100;
              let _0x4a411e = dark_mode == 1 ? "#2f3640" : "white";
              _$("progress-bar").style.background = "radial-gradient(closest-side, " + _0x4a411e + " 30%, transparent 40% 100%), conic-gradient(var(--background) " + percent_complete + "%, " + _0x4a411e + " 0)";
              if (percent_complete >= 99.9999) {
                _$("progress-bar").remove();
                percent_complete = null;
              }
            });
            xhr_chapitre.addEventListener("readystatechange", function (_0xfd20a4) {
              if (xhr_chapitre.readyState == 2 && xhr_chapitre.status == 200) {
                if (percent_time != null && percent_time != undefined) {
                  clearTimeout(percent_time);
                  fader(_$("probleme"), 2, "out");
                }
              }
            });
            xhr_chapitre.responseType = "arraybuffer";
            xhr_chapitre.send();
            xhr_chapitre.onload = function () {
              if (this.status == 200) {
                var _0x34246f = xhr_chapitre.response;
                var _0x489bde = xhr_chapitre.getResponseHeader("Content-Type");
                switch (_0x489bde) {
                  case "application/pdf":
                    actual_extension = "pdf";
                    lancer_lecture(chap_actu, _0x5acf84, actual_extension, lienn, _0x34246f);
                    break;
                  case "application/zip":
                    actual_extension = "zip";
                    lancer_lecture(chap_actu, _0x5acf84, actual_extension, lienn, _0x34246f);
                    break;
                }
              }
            };
          }
        });
      });
    }, 300);
  }
  async function lancer_lecture(_0x653075, _0x37e312, _0x13ee4b, _0x134e74, _0x58b74b) {
    update_lus(localStorage.webtoon, _0x653075, localStorage.chapitre_actuel);
    show_lus(localStorage.lus.split(','));
    _$("ouvrir_avec").onclick = () => {
      window.open(encodeURI(_0x134e74), "_system");
    };
    let _0x5a85a4 = _$("telecharger");
    if (_0x37e312) {
      _$("telecharger").style.animation = '';
      _0x5a85a4.style.filter = "saturate(1)";
      _0x5a85a4.style.background = "#341f97 url(img/corbeille.png) no-repeat 50% 50%";
      _0x5a85a4.style.backgroundSize = "45% 45%";
      _$("telecharger").onclick = async () => {
        _$("telecharger").style.animation = "downloading 2s infinite forwards";
        db.transaction(async function (_0x1d84cc) {
          _0x1d84cc.executeSql("UPDATE chapitres SET pris=0 WHERE comic=? AND chapitre=?", [parseInt(localStorage.webtoon), localStorage.chapitre_actuel], async function (_0x47f361, _0xea49e1) {
            remove_file(actu_download);
            notif("Retiré!");
            _$("telecharger").style.animation = '';
            _0x5a85a4.style.filter = "saturate(1)";
            _0x5a85a4.style.background = "#BD0052 url(img/save_white.png) no-repeat 50% 50%";
            _0x5a85a4.style.backgroundSize = "45% 45%";
            _$("telecharger").onclick = () => {
              _$("telecharger").onclick = () => {};
              telecharger(_0x134e74, localStorage.webtoon + '_' + _0x653075 + '.' + _0x13ee4b);
              _$("telecharger").style.animation = "downloading 2s infinite forwards";
            };
          });
          ;
        });
      };
    } else {
      _0x5a85a4.style.filter = "saturate(1)";
      _$("telecharger").onclick = () => {
        _$("telecharger").onclick = () => {};
        telecharger(_0x134e74, localStorage.webtoon + '_' + _0x653075 + '.' + _0x13ee4b);
        _$("telecharger").style.animation = "downloading 2s infinite forwards";
      };
    }
    truc_en_cours = 0;
    if (_0x58b74b != null) {
      switch (_0x13ee4b) {
        case "pdf":
          nombre_de_pages(_0x58b74b);
          break;
        case "zip":
          lire_zip(_0x58b74b);
          break;
      }
    } else {
      choix_lecture(_0x134e74);
    }
  }
  function choix_lecture(_0x331e1f) {
    let _0x8fd240 = new XMLHttpRequest();
    _0x8fd240.open("GET", _0x331e1f, true);
    _0x8fd240.responseType = "arraybuffer";
    _0x8fd240.send();
    _0x8fd240.onload = function () {
      if (this.status == 200) {
        var _0x4bdecc = _0x8fd240.response;
        var _0x327ea4 = _0x8fd240.getResponseHeader("Content-Type");
        switch (_0x327ea4) {
          case "application/pdf":
            nombre_de_pages(_0x4bdecc);
            break;
          case "application/zip":
            lire_zip(_0x4bdecc);
            break;
        }
      }
    };
  }
  function lire_zip(_0x138e3a) {
    truc_fini = 0;
    JSZip.loadAsync(_0x138e3a).then(function (_0x56ce0b) {
      var _0x3398c5 = Object.keys(_0x56ce0b.files).filter(function (_0x20435f) {
        return /(.jpg|.png|.gif|.ps|.jpeg|.webp|.svg|.bmp|.ico|.tiff|.apng|.avif)$/.test(_0x20435f.toLowerCase());
      }).map(function (_0x5e0c6e) {
        var _0x4f542c = _0x56ce0b.files[_0x5e0c6e];
        return _0x4f542c.async("blob").then(function (_0x234dbd) {
          return [_0x5e0c6e, URL.createObjectURL(_0x234dbd)];
        });
      });
      return Promise.all(_0x3398c5);
    }).then(function (_0x54eb51) {
      sort_images("pdf_chapitre", _0x54eb51);
      truc_fini = 1;
      down_afficher(encodeURIComponent(cache_comm));
    })['catch'](function (_0x1c30a9) {
      console.error(_0x1c30a9);
    });
  }
  function sort_images(_0x1afeb7, _0x134775) {
    for (var _0x46267c = 0; _0x46267c < _0x134775.length; _0x46267c++) {
      _$(_0x1afeb7).innerHTML += "<img src='" + _0x134775[_0x46267c][1] + "' loading='lazy'>";
    }
  }
  function array_firsts(_0x47181a, _0x59250f) {
    let _0x429dc0 = [];
    for (var _0x4bea2d = 0; _0x4bea2d < _0x47181a.length; _0x4bea2d++) {
      _0x429dc0.push(_0x47181a[_0x4bea2d].split(_0x59250f)[0]);
    }
    return _0x429dc0.slice();
  }
  function show_lus(_0x2e75fe) {
    var _0xb37d43 = _0x2e75fe.slice();
    let _0x1c9420 = array_firsts(_0xb37d43.slice(), '--%%--').slice().toString();
    let _0x41cdd4 = _0x1c9420.slice().split(',');
    _$('blocs_lus').innerHTML = '';
    var _0x193bd2 = _$("blocs_lus");
    for (let _0x28e7e3 = _0x41cdd4.length - 1; _0x28e7e3 >= 0; _0x28e7e3--) {
      (async () => {
        let _0x4998a5 = _0x28e7e3;
        await db.transaction(_0x205ac8 => {
          _0x205ac8.executeSql("SELECT * FROM comic WHERE id=?", [parseInt(_0x41cdd4[_0x4998a5])], async (_0x13e13c, _0xf9d978) => {
            let _0x334d1e = _0xf9d978.rows.length;
            if (_0x334d1e > 0) {
              let _0x2670ae = document.createElement("div");
              var _0x39e2b0 = parseInt(_0xf9d978.rows.item(0).id);
              await db.transaction(async _0x490d12 => {
                await _0x490d12.executeSql("SELECT chapitre FROM chapitres WHERE id=? LIMIT 1", [parseInt(_0xb37d43[_0x4998a5].split('--%%--')[1])], (_0xe945a5, _0x3f3b8b) => {
                  let _0x202b84 = _0x3f3b8b.rows.item(0).chapitre;
                  _0x2670ae.setAttribute('id', _0x39e2b0);
                  _0x2670ae.onclick = () => {
                    show_comic(_0x39e2b0);
                    setTimeout(() => {
                      let _0x47d45f = _$('' + _0x202b84 + '').offsetTop;
                      _$("liste_chapitres").scrollTop = _0x47d45f - _$("liste_chapitres").offsetHeight - _$('' + _0x202b84 + '').offsetHeight * 3;
                      _$('' + _0x202b84 + '').style.animation = "zoomzoom 2s infinite ease-out";
                    }, 3000);
                  };
                });
              });
              _0x2670ae.style.animation = "appear .5s " + _0x28e7e3 / 8 + "s forwards";
              _0x2670ae.innerHTML = "<img src='" + _0xf9d978.rows.item(0).miniature + "'" + " loading='lazy'><span><b>" + unescapeHtml(_0xf9d978.rows.item(0).titre) + "</b></span>";
              _0x193bd2.appendChild(_0x2670ae);
            } else {
              let _0x495254 = document.createElement('i');
              _0x495254.setAttribute("class", 'ii');
              _0x495254.innerText = "...rien du tout. Vas-y lis un truc... Allez!";
              _0x193bd2.appendChild(_0x495254);
            }
          });
        });
      })();
    }
  }
  function update_lus(_0x353d7c, _0x59330e, _0x538e8a) {
    let _0x1a7db0 = [];
    let _0x3aabdc = _0x353d7c + "--%%--" + _0x59330e;
    if (localStorage.lus.length != 0) {
      _0x1a7db0 = localStorage.lus.split(',');
    }
    if (_0x1a7db0.length < 100) {
      if (_0x1a7db0.length > 0) {
        let _0x138e1e = array_firsts(_0x1a7db0, "--%%--");
        if (_0x138e1e.includes(_0x353d7c)) {
          let _0x4e9bc1 = _0x1a7db0.findIndex(_0x400dfb => {
            return _0x400dfb.split("--%%--")[0] == _0x353d7c;
          });
          _0x1a7db0.splice(_0x4e9bc1, 1);
          _0x1a7db0.push(_0x3aabdc);
          localStorage.lus = _0x1a7db0.toString();
        } else {
          _0x1a7db0.push(_0x3aabdc);
          localStorage.lus = _0x1a7db0.toString();
        }
      } else {
        _0x1a7db0.push(_0x3aabdc);
        localStorage.lus = _0x1a7db0.toString();
      }
    } else {
      _0x1a7db0.shift();
      localStorage.lus = _0x1a7db0.toString();
      update_lus(_0x353d7c, _0x59330e, _0x538e8a);
    }
  }
  function get_chapter_link() {
    db.transaction(function (_0x5005ff) {
      _0x5005ff.executeSql("SELECT lien FROM chapitres WHERE comic=? AND chapitre=? LIMIT 1", [parseInt(localStorage.webtoon), localStorage.chapitre_actuel], function (_0x2129e2, _0x51a177) {
        lienn = _0x51a177.rows.item(0).lien;
        return lienn;
      });
    });
  }
  function nothing(_0x5e1691) {}
  var infos_affichees = 0;
  function bg_image(_0xf4f821, _0x43e6de) {
    _0xf4f821.style.backgroundImage = _0x43e6de;
    if (_0x43e6de != "none") {
      _0xf4f821.style.backgroundSize = "90px 90px";
    }
  }
  function no_ext(_0x15fb81, _0x48323e) {
    _0x48323e = '.' + _0x48323e;
    let _0x477443 = _0x15fb81.replace(_0x48323e, '');
    return _0x477443;
  }
  function get_ext(_0x41cf3d) {
    let _0x4c3b65 = _0x41cf3d.substring(_0x41cf3d.lastIndexOf('.') + 1);
    return _0x4c3b65;
  }
  function swipe_in(_0x49d424, _0x3743b7) {
    let _0x16e7bc = Math.round(Math.random());
    if (_0x16e7bc) {
      _0x49d424.style.animation = "left_swipe_chapter ." + _0x3743b7 + "s forwards";
    } else {
      _0x49d424.style.animation = "right_swipe_chapter ." + _0x3743b7 + "s forwards";
    }
    lecteur_afficher = 1;
    down_infos_div(_$('chapitres'), _0x3743b7);
    couche_nav += 2;
  }
  function successFunction() {}
  function errorFunction() {}
  function noclick(_0x12b500) {
    _0x12b500.addEventListener("click", _0x1b0fbc => {
      _0x1b0fbc.preventDefault();
    });
  }
  function fade(_0x3bbeb7, _0x39f8e9, _0x531390) {
    switch (_0x3bbeb7.getAttribute('id')) {
      case "manip":
        _0x3bbeb7.style.animation = "leftoRight_" + _0x531390 + " ." + _0x39f8e9 + "s forwards";
        break;
      case "controls":
        _0x3bbeb7.style.animation = 'downoUp_' + _0x531390 + " ." + _0x39f8e9 + "s forwards";
        break;
      default:
        _0x3bbeb7.style.animation = "fade_" + _0x531390 + " ." + _0x39f8e9 + "s forwards";
    }
  }
  function fader(_0x638802, _0x103382, _0x4b9e05) {
    if (_0x638802 != undefined && _0x638802 != null) {
      let _0xeb691e = _0x103382 * 1000;
      fade(_0x638802, _0x103382, _0x4b9e05);
      setTimeout(() => {
        _0x638802.style.display = 'none';
        _0x638802.remove();
      }, _0xeb691e);
    }
  }
  function swipe_out(_0x2ab34f, _0x1b5a28) {
    if (loadingTask != null && loadingTask != undefined) {
      loadingTask.destroy();
      loadingTask = null;
    }
    if (renderTask != null && renderTask != undefined) {
      renderTask.cancel();
    }
    if (xhr_chapitre != null && xhr_chapitre != undefined) {
      xhr_chapitre.addEventListener('progress', function (_0xd639ee) {});
      xhr_chapitre.abort();
      xhr_chapitre = null;
    }
    truc_en_cours = 0;
    truc_fini = 1;
    reset_style();
    _$("pdf_chapitre").style.height = "100%";
    _$("div_pdf_chapitre").style.height = '100vh';
    truc_en_cours = 1;
    truc_fini = 2;
    if (lire) {
      clearInterval(lire);
    }
    let _0x2ec54e = Math.round(Math.random());
    if (_0x2ec54e) {
      _0x2ab34f.style.animation = "left_swipe_chapter_out ." + _0x1b5a28 + "s forwards ease-out";
    } else {
      _0x2ab34f.style.animation = "right_swipe_chapter_out ." + _0x1b5a28 + "s forwards ease-out";
    }
    lecteur_afficher = 0;
    alreadys = [];
    down_infos_div(_$("chapitres"), _0x1b5a28);
    couche_nav--;
  }
  function down_infos_div(_0x2a46b2, _0x3f7306) {
    _0x2a46b2.style.animation = "down_info_webtoon ." + _0x3f7306 + "s forwards";
    infos_affichees = 0;
    reset_suppr(_$("supprimer"));
    couche_nav--;
  }
  function up_infos_div(_0x1cd66f, _0x5d916b) {
    _0x1cd66f.style.animation = "up_info_webtoon ." + _0x5d916b + "s forwards";
    infos_affichees = 1;
    couche_nav++;
  }
  function enligne() {
    return window.navigator.onLine ? 1 : 0;
  }
  var message_pub = ["On reprend juste après", "Étire un peu les doigts", "Apprête-toi déjà pour la suite", "Petit petit break...", "On reprend son souffle", "La qualité du milieu est aussi très bonne", "Dernier bouton à gauche pour ouvrir ailleurs", "Bouton tout en haut à gauche pour la lecture auto", "Si la HD bug, essaie la quali du milieu", "T'as déjà essayé les filtres?", "Une recherche vide affiche tous les webtoons.", "La recherche c'est par titre, auteur, ou artiste", "Un double-clic pour zoomer", "T'as une meuf/un mec? On te trompe"];
  function bloquer(_0x40110e, _0x5ed74b, _0x10759c) {
    let _0x525469 = window.navigator.onLine ? 1 : 0;
    if (_0x525469 == 0 || _0x10759c == 1) {
      let _0x56bbf9 = _$(_0x40110e);
      if (_0x56bbf9 == undefined) {
        let _0x242718 = document.createElement("div");
        _0x242718.setAttribute('id', _0x40110e);
        _0x242718.setAttribute('onclick', "bloquer(" + _0x40110e + ',' + _0x5ed74b + ",0)");
        let _0x241103;
        switch (_0x5ed74b) {
          case 1:
            _0x241103 = "<img src=\"img/no-internet.png\"><b>Hum... T'as un problème de connexion?</b><i>Appuie n'importe où pour réessayer.</i>";
            break;
          case 2:
            set_bar_color("#e67e22");
            let _0x1e7fd0 = Math.round(Math.random() * (message_pub.length - 1));
            _0x241103 = "<img src=\"img/loading.gif\"><b>Je charge la pub</b><i>" + message_pub[_0x1e7fd0] + "</i>";
            break;
        }
        _0x242718.innerHTML = _0x241103;
        _0x242718.style.animation = "appear 4s forwards";
        _$("body").appendChild(_0x242718);
      }
    } else if (_0x5ed74b != 2) {
      retirer_bloc(_0x40110e);
    }
  }
  function notif(_0x1f5bd3) {
    let _0x1b1fd0 = document.createElement("span");
    _0x1b1fd0.setAttribute('class', "notif");
    _0x1b1fd0.innerHTML = _0x1f5bd3;
    _$("body").appendChild(_0x1b1fd0);
    setTimeout(() => {
      _0x1b1fd0.remove();
    }, 5000);
  }
  if (localStorage.rage == 'hum') {
    notif("Je t'ai dit de reset...");
    setTimeout(() => {
      navigator.app.exitApp();
    }, 2000);
  }
  function removee(_0x59d2f4) {
    _0x59d2f4.style.filter = "opacity(0)";
    setTimeout(() => {
      _0x59d2f4.remove();
    }, 1000);
  }
  function show_note(_0x319dcc) {
    let _0x34d859 = document.createElement('div');
    _0x34d859.setAttribute('id', "div_note");
    _0x34d859.innerHTML = _0x319dcc;
    _0x34d859.setAttribute('onclick', "removee(this)");
    _$("div_pdf_chapitre").appendChild(_0x34d859);
  }
  function notifier(_0x38c1d2) {
    if (_0x38c1d2 != "Mise à jour...") {
      if (_$('notif_upp') == undefined || _$('notif_upp') == null) {
        let _0x5c75c6 = document.createElement("span");
        _0x5c75c6.setAttribute('id', 'notif_upp');
        _0x5c75c6.setAttribute("class", "notif_up");
        _0x5c75c6.innerHTML = "<span><i>" + _$("metas_webtoon").getElementsByTagName('b')[0].innerText + "</i><b>" + unescapeHtml(_0x38c1d2) + "</b></span><img src='" + _$("infos_webtoon").getElementsByTagName("img")[0].src + "'>";
        _$("div_pdf_chapitre").appendChild(_0x5c75c6);
        setTimeout(() => {
          _0x5c75c6.remove();
        }, 4500);
      }
    } else {
      let _0x2d2b7c = document.createElement("span");
      _0x2d2b7c.setAttribute('id', 'maj');
      _0x2d2b7c.setAttribute("class", 'maj');
      _0x2d2b7c.innerHTML = _0x38c1d2;
      _$("body").appendChild(_0x2d2b7c);
      setTimeout(() => {
        _0x2d2b7c.remove();
      }, 4500);
    }
  }
  function degager_suite() {
    if (lecture_active == 0) {
      if (_$('apres') != undefined && _$('apres') != null) {
        fader(_$("apres"), 2, 'out');
        _$("pdf_chapitre").setAttribute('onscroll', "end_ctrl()");
      }
    }
  }
  var suitee = ["Allez suivant", "On continue", "On enchaîne", "Au suivant", "Au prochain"];
  var tapedTwice = false;
  var zoomed = 0;
  var func_tps;
  const _0x4de122 = {
    x: 0x0,
    y: 0x0
  };
  var coords = [_0x4de122];
  function takecoord(_0x364938) {
    coords[0].x = _0x364938.touches[0].clientX;
    coords[0].y = _0x364938.touches[0].clientY;
  }
  function degager_emojis() {
    const _0x44c58c = {
      FJlAg: 'emojis'
    };
    _0x44c58c.BaGqN = "emoji_back .5s forwards";
    _$('emojis').style.animation = _0x44c58c.BaGqN;
  }
  function show_things() {
    if (truc_fini == 1) {
      let _0x515f0f = _$("pdf_chapitre");
      if (_0x515f0f.offsetHeight + _0x515f0f.scrollTop >= _0x515f0f.scrollHeight - 10 && (_$("apres") == undefined || _$("apres") == null) && _$("pdf_chapitre").childNodes.length > 0) {
        let _0x1bef12 = document.createElement("button");
        _0x1bef12.setAttribute('id', "apres");
        _0x515f0f.setAttribute("onscroll", "end_ctrl();degager_suite();degager_emojis()");
        _0x1bef12.innerHTML = suitee[Math.round(Math.random() * (suitee.length - 1))] + "<b>&#9658;</b>";
        let _0x2c6be4 = document.getElementsByClassName("nav_btn")[1];
        let _0x36cd5d = _0x2c6be4.getAttribute('onclick');
        if (_0x36cd5d != "nothing()") {
          _0x1bef12.setAttribute('onclick', _0x36cd5d);
          _$("div_pdf_chapitre").appendChild(_0x1bef12);
        }
        _$("emojis").style.animation = "emoji_come .5s forwards";
      }
    }
    show_ctrls();
    notifier(localStorage.chapitre_actuel);
    niveau_lecture();
  }
  function tapHandler(_0x57b13c) {
    if (!tapedTwice) {
      tapedTwice = true;
      setTimeout(() => {
        tapedTwice = false;
      }, 250);
      return false;
    }
    _0x57b13c.preventDefault();
    if (rotated == 0) {
      clearTimeout(func_tps);
      let _0x11ab21 = _$("pdf_chapitre");
      if (!zoomed) {
        _0x11ab21.style.transform = "scale(1.9, 1.9)";
        zoomed = 1;
      } else {
        _0x11ab21.style.transform = "scale(1, 1)";
        zoomed = 0;
      }
    }
  }
  function detect_pinch(_0x33eb95) {
    if (_0x33eb95.touches.length > 1) {
      scaling = true;
    }
  }
  function supprimer_cache() {}
  function reset_cache() {}
  function checkcrypted(_0x3b1434) {
    let _0x4e94ca = (_0x3b1434.match(/%%%-%%%/g) || []).length;
    if (_0x4e94ca >= 7) {
      console.log("Ok non crypté");
      return 1;
    } else {
      let _0x3c52ed = (CryptoJS.AES.decrypt(_0x3b1434, "var i = 14226-11420334e10").toString(CryptoJS.enc.Utf8).match(/%%%-%%%/g) || []).length;
      if (_0x3c52ed >= 7) {
        console.log("Ok Crypté");
        return 2;
      } else {
        return -1;
      }
    }
  }
  function encrypto(_0x14b585) {
    return CryptoJS.AES.encrypt(_0x14b585, "var i = 14226-11420334e10").toString();
  }
  function decrypto(_0x49cb43) {
    return CryptoJS.AES.decrypt(_0x49cb43, "var i = 14226-11420334e10").toString(CryptoJS.enc.Utf8);
  }