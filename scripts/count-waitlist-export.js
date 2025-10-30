const fs = require('fs');
const path = require('path');

// Lire le fichier d'export
const exportPath = path.join(__dirname, '..', 'waitlist-export.json');
const data = JSON.parse(fs.readFileSync(exportPath, 'utf-8'));

// Compter les entrées
const count = data.result.length;

console.log('📊 ANALYSE DU FICHIER WAITLIST-EXPORT.JSON\n');
console.log(`📧 Nombre total d'emails dans la waitlist: ${count}`);

// Analyser les sources
const sources = {};
data.result.forEach(entry => {
  const source = entry.source || 'non spécifié';
  sources[source] = (sources[source] || 0) + 1;
});

console.log('\n📋 Répartition par source:');
Object.entries(sources).forEach(([source, count]) => {
  console.log(`   - ${source}: ${count}`);
});

// Analyser les dates
const dates = {};
data.result.forEach(entry => {
  const date = new Date(entry._createdAt).toLocaleDateString('fr-FR');
  dates[date] = (dates[date] || 0) + 1;
});

console.log('\n📅 Inscriptions par jour (top 10):');
const sortedDates = Object.entries(dates)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

sortedDates.forEach(([date, count]) => {
  console.log(`   - ${date}: ${count} inscription(s)`);
});

// Premier et dernier
if (data.result.length > 0) {
  const first = data.result[data.result.length - 1];
  const last = data.result[0];
  
  console.log('\n⏰ Première inscription:');
  console.log(`   - Email: ${first.email}`);
  console.log(`   - Date: ${new Date(first._createdAt).toLocaleString('fr-FR')}`);
  
  console.log('\n⏰ Dernière inscription:');
  console.log(`   - Email: ${last.email}`);
  console.log(`   - Date: ${new Date(last._createdAt).toLocaleString('fr-FR')}`);
}

// Vérifier les doublons
const emails = data.result.map(e => e.email.toLowerCase());
const uniqueEmails = new Set(emails);
const duplicates = emails.length - uniqueEmails.size;

console.log(`\n🔍 Analyse des doublons:`);
console.log(`   - Emails uniques: ${uniqueEmails.size}`);
console.log(`   - Doublons: ${duplicates}`);



