#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Configuration Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-06',
  useCdn: false, // Utiliser l'API en temps réel pour avoir les données les plus récentes
});

async function countEmails() {
  try {
    console.log('🔍 Recherche des emails dans la waitlist...');
    console.log('📋 Configuration Sanity:');
    console.log(`   - Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`   - Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    console.log(`   - API Version: ${process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-06'}`);
    
    // Test de connexion avec une requête simple
    console.log('\n🔗 Test de connexion...');
    const testQuery = `*[_type == "waitlistEntry"][0]`;
    const testResult = await client.fetch(testQuery);
    console.log('✅ Connexion réussie');
    
    // Requête pour compter tous les documents waitlistEntry
    const query = `count(*[_type == "waitlistEntry"])`;
    const count = await client.fetch(query);
    
    console.log(`\n📧 Nombre total d'emails dans la waitlist: ${count}`);
    
    // Requête pour obtenir tous les documents (pour debug)
    const allQuery = `*[_type == "waitlistEntry"]`;
    const allEntries = await client.fetch(allQuery);
    console.log(`🔍 Nombre d'entrées trouvées avec requête complète: ${allEntries.length}`);
    
    // Optionnel: obtenir quelques détails supplémentaires
    const detailsQuery = `*[_type == "waitlistEntry"] | order(_createdAt desc) [0...5] {
      _id,
      email,
      createdAt,
      source,
      _createdAt
    }`;
    const recentEntries = await client.fetch(detailsQuery);
    
    if (recentEntries.length > 0) {
      console.log('\n📋 Dernières entrées:');
      recentEntries.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry.email} (ID: ${entry._id})`);
        console.log(`   Créé: ${entry.createdAt || entry._createdAt ? new Date(entry.createdAt || entry._createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'}`);
        console.log(`   Source: ${entry.source || 'Non spécifié'}`);
      });
    } else {
      console.log('\n⚠️  Aucune entrée trouvée dans la waitlist');
      
      // Vérifier s'il y a d'autres types de documents
      const allTypesQuery = `*[] | order(_type) | {_type}`;
      const allTypes = await client.fetch(allTypesQuery);
      console.log('\n🔍 Types de documents disponibles dans le dataset:');
      const uniqueTypes = [...new Set(allTypes.map(item => item._type))];
      uniqueTypes.forEach(type => {
        console.log(`   - ${type}`);
      });
      
      // Vérifier le nombre total de documents
      const totalDocsQuery = `count(*)`;
      const totalDocs = await client.fetch(totalDocsQuery);
      console.log(`\n📊 Nombre total de documents dans le dataset: ${totalDocs}`);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des données:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Exécuter le script
countEmails();
