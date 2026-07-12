#!/usr/bin/env node
/**
 * Apply French translations to fr.json
 * Comprehensive translation of all untranslated strings
 */
const fs = require('fs');
const path = require('path');

const msgDir = path.join(__dirname, '..', 'messages');
const enRaw = fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, '');
const frRaw = fs.readFileSync(path.join(msgDir, 'fr.json'), 'utf8').replace(/^\uFEFF/, '');

const en = JSON.parse(enRaw);
const fr = JSON.parse(frRaw);

// Deep merge function
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// French translations object
const frTranslations = {
  "common": {
    "intact": "Intact"
  },
  "header": {
    "logoAlt": "petsMetrics - Outils de santé pour animaux"
  },
  "footer": {
    "contact": "Contact"
  },
  "dogAge": {
    "lifeStage": {
      "cardTitle": "{stage} — {stageName}"
    }
  },
  "dogCalorie": {
    "form": {
      "coefficient": "coeff."
    }
  },
  "puppyGrowth": {
    "result": {
      "predictedRange": "{min} – {max} kg"
    }
  },
  "catBcs": {
    "result": {
      "bcsScore": "BCS {score}/9"
    }
  },
  "toxicChecker": {
    "result": {
      "source": "Source"
    }
  },
  "toxicLanding": {
    "aspcaPhone": "Centre antipoison ASPCA",
    "aspcaNumber": "(888) 426-4435",
    "petPoisonNumber": "(855) 764-7661"
  },
  "euTravel": {
    "form": {
      "destinationLabel": "Destination"
    }
  },
  "about": {
    "contact": "Contact"
  },
  "terms": {
    "contact": "Contact"
  },
  "nav": {
    "home": "Accueil",
    "dog": "Chien",
    "cat": "Chat",
    "shared": "Partagé",
    "profile": "Profil",
    "toggleNav": "Basculer la navigation",
    "switchLanguage": "Changer de langue"
  },
  "speciesToggle": {
    "label": "Sélectionner l'espèce"
  },
  "affiliateBanner": {
    "insurance": {
      "title": "Assurance animaux",
      "description": "Protégez votre animal avec les meilleures assurances.",
      "cta": "Comparer les offres"
    },
    "food": {
      "title": "Alimentation de qualité",
      "description": "Découvrez les marques recommandées par les vétérinaires.",
      "cta": "Acheter"
    },
    "amazon": {
      "title": "Fournitures pour animaux",
      "description": "Tout ce dont votre animal a besoin sur Amazon.",
      "cta": "Voir les produits"
    },
    "pdf_upsell": {
      "title": "Guide BARF PDF",
      "description": "Téléchargez le guide complet d'alimentation crue.",
      "cta": "Télécharger le PDF"
    }
  },
  "profile": {
    "noProfile": "Aucun profil sélectionné. Créez-en un dans la section Profil.",
    "empty": {
      "title": "Votre centre de commande animal",
      "subtitle": "Créez un profil en moins de 30 secondes. Plus jamais besoin de ressaisir les infos.",
      "cta": "Créer mon premier animal",
      "privacyLocal": "100% privé · Stocké uniquement sur votre appareil",
      "privacyNoAccount": "Pas de compte requis · Export/Import à tout moment"
    },
    "wizard": {
      "step1Title": "Pour quel type d'animal ?",
      "step1Dog": "Chien",
      "step1Cat": "Chat",
      "step1Hint": "Le choix définit le thème de couleur.",
      "step2TitleDog": "Parlez-nous de votre chien.",
      "step2TitleCat": "Parlez-nous de votre chat.",
      "step2NameLabel": "Nom de l'animal",
      "step2NamePlaceholder": "ex: Buddy, Luna, Max…",
      "step2BreedLabel": "Race",
      "step2BreedPlaceholder": "Rechercher ou sélectionner…",
      "step3Title": "Maintenant les chiffres.",
      "step3BirthDateLabel": "Date de naissance",
      "step3AgeLabel": "ou âge actuel",
      "step3AgeYears": "années",
      "step3AgeMonths": "mois",
      "step3WeightLabel": "Poids actuel",
      "step3WeightHint": "L'unité de poids est sauvegardée sur votre appareil.",
      "step4Title": "Quelques détails de santé.",
      "step4SexLabel": "Sexe",
      "step4Male": "Mâle",
      "step4Female": "Femelle",
      "step4NeuteredLabel": "Stérilisé ?",
      "step4NeuteredYes": "Oui",
      "step4NeuteredNo": "Non",
      "step4Why": "Pourquoi on demande : affecte les calculs caloriques.",
      "step5Title": "Presque terminé !",
      "step5PhotoLabel": "Ajouter une photo (optionnel)",
      "step5PhotoHint": "Les photos sont stockées localement.",
      "back": "Retour",
      "continue": "Continuer",
      "createButton": "Créer le profil",
      "step2NoBreedMatch": "Aucune race ne correspond.",
      "step2NoBreedsAvailable": "Aucune race disponible.",
      "step3AgeAriaLabel": "Méthode de saisie de l'âge",
      "step3WeightAriaLabel": "Unité de poids",
      "step5Unnamed": "(sans nom)"
    },
    "success": {
      "title": "Le profil de {name} est prêt !",
      "message": "Tous les outils se rempliront automatiquement avec les données de {name}.",
      "goToDashboard": "Aller au tableau de bord"
    },
    "backup": {
      "title": "Votre profil est sauvegardé sur cet appareil.",
      "body": "Si vous effacez votre navigateur ou changez d'appareil, téléchargez une sauvegarde :",
      "download": "Télécharger la sauvegarde",
      "skip": "Passer"
    },
    "dashboard": {
      "title": "Mes profils d'animaux",
      "quickStats": {
        "calories": "Calories quotidiennes",
        "humanAge": "Âge humain",
        "nextVaccine": "Prochain vaccin",
        "lifeStage": "Stade de vie",
        "comingSoon": "Bientôt"
      },
      "tools": {
        "title": "Tous les outils",
        "openWith": "Ouvrir avec les données de {name}"
      },
      "data": {
        "export": "Exporter JSON",
        "import": "Importer JSON",
        "edit": "Modifier le profil",
        "delete": "Supprimer le profil",
        "deleteConfirm": "Êtes-vous sûr ?Cette action est irréversible.",
        "importFailed": "Échec de l'import."
      },
      "addPet": "Ajouter un animal",
      "noProfiles": "Aucun profil trouvé."
    },
    "breadcrumb": {
      "home": "Accueil",
      "profile": "Mes profils d'animaux"
    }
  },
  "home": {
    "hero": {
      "title": "Un profil. Toutes les réponses.",
      "subtitle1": "Créez votre profil animal une fois — chaque calculateur se remplit automatiquement.",
      "subtitle2": "Pas de connexion. Pas d'IA. Juste de la science.",
      "dogCta": "Outils pour chiens",
      "catCta": "Outils pour chats",
      "trustLine": "200+ aliments · 14 outils · 400+ races · Normes AAHA, WSAVA & AAFCO",
      "cardPetName": "Buddy",
      "cardBreedAge": "Labrador · 3 ans · 28 kg",
      "cardCalories": "Calories : 1 240 kcal/jour",
      "cardAge": "Âge : ~33 ans humains",
      "cardVaccine": "Prochain vaccin : 15 juin 2026",
      "cardOpenProfile": "Ouvrir le profil complet"
    },
    "profileFocus": {
      "title": "Pourquoi petsMetrics est différent",
      "subtitle": "Les autres calculateurs vous font ressaisir les infos à chaque fois. Pas nous.",
      "step1": "Créer un profil animal",
      "step1Desc": "Entrez race, poids, date de naissance et statut de stérilisation.",
      "step2": "Ouvrir n'importe quel outil",
      "step2Desc": "Chaque calculateur lit votre profil automatiquement.",
      "step3": "Obtenir des réponses scientifiques",
      "step3Desc": "Formules AAHA / WSAVA / AAFCO. Sources citées.",
      "cta": "Créer mon profil — Gratuit"
    },
    "toolDiscovery": {
      "title": "Explorer nos outils",
      "tabDog": "Chien",
      "tabCat": "Chat",
      "tabAll": "Tous",
      "mostPopular": "Les plus populaires",
      "comingSoon": "Bientôt disponible",
      "tools": {
        "toxicChecker": {
          "name": "Vérificateur de toxicité",
          "desc": "Cet aliment est-il sûr ? Vérifiez 200+ articles instantanément."
        },
        "dogCalorie": {
          "name": "Calculateur de calories",
          "desc": "Combien nourrir quotidiennement ? Formule MER basée sur AAFCO."
        },
        "dogAge": {
          "name": "Calculateur d'âge",
          "desc": "Quel âge a votre chien en années humaines ? Normes AAHA."
        },
        "puppyGrowth": {
          "name": "Croissance du chiot",
          "desc": "Prédisez la taille adulte et suivez les courbes de croissance."
        },
        "dogVaccination": {
          "name": "Calendrier vaccinal",
          "desc": "Ne manquez jamais un vaccin. Chronologie personnalisée."
        },
        "dogGestation": {
          "name": "Calculateur de gestation",
          "desc": "Dates prévues et jalons étape par étape."
        },
        "catAge": {
          "name": "Calculateur d'âge",
          "desc": "Quel âge a votre chat en années humaines ? Normes AAHA/AAFP."
        },
        "catBcs": {
          "name": "BCS & Poids",
          "desc": "Votre chat est-il en surpoids ? Évaluation visuelle de 2 minutes."
        },
        "catHydration": {
          "name": "Calculateur d'hydratation",
          "desc": "La plupart des chats sont déshydratés. Découvrez combien d'eau Luna a besoin."
        },
        "catVaccination": {
          "name": "Calendrier vaccinal",
          "desc": "FVRCP, rage et plus programmés par âge et région."
        },
        "catGestation": {
          "name": "Calculateur de gestation",
          "desc": "Prédisez l'arrivée des chatons et les jalons vétérinaires."
        },
        "dogBarf": {
          "name": "Calculateur BARF",
          "desc": "Guide de portions d'alimentation crue par poids."
        },
        "catBarf": {
          "name": "Calculateur BARF",
          "desc": "Ratios d'alimentation crue pour chats."
        },
        "insurance": {
          "name": "Estimateur d'assurance",
          "desc": "Comparez les offres des meilleurs assureurs."
        },
        "euTravel": {
          "name": "Voyage UE",
          "desc": "Vérifiez les exigences de passeport et vaccins pour voyager dans l'UE."
        }
      }
    },
    "stats": {
      "tools": "Outils disponibles",
      "foods": "Aliments dans la base",
      "standards": "Normes AAHA / WSAVA",
      "noLogin": "Aucune connexion requise"
    },
    "featuredTool": {
      "emergencyTitle": "Urgence animal ?",
      "emergencyPhone": "Centre antipoison ASPCA : (888) 426-4435",
      "title": "Votre animal peut-il manger ça ?",
      "desc": "Vérifications instantanées pour 200+ aliments et plantes. Savoir avant de partager.",
      "searchPlaceholder": "Rechercher : \"raisins\", \"avocat\", \"lys\"…",
      "check": "Vérifier",
      "recentSearches": "Récent :",
      "openFull": "Ouvrir le vérificateur complet",
      "previewToxic": "— Toxique pour chiens & chats",
      "previewCaution": "— Sûr en petites quantités",
      "previewSafe": "— Sûr pour les chiens"
    }
  },
  "dog": {
    "guide": {
      "title": "🐕 Listes de contrôle par stade de vie",
      "description": "Listes étape par étape pour chaque stade de vie de votre chien. Imprimable, basé sur AAHA.",
      "open": "Voir la liste",
      "newPuppy": {
        "title": "Liste de contrôle nouveau chiot",
        "desc": "47 éléments essentiels pour les 16 premières semaines de votre chiot.",
        "aria": "Voir la liste de contrôle nouveau chiot",
        "meta": {
          "title": "Liste de contrôle nouveau chiot : Tout ce dont vous avez besoin | petsMetrics",
          "description": "Liste complète avec 47 éléments à vérifier. PDF imprimable, estimateur de coûts, calendrier."
        }
      },
      "puppyDevelopment": {
        "title": "Stades de développement du chiot",
        "desc": "Guide semaine par semaine de la naissance à 12 mois.",
        "aria": "Voir le guide des stades de développement"
      },
      "rescueDog": {
        "title": "Adopter un chien de refuge",
        "desc": "Guide d'ajustement 3-3-3 complet.",
        "aria": "Voir le guide d'adoption"
      },
      "seniorDog": {
        "title": "Soin du chien âgé",
        "desc": "32 éléments de surveillance de la santé pour les chiens vieillissants.",
        "aria": "Voir la liste de soins pour chien âgé"
      }
    },
    "hero": {
      "title": "Calculateurs de santé pour chiens",
      "subtitle": "Outils scientifiques pour les propriétaires de chiens.",
      "searchPlaceholder": "Rechercher des outils pour chiens…",
      "breadcrumb": "Accueil > Chien"
    },
    "profileBar": {
      "autofillActive": "Tous les outils se rempliront avec les données de {name}",
      "noProfile": "Créez un profil chien pour remplir automatiquement",
      "createCta": "Créer un profil — 30 sec"
    },
    "featuredTools": {
      "title": "Outils les plus utilisés",
      "heroCard": {
        "title": "Vérificateur d'aliments toxiques",
        "desc": "L'outil le plus recherché. Vérifiez instantanément 200+ aliments et plantes.",
        "tagline": "200+ aliments · Niveaux de sévérité · Ligne vétérinaire incluse",
        "cta": "Vérifier un aliment",
        "badge": "Le plus populaire"
      },
      "calorie": {
        "title": "Calculateur de calories",
        "desc": "Calculez les besoins caloriques exacts avec les formules AAFCO.",
        "cta": "Calculer"
      },
      "vaccination": {
        "title": "Calendrier vaccinal",
        "desc": "Ne manquez jamais un vaccin. Chronologie personnalisée pour votre chien.",
        "cta": "Voir le calendrier"
      }
    },
    "toolGrid": {
      "title": "Tous les outils pour chiens",
      "ageCalculator": {
        "desc": "Quel âge a votre chien en années humaines ?"
      },
      "puppyGrowth": {
        "desc": "Prédisez le poids adulte et suivez les courbes de croissance."
      },
      "gestation": {
        "desc": "Dates prévues et jalons pour les éleveurs."
      },
      "barf": {
        "desc": "Guide de portions d'alimentation crue par poids."
      },
      "insurance": {
        "desc": "Comparez les offres des meilleurs assureurs."
      },
      "rating": "P0",
      "priority": "P1",
      "open": "Ouvrir"
    },
    "seoContent": {
      "title": "À propos de ces calculateurs de santé",
      "intro": "Nos outils sont construits sur des normes vétérines évaluées par des pairs.",
      "faq1": "Quel est le calculateur d'âge le plus précis ?",
      "faq1Answer": "Notre calculateur utilise les directives AAHA 2023.",
      "faq2": "Comment calculer les besoins caloriques ?",
      "faq2Answer": "Notre calculateur utilise la formule MER d'AAFCO.",
      "faq3": "Quels vaccins mon chien a-t-il besoin ?",
      "faq3Answer": "Les vaccins essentiels incluent la rage et le DHPP.",
      "faq4": "Combien de temps les chiennes sont-elles gestantes ?",
      "faq4Answer": "Environ 63 jours (9 semaines)."
    },
    "breedContent": {
      "title": "Outils par race",
      "popularBreeds": "Races populaires",
      "viewAllBreeds": "Voir les 400+ races",
      "breeds": {
        "labrador": {
          "name": "Labrador Retriever",
          "calorie": "Calculateur de calories Labrador",
          "age": "Âge humain Labrador",
          "growth": "Courbe de croissance Labrador"
        },
        "germanShepherd": {
          "name": "Berger allemand",
          "calorie": "Calories quotidiennes Berger allemand",
          "age": "Âge humain Berger allemand"
        },
        "frenchBulldog": {
          "name": "Bouledogue français",
          "weight": "Guide de poids Bouledogue français",
          "calorie": "Calculateur de calories Bouledogue français"
        },
        "goldenRetriever": {
          "name": "Golden Retriever",
          "age": "Calculateur d'âge Golden Retriever",
          "calorie": "Besoins caloriques Golden Retriever"
        }
      }
    },
    "gestation": {
      "facts": "Faits sur la gestation canine"
    }
  },
  "cat": {
    "guide": {
      "title": "🐱 Listes de contrôle par stade de vie",
      "description": "Listes étape par étape pour chaque stade de vie de votre chat.",
      "open": "Voir la liste",
      "newKitten": {
        "title": "Liste de contrôle nouveau chaton",
        "desc": "40 éléments essentiels pour les 16 premières semaines de votre chaton.",
        "aria": "Voir la liste de contrôle nouveau chaton",
        "meta": {
          "title": "Liste de contrôle nouveau chaton : Tout ce dont vous avez besoin | petsMetrics",
          "description": "Liste complète avec 40 éléments à vérifier."
        }
      },
      "seniorCat": {
        "title": "Soins du chat âgé",
        "desc": "30 éléments de surveillance pour les chats vieillissants.",
        "aria": "Voir la liste de soins pour chat âgé"
      }
    },
    "hero": {
      "title": "Calculateurs de santé pour chats",
      "subtitle": "Outils de précision pour les propriétaires de chats d'intérieur.",
      "searchPlaceholder": "Rechercher des outils pour chats…",
      "breadcrumb": "Accueil > Chat"
    },
    "profileBar": {
      "autofillActive": "Tous les outils se rempliront avec les données de {name}",
      "noProfile": "Créez un profil chat pour remplir automatiquement",
      "createCta": "Créer un profil — 30 sec"
    },
    "featuredTools": {
      "title": "Outils essentiels pour chats",
      "heroCard": {
        "title": "Score corporel & Gestion du poids",
        "desc": "60% des chats d'intérieur sont en surpoids. Évaluation visuelle de 2 minutes.",
        "tagline": "Évaluation BCS · Plan de perte de poids · Normes WSAVA",
        "cta": "Évaluer mon chat",
        "badge": "Populaire"
      },
      "calorie": {
        "title": "Calculateur de calories",
        "desc": "Calculez les besoins caloriques exacts avec les formules AAFCO.",
        "cta": "Calculer"
      },
      "vaccination": {
        "title": "Calendrier vaccinal",
        "desc": "Ne manquez jamais un vaccin. Chronologie personnalisée pour votre chat.",
        "cta": "Voir le calendrier"
      }
    },
    "toolGrid": {
      "title": "Tous les outils pour chats",
      "ageCalculator": {
        "desc": "Quel âge a votre chat en années humaines ?"
      },
      "puppyGrowth": {
        "desc": "Prédisez le poids adulte et suivez les courbes de croissance."
      },
      "gestation": {
        "desc": "Dates prévues et jalons pour les éleveurs."
      },
      "barf": {
        "desc": "Guide de portions d'alimentation crue par poids."
      },
      "insurance": {
        "desc": "Comparez les offres des meilleurs assureurs."
      },
      "rating": "P0",
      "priority": "P1",
      "open": "Ouvrir"
    },
    "seoContent": {
      "title": "À propos de ces calculateurs de santé",
      "intro": "Nos outils sont construits sur des normes vétérinaires évaluées par des pairs.",
      "faq1": "Quel est le calculateur d'âge le plus précis ?",
      "faq1Answer": "Notre calculateur utilise les directives AAFP 2023.",
      "faq2": "Comment calculer les besoins caloriques ?",
      "faq2Answer": "Notre calculateur utilise la formule MER d'AAFCO.",
      "faq3": "Quels vaccins mon chat a-t-il besoin ?",
      "faq3Answer": "Les vaccins essentiels incluent la rage et le FVRCP.",
      "faq4": "Combien de temps les chattes sont-elles gestantes ?",
      "faq4Answer": "Environ 65 jours (9 semaines)."
    },
    "breedContent": {
      "title": "Outils par race",
      "popularBreeds": "Races populaires",
      "viewAllBreeds": "Voir toutes les races",
      "breeds": {
        "labrador": {
          "name": "Labrador Retriever",
          "calorie": "Calculateur de calories",
          "age": "Calculateur d'âge",
          "growth": "Courbe de croissance"
        },
        "germanShepherd": {
          "name": "Berger allemand",
          "calorie": "Calculateur de calories",
          "age": "Calculateur d'âge"
        },
        "frenchBulldog": {
          "name": "Bouledogue français",
          "weight": "Guide de poids",
          "calorie": "Calculateur de calories"
        },
        "goldenRetriever": {
          "name": "Golden Retriever",
          "age": "Calculateur d'âge",
          "calorie": "Calculateur de calories"
        }
      }
    },
    "gestation": {
      "facts": "Faits sur la gestation féline"
    }
  },
  "calculator": {
    "title": "Calculateur",
    "weight": "Poids",
    "age": "Âge",
    "breed": "Race",
    "sex": "Sexe",
    "status": "Statut",
    "calculate": "Calculer",
    "reset": "Réinitialiser",
    "result": "Résultat",
    "formula": "Formule",
    "source": "Source",
    "disclaimer": "Avertissement",
    "error": "Erreur",
    "invalid": "Entrée invalide",
    "required": "Requis",
    "lbs": "lb",
    "kgs": "kg",
    "years": "années",
    "months": "mois"
  },
  "dogAge": {
    "title": "Calculateur d'âge pour chiens",
    "subtitle": "Convertissez l'âge de votre chien en années humaines",
    "form": {
      "inputType": "Type de saisie",
      "dateMode": "Date de naissance",
      "ageMode": "Âge actuel",
      "birthDate": "Date de naissance",
      "currentAge": "Âge actuel",
      "years": "années",
      "months": "mois",
      "breedSize": "Taille de la race",
      "small": "Petite (< 10 kg)",
      "medium": "Moyenne (10-25 kg)",
      "large": "Grande (25-45 kg)",
      "giant": "Géante (> 45 kg)"
    },
    "result": {
      "title": "Résultat",
      "humanAge": "~{age} années humaines",
      "dogAge": "{age} années-chien",
      "lifeStage": "Stade de vie : {stage}",
      "equivalent": "Équivalent humain : {years} ans"
    },
    "lifeStage": {
      "stages": "Stades de vie",
      "puppy": "Chiot",
      "adult": "Adulte",
      "senior": "Senior",
      "description": "Votre chien est au stade : {stage}",
      "healthPriorities": "Priorités de santé pour ce stade :",
      "vetVisit": "Visites vétérinaires annuelles",
      "dental": "Nettoyage dentaire régulier",
      "parasite": "Prévention mensuelle des parasites",
      "weight": "Maintenir un poids sain",
      "vaccination": "Vaccins à jour",
      "signs": "Signes de vieillissement :",
      "decreasedMobility": "Mobilité réduite",
      "weightChange": "Changements de poids",
      "dentalIssues": "Problèmes dentaires"
    },
    "shareCta": {
      "title": "Partagez votre résultat",
      "copyLink": "Copier le lien",
      "facebook": "Partager sur Facebook",
      "twitter": "Partager sur Twitter"
    }
  },
  "dogCalorie": {
    "title": "Calculateur de calories pour chiens",
    "subtitle": "Calculez les besoins caloriques quotidiens de votre chien",
    "form": {
      "weight": "Poids",
      "neutered": "Stérilisé",
      "activity": "Niveau d'activité",
      "puppyAge": "Âge du chiot",
      "puppy0to4": "0-4 mois",
      "puppy4to12": "4-12 mois",
      "puppy12plus": "12+ mois"
    },
    "result": {
      "title": "Besoins caloriques quotidiens",
      "rer": "RER : {kcal} kcal",
      "mer": "MER : {kcal} kcal/jour",
      "range": "Plage saine : {min} – {max} kcal/jour",
      "treats": "Friandises (max 10%) : {kcal} kcal"
    }
  },
  "puppyGrowth": {
    "title": "Prédicteur de croissance du chiot",
    "subtitle": "Prédisez la taille adulte de votre chiot",
    "form": {
      "currentWeight": "Poids actuel",
      "currentAge": "Âge actuel (semaines)",
      "breedSize": "Taille de la race"
    },
    "result": {
      "title": "Résultat de prédiction",
      "predictedRange": "{min} – {max} kg",
      "predictedWeight": "Poids adulte prédit : {weight}",
      "chartTitle": "Courbe de croissance"
    }
  },
  "dogGestation": {
    "title": "Calculateur de gestation pour chiens",
    "subtitle": "Calculez la date prévue de mise bas",
    "form": {
      "matingDate": "Date d'accouplement",
      "birthDate": "Date estimée"
    },
    "result": {
      "title": "Résultat de gestation",
      "dueDate": "Date prévue : {date}",
      "daysRemaining": "Jours restants : {days}",
      "milestoneTitle": "Jalons de gestation"
    }
  },
  "dogVaccination": {
    "title": "Calendrier vaccinal pour chiens",
    "subtitle": "Planifiez les vaccins de votre chien",
    "form": {
      "birthDate": "Date de naissance",
      "region": "Région"
    },
    "result": {
      "title": "Calendrier recommandé",
      "tableDate": "Date",
      "tableVaccine": "Vaccin",
      "tableStatus": "Statut",
      "due": "À faire",
      "overdue": "En retard",
      "upToDate": "À jour",
      "completed": "Complété"
    }
  },
  "catAge": {
    "title": "Calculateur d'âge pour chats",
    "subtitle": "Convertissez l'âge de votre chat en années humaines",
    "form": {
      "inputType": "Type de saisie",
      "dateMode": "Date de naissance",
      "ageMode": "Âge actuel",
      "birthDate": "Date de naissance",
      "currentAge": "Âge actuel"
    },
    "result": {
      "title": "Résultat",
      "humanAge": "~{age} années humaines",
      "catAge": "{age} années-chat",
      "lifeStage": "Stade de vie : {stage}",
      "equivalent": "Équivalent humain : {years} ans"
    },
    "lifeStage": {
      "stages": "Stades de vie",
      "kitten": "Chaton",
      "adult": "Adulte",
      "senior": "Senior",
      "description": "Votre chat est au stade : {stage}",
      "healthPriorities": "Priorités de santé pour ce stade :"
    },
    "shareCta": {
      "title": "Partagez votre résultat",
      "copyLink": "Copier le lien",
      "facebook": "Partager sur Facebook",
      "twitter": "Partager sur Twitter"
    }
  },
  "catBcs": {
    "title": "Calculateur BCS & Suivi du poids",
    "subtitle": "Évaluez l'état corporel de votre chat",
    "form": {
      "weight": "Poids",
      "bcs": "Score BCS",
      "bcs1": "1 - Maigre",
      "bcs2": "2 - Très maigre",
      "bcs3": "3 - Maigre",
      "bcs4": "4 - Sous-poids",
      "bcs5": "5 - Idéal",
      "bcs6": "6 - Surpoids",
      "bcs7": "7 - En surpoids",
      "bcs8": "8 - Obèse",
      "bcs9": "9 - Sévèrement obèse"
    },
    "result": {
      "title": "Évaluation BCS",
      "bcsScore": "BCS {score}/9",
      "assessment": "Évaluation : {status}",
      "idealWeight": "Poids idéal estimé",
      "weightToPerdre": "Perte recommandée",
      "weightToAjuster": "Ajustement recommandé",
      "healthyRange": "Plage saine",
      "healthy": "Poids sain",
      "overweight": "Surpoids",
      "underweight": "Sous-poids"
    },
    "bcsOptions": {
      "1": "Côtes, hanches et colonne vertébrale très visibles",
      "2": "Côtes palpables avec peu de graisse",
      "3": "Côtes facilement palpables",
      "4": "Côtes palpables avec légère couverture",
      "5": "Côtes palpables sous fine couche de graisse",
      "6": "Côtes difficiles à palper",
      "7": "Côtes très difficiles à palper",
      "8": "Impossible de sentir les côtes",
      "9": "Abdomen très distendu"
    }
  },
  "catHydration": {
    "title": "Calculateur d'hydratation pour chats",
    "subtitle": "Calculez les besoins en eau de votre chat",
    "form": {
      "weight": "Poids",
      "foodType": "Type d'alimentation",
      "wetFood": "Nourriture humide",
      "dryFood": "Nourriture sèche",
      "both": "Les deux"
    },
    "result": {
      "title": "Besoins en eau",
      "dailyNeed": "Besoin quotidien : {amount}",
      "fromFood": "De la nourriture : {amount}",
      "toDrink": "Eau à boire : {amount}",
      "wetFoodInfo": "La nourriture humide contient ~80% d'eau",
      "dryFoodInfo": "La nourriture sèche contient ~10% d'eau"
    }
  },
  "catGestation": {
    "title": "Calculateur de gestation pour chats",
    "subtitle": "Calculez la date prévue de mise bas",
    "form": {
      "matingDate": "Date d'accouplement",
      "birthDate": "Date estimée"
    },
    "result": {
      "title": "Résultat de gestation",
      "dueDate": "Date prévue : {date}",
      "daysRemaining": "Jours restants : {days}",
      "milestoneTitle": "Jalons de gestation"
    }
  },
  "catVaccination": {
    "title": "Calendrier vaccinal pour chats",
    "subtitle": "Planifiez les vaccins de votre chat",
    "form": {
      "birthDate": "Date de naissance",
      "region": "Région",
      "indoor": "Chat d'intérieur",
      "outdoor": "Chat d'extérieur"
    },
    "result": {
      "title": "Calendrier recommandé",
      "tableDate": "Date",
      "tableVaccine": "Vaccin",
      "tableStatus": "Statut"
    }
  },
  "gestation": {
    "title": "Calculateur de gestation",
    "subtitle": "Calculez la date prévue de mise bas",
    "form": {
      "species": "Espèce",
      "dog": "Chien",
      "cat": "Chat",
      "matingDate": "Date d'accouplement",
      "multiDateHint": "Si plusieurs accouplements, nous calculons une plage."
    },
    "result": {
      "title": "Résultat de gestation",
      "dueDate": "Date prévue : {date}",
      "basedOn": "Basé sur : {species} gestation moyenne de {days} jours",
      "milestoneTitle": "Jalons de gestation",
      "milestoneDay25": "Jour 25 — Fenêtre échographique",
      "milestoneDay25Desc": "Le vétérinaire peut confirmer la grossesse par échographie.",
      "milestoneDay45": "Jour 45 — Radiographie : squelettes visibles",
      "milestoneDay45Desc": "Les squelettes fœtaux sont visibles aux rayons X.",
      "milestoneDay58": "Jour 58 — Début possible du travail",
      "milestoneDay58Desc": "Commencez la surveillance quotidienne de la température.",
      "milestoneDay60": "Jour 60 — Comportement de nidification",
      "milestoneDay60Desc": "Le comportement de nidification s'intensifie.",
      "milestoneDay65": "Jour 65 — Fin de terme ; contactez le vétérinaire",
      "milestoneDay65Desc": "Si aucun signe de travail, consultez votre vétérinaire.",
      "milestoneDay68": "Jour 68 — Limite maximale ; contactez le vétérinaire",
      "milestoneDay68Desc": "Limite de sécurité. Contactez immédiatement votre vétérinaire."
    }
  },
  "vaccination": {
    "title": "Calendrier vaccinal",
    "subtitle": "Planifiez les vaccins de votre animal",
    "form": {
      "birthDate": "Date de naissance",
      "status": "Statut",
      "region": "Région",
      "speciesToggle": "Espèce"
    },
    "result": {
      "title": "Calendrier recommandé",
      "tableDate": "Date",
      "tableVaccine": "Vaccin",
      "tableStatus": "Statut",
      "due": "À faire",
      "overdue": "En retard",
      "completed": "Complété",
      "upToDate": "À jour"
    }
  },
  "toxicChecker": {
    "title": "Vérificateur d'aliments et plantes toxiques",
    "subtitle": "Vérifiez si un aliment ou une plante est sûr pour votre animal",
    "form": {
      "search": "Rechercher",
      "species": "Espèce"
    },
    "result": {
      "title": "Résultat de recherche",
      "source": "Source"
    }
  },
  "toxicLanding": {
    "title": "Guide d'urgence toxicité",
    "aspcaPhone": "Centre antipoison ASPCA",
    "aspcaNumber": "(888) 426-4435",
    "petPoisonNumber": "(855) 764-7661"
  },
  "euTravel": {
    "title": "Vérificateur de voyage UE pour animaux",
    "subtitle": "Vérifiez les exigences de voyage",
    "form": {
      "destinationLabel": "Destination",
      "destinationPlaceholder": "Sélectionner un pays",
      "microchip": "Puce électronique",
      "vaccine": "Vaccin antirabique",
      "tapeworm": "Traitement ténia",
      "travelDate": "Date de voyage",
      "petType": "Type d'animal"
    },
    "result": {
      "title": "Résultat",
      "eligible": "Éligible pour voyager",
      "notEligible": "Non éligible",
      "requirements": "Exigences",
      "documents": "Documents requis",
      "microchip": "Puce électronique (ISO 11784/11785)",
      "vaccination": "Vaccination antirabique",
      "tapeworm": "Traitement ténia",
      "max-pets-limit": "Dans la limite de 5 animaux (non commercial)",
      "min-age-rabies": "Âge minimum atteint (12+ semaines)",
      "nordic-immunity-zone": "Zone nordique immunité",
      "teip-entry-point": "Point d'entrée désigné (TEP)"
    }
  },
  "insurance": {
    "title": "Estimateur d'assurance animaux",
    "subtitle": "Comparez les primes mensuelles",
    "form": {
      "species": "Espèce",
      "breed": "Race",
      "age": "Âge",
      "region": "Région",
      "coverage": "Couverture"
    },
    "result": {
      "title": "Estimation",
      "monthlyPremium": "Prime mensuelle estimée : {amount}",
      "annualPremium": "Prime annuelle estimée : {amount}",
      "coverage": "Couverture"
    }
  },
  "barf": {
    "title": "Calculateur d'alimentation BARF",
    "subtitle": "Calculez les portions quotidiennes d'alimentation crue",
    "form": {
      "weight": "Poids",
      "activity": "Niveau d'activité",
      "species": "Espèce"
    },
    "result": {
      "title": "Résultat BARF",
      "daily": "Portion quotidienne : {amount}",
      "muscle": "Viande musculaire",
      "bone": "Os",
      "liver": "Foie",
      "organs": "Organes",
      "vegetables": "Légumes",
      "other": "Autre"
    }
  },
  "seo": {
    "title": "Outils de santé pour chiens et chats | petsMetrics",
    "description": "Calculateurs de santé pour animaux, calendriers vaccinal, vérificateur de toxicité et plus. 100% gratuit, sans connexion requise.",
    "toolsTitle": "Outils gratuits"
  },
  "compare": {
    "title": "Comparaison",
    "description": "Comparez deux options côte à côte",
    "topicAName": "Option A",
    "topicBName": "Option B",
    "verdict": "Verdict",
    "summary": "Résumé",
    "pros": "Avantages",
    "cons": "Inconvénients",
    "cost": "Coût",
    "bestFor": "Meilleur pour",
    "faqTitle": "FAQ",
    "relatedTools": "Outils connexes"
  },
  "emergency": {
    "shared": {
      "severity": {
        "monitor": {"label": "Surveiller"},
        "mildlyToxic": {"label": "Légèrement toxique"},
        "dangerous": {"label": "Dangereux"},
        "toxic": {"label": "Toxique"},
        "extremelyToxic": {"label": "Extrêmement toxique"}
      },
      "riskLevel": {
        "high": "Élevé",
        "critical": "CRITIQUE",
        "moderate": "Modéré",
        "low": "Faible"
      },
      "action": {
        "seekEmergency": "🚨 Vétérinaire d'urgence MAINTENANT",
        "callNow": "🚨 Vétérinaire d'urgence MAINTENANT",
        "callImmediately": "📞 Appelez le vétérinaire immédiatement",
        "callToday": "📞 Appelez le vétérinaire aujourd'hui",
        "monitorSymptoms": "👀 Surveillez les symptômes",
        "callVet": "📞 Appelez le vétérinaire immédiatement"
      },
      "labels": {
        "petWeightDog": "Poids du chien",
        "petWeightCat": "Poids du chat",
        "amountEaten": "Quantité ingérée",
        "riskLevel": "Niveau de risque",
        "actionRequired": "Action requise",
        "chocolateType": "Type de chocolat",
        "whatWasEaten": "Ce qui a été mangé",
        "catSize": "Taille du chat",
        "dogSize": "Taille du chien",
        "anySize": "Toute taille",
        "anyAmount": "Toute quantité"
      },
      "vetDecision": {
        "title": "Quand consulter un vétérinaire",
        "emergencyTitle": "🚨 Urgence — Allez MAINTENANT",
        "urgentTitle": "⚡ Urgent — Dans 1-2 heures",
        "monitorTitle": "👀 Surveiller — Appelez aujourd'hui"
      },
      "titles": {
        "riskAssessment": "Évaluez le risque pour votre animal",
        "whatToDo": "Ce qu'il faut faire maintenant",
        "theScience": "La science derrière",
        "toxicDose": "Calculatrice de dose toxique",
        "symptomTimeline": "Chronologie des symptômes",
        "faq": "Questions fréquemment posées",
        "relatedTools": "Outils connexes"
      },
      "aspcaHotline": "Centre antipoison ASPCA : (888) 426-4435",
      "aspcaLink": "https://www.aspca.org/pet-care/animal-poison-control",
      "stepTemplates": {
        "removeAll": "Étape 1 : Retirez tout [Item] immédiatement",
        "removeItem": "Étape 1 : Retirez tout [item] de la portée de votre animal.",
        "determineAmount": "Étape 2 : Estimez la quantité consommée.",
        "doNotInduce": "Étape : Ne PAS provoquer le vomissement.",
        "contactPoison": "Étape : Contactez le centre antipoison.",
        "callVetUrgent": "Étape 2 : Appelez le vétérinaire"
      },
      "tools": {
        "toxicChecker": "Vérificateur de toxicité",
        "dogCalorie": "Calculateur de calories",
        "catBcs": "Calculateur BCS",
        "dogAge": "Calculateur d'âge",
        "catAge": "Calculateur d'âge chat"
      },
      "breadcrumb": {
        "home": "Accueil",
        "dogEmergency": "Urgence chien",
        "catEmergency": "Urgence chat"
      }
    }
  }
};

// Apply translations
deepMerge(fr, frTranslations);

// Write back
fs.writeFileSync(path.join(msgDir, 'fr.json'), JSON.stringify(fr, null, 2), 'utf8');
console.log('French translations applied successfully!');
