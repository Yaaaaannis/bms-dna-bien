const fs = require('fs');
const path = require('path');

// Lire le fichier
const filePath = path.join(__dirname, '..', 'emails-only.txt');
const content = fs.readFileSync(filePath, 'utf-8');

// Diviser par lignes et filtrer les lignes vides
const lines = content.split('\n').filter(line => line.trim() !== '');

// Catégories et mots-clés associés
const categories = {
  'Vidéo/Réalisation': [
    'vidéo', 'réalisation', 'montage vidéo', 'vidéaste', 'audiovisuel', 
    'cinéma', 'davinci', 'premiere', 'monteur', 'truquiste', 'live', 
    'direction artistique', 'mise en scène', 'fiction', 'pub'
  ],
  'Photographie': [
    'photo', 'photographie', 'lightroom', 'direction de la photographie', 'étalonnage'
  ],
  'Graphisme/Design': [
    'graphisme', 'graphiste', 'design', 'logo', 'branding', 'typographie', 
    'typo', 'affiche', 'poster', 'minia', 'miniature', 'photoshop', 
    'retouche', 'identité visuel', 'collage', 'mixed media', 'photomontage'
  ],
  'UI/UX/Web Design': [
    'ui', 'ux', 'webdesign', 'web design', 'app design'
  ],
  'Développement Web/Mobile': [
    'développement web', 'développement mobile', 'développement informatique', 
    'programmation', 'code', 'dev web', 'dev mobile'
  ],
  'Développement Jeux Vidéo': [
    'jeux vidéo', 'c++'
  ],
  'Musique/Production': [
    'musique', 'prod', 'beatmaker', 'inge son', 'rap', 'rappeur', 
    'dj', 'mixage', 'son', 'sound design', 'reaper'
  ],
  'Écriture/Rédaction': [
    'écriture', 'rédaction', 'scénario', 'article', 'docu', 
    'nouvelles', 'fiction audio', 'scénarisation'
  ],
  'Community Management/Communication': [
    'community', 'communication', 'création de contenu', 'réseaux sociaux', 
    'contenu'
  ],
  'Motion Design': [
    'motion design', 'motion', '2d', '3d'
  ],
  '3D/Modélisation': [
    '3d', 'modélisation'
  ],
  'Dessin/Illustration': [
    'dessin', 'illustration', 'art'
  ],
  'Streaming/Animation': [
    'stream', 'cast', 'caster', 'host', 'animation', 'divertissement'
  ],
  'IA/Data Science': [
    'ia', 'deep learning', 'data', 'google sheets'
  ],
  'Doublage': [
    'doublage'
  ],
  'Organisation/Événementiel': [
    'organisation', 'event', 'lan'
  ],
  'Langues/Social': [
    'langues', 'accroche sociale', 'organisé'
  ],
  'Reportage/Journalisme': [
    'reportage', 'journalistique'
  ]
};

// Compter les mentions par catégorie
const categoryCounts = {};
const entryCategories = [];

// Initialiser les compteurs
Object.keys(categories).forEach(cat => {
  categoryCounts[cat] = 0;
});

// Analyser chaque ligne
lines.forEach((line, index) => {
  const lineNum = index + 1;
  const lineLower = line.toLowerCase();
  const matchedCategories = new Set();
  
  // Chercher les mots-clés dans chaque catégorie
  Object.entries(categories).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (lineLower.includes(keyword.toLowerCase())) {
        matchedCategories.add(category);
      }
    });
  });
  
  // Compter les mentions
  matchedCategories.forEach(cat => {
    categoryCounts[cat]++;
  });
  
  if (matchedCategories.size > 0) {
    entryCategories.push({
      line: lineNum,
      text: line.substring(0, 100) + (line.length > 100 ? '...' : ''),
      categories: Array.from(matchedCategories)
    });
  }
});

// Trier par nombre de mentions (décroissant)
const sortedCategories = Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .filter(([_, count]) => count > 0);

// Afficher les résultats
console.log('\n=== ANALYSE DES COMPÉTENCES CRÉATIVES ===\n');
console.log(`Nombre total de réponses analysées: ${lines.length}\n`);

console.log('=== CATÉGORIES PAR NOMBRE DE MENTIONS ===\n');
sortedCategories.forEach(([category, count]) => {
  console.log(`${category}: ${count} mentions`);
});

console.log(`\n=== STATISTIQUES ===\n`);
console.log(`Total de catégories identifiées: ${sortedCategories.length}`);
console.log(`Total de mentions: ${Object.values(categoryCounts).reduce((a, b) => a + b, 0)}`);

// Créer un fichier de sortie avec les détails
const outputPath = path.join(__dirname, '..', 'skills-analysis.txt');
let output = '=== ANALYSE DÉTAILLÉE DES COMPÉTENCES CRÉATIVES ===\n\n';
output += `Nombre total de réponses analysées: ${lines.length}\n\n`;
output += '=== CATÉGORIES PAR NOMBRE DE MENTIONS ===\n\n';

sortedCategories.forEach(([category, count]) => {
  output += `${category}: ${count} mentions\n`;
});

output += `\n=== TOTAL ===\n`;
output += `Catégories identifiées: ${sortedCategories.length}\n`;
output += `Total de mentions: ${Object.values(categoryCounts).reduce((a, b) => a + b, 0)}\n`;

output += '\n\n=== DÉTAIL PAR RÉPONSE ===\n\n';
entryCategories.forEach(entry => {
  output += `Ligne ${entry.line}:\n`;
  output += `  Texte: ${entry.text}\n`;
  output += `  Catégories: ${entry.categories.join(', ')}\n\n`;
});

fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`\nAnalyse détaillée sauvegardée dans: skills-analysis.txt`);




