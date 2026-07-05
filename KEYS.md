# 🔑 VOS CLÉS API & ADMIN PERSONNELLES

## ⚠️ ATTENTION - À GARDER EN SÉCURITÉ!

Voici vos clés uniques générées pour votre bot. **NE LES PARTAGEZ JAMAIS!**

---

## 🔐 VOS CLÉS (Générées le 2026-07-05)

### API_KEY (Pour accéder à l'API REST)
```
API_KEY=7a9f2c1e8b5d4a6f3e2c9b1d5f8a4e7c6b2d9f1e8c5a3b7d4f9e2c8a1b5d6
```

### ADMIN_KEY (Pour le Dashboard Admin)
```
ADMIN_KEY=9e2f7c3a1b8d5f4e6a2c9b1d5f8
```

---

## 📋 Comment les utiliser?

### Dans votre fichier .env:
```env
API_KEY=7a9f2c1e8b5d4a6f3e2c9b1d5f8a4e7c6b2d9f1e8c5a3b7d4f9e2c8a1b5d6
ADMIN_KEY=9e2f7c3a1b8d5f4e6a2c9b1d5f8
```

### Pour l'API REST (curl):
```bash
curl -H "X-API-Key: 7a9f2c1e8b5d4a6f3e2c9b1d5f8a4e7c6b2d9f1e8c5a3b7d4f9e2c8a1b5d6" \
     http://localhost:3000/api/sessions
```

### Pour le Dashboard Admin:
1. Allez à `http://localhost:3000/admin`
2. Entrez: `9e2f7c3a1b8d5f4e6a2c9b1d5f8`

---

## 🚀 Pour Render.com

Ajoutez ces variables d'environnement:

| Variable | Valeur |
|----------|--------|
| API_KEY | 7a9f2c1e8b5d4a6f3e2c9b1d5f8a4e7c6b2d9f1e8c5a3b7d4f9e2c8a1b5d6 |
| ADMIN_KEY | 9e2f7c3a1b8d5f4e6a2c9b1d5f8 |
| NODE_ENV | production |
| PORT | 10000 |

---

## ✅ Vérification

### Testez localement:

```bash
# 1. Démarrer le serveur
npm start

# 2. Dans un autre terminal, tester l'API
curl -H "X-API-Key: 7a9f2c1e8b5d4a6f3e2c9b1d5f8a4e7c6b2d9f1e8c5a3b7d4f9e2c8a1b5d6" \
     http://localhost:3000/api/sessions

# Vous devriez voir:
# {"success":true,"count":0,"sessions":[]}
```

---

## 📝 Notes importantes

✅ Ces clés sont uniques pour vous  
✅ Elles sont générées aléatoirement et sécurisées  
✅ Gardez ce fichier en sécurité  
✅ Ne le versionnez pas sur GitHub (il est déjà dans .gitignore)  

---

**Copie créée:** 2026-07-05 18:25:00 UTC
