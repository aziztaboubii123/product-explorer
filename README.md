# 🛍️ Product Explorer

Une application web qui consomme l'API publique [DummyJSON](https://dummyjson.com/) en direct, avec recherche, filtre par catégorie, et gestion propre des états de chargement et d'erreur.

🔗 **Démo live :** https://product-explorer.vercel.app *(à remplacer après déploiement)*

---

## ✨ Fonctionnalités

- 📡 Consommation d'API en direct (DummyJSON)
- 🔎 Recherche par nom de produit en temps réel
- 🏷️ Filtre par catégorie
- ⏳ État de chargement avec skeletons animés
- ⚠️ État d'erreur avec bouton "Réessayer"
- 🙅 État "aucun résultat" quand la recherche ne retourne rien
- 📱 Entièrement responsive (mobile → tablette → desktop)

## 🛠️ Stack technique

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

## 📁 Structure du projet
product-explorer/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── components/
│ ├── ProductCard.tsx
│ ├── SearchBar.tsx
│ ├── CategoryFilter.tsx
│ └── StatusState.tsx
├── hooks/
│ └── useProducts.ts
└── lib/
└── types.ts

## 🚀 Lancer en local

```bash
git clone https://github.com/<votre-user>/product-explorer.git
cd product-explorer
npm install
npm run dev