import { NextRequest, NextResponse } from 'next/server';
import { createContactEntry } from '@/lib/sanity';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, prenom, specialite, mail, message } = body;

    // Log pour débogage
    console.log('[contact] Received data:', { nom, prenom, specialite, mail, message });

    // Validation
    if (!nom || !nom.trim()) {
      return NextResponse.json({ error: 'Le nom est requis' }, { status: 400 });
    }
    
    if (!prenom || !prenom.trim()) {
      return NextResponse.json({ error: 'Le prénom est requis' }, { status: 400 });
    }
    
    if (!mail || !mail.trim()) {
      return NextResponse.json({ error: 'L\'email est requis' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail.trim().toLowerCase())) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    await createContactEntry({
      nom: nom.trim(),
      prenom: prenom.trim(),
      specialite: specialite?.trim() || undefined,
      mail: mail.trim().toLowerCase(),
      message: message?.trim() || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('[contact] error', e);
    
    // Gestion spécifique des erreurs de permissions Sanity
    if (e?.statusCode === 403 || e?.responseBody?.includes('Insufficient permissions')) {
      return NextResponse.json({ 
        error: 'Erreur de permissions Sanity. Vérifiez que SANITY_API_TOKEN a les permissions d\'écriture.' 
      }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

