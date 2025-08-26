# HUNTER XMD

HUNTER XMD-Session-Generator

![Image Hisoka](https://files.catbox.moe/jtc93v.jpg)

---

## 💡 Fork This Project

[![Fork Repo](https://img.shields.io/badge/FORK-REPO-black?style=for-the-badge&logo=github)](https://github.com/djexo-tech/hunter-xmd/fork)

Generate session IDs for WhatsApp bots using [`@whiskeysockets/baileys`](https://github.com/whiskeysockets/baileys), with secure **MEGA** cloud storage and a fast web QR login.

> ⚠️ This is the **same code** used on my live site:  


[![HUNTER XMD SESSION](https://img.shields.io/badge/HUNTER_XMD_SESSION-5865F2?style=for-the-badge)](https://hunter-xmd-5hki.onrender.com/)

 
> 💬 Don't ask for more — just **fork**, **star**, **edit** ,and **deploy**!

---
# Deploy on github⤵️


Crée un fichier *`.github/workflows/deploy.yml`* et colle ceci :


name: Deploy WhatsApp Bot

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Start Bot
        env:
          SESSION_ID: secrets.SESSION_ID 
        run: |
          echo "SESSION_ID" > session.json
          node index.js
          



Ce workflow lit la session depuis le secret, la place dans `session.json`, puis lance ton bot avec `node index.js`. Ajuste si ton fichier principal a un autre nom.

## 🧩 Features

- 🔐 Generates sessions for **any Baileys bot**
- ☁️ Stores sessions securely with **MEGA**
- 📱 Web-based **QR Pairing & Pair Pairing**
- 🚀 One-click deploy to:
  - Heroku
  - Render
  - Koyeb
  - Self-hosting platforms

---

## 📦 Deploy Now

| Platform | Deploy |
|---------|--------|
| 🟣 Heroku | [![Deploy to Heroku](https://img.shields.io/badge/DEPLOY-HEROKU-purple?style=for-the-badge&logo=heroku)](https://dashboard.heroku.com/new?template=https://github.com/djexo-tech/hunter-xmd) |
| 🔵 Render | [![Deploy to Render](https://img.shields.io/badge/DEPLOY-RENDER-blue?style=for-the-badge&logo=render)](https://dashboard.render.com/) |
| ⚫ Koyeb | [![Deploy to Koyeb](https://img.shields.io/badge/DEPLOY-KOYEB-black?style=for-the-badge&logo=koyeb)](https://app.koyeb.com/) |

---

## 🧪 Example Output

[![👉 Try it here:](https://img.shields.io/badge/click-here-black?style=for-the-badge&logo=git)](https://hunter-xmd-5hki.onrender.com/)


---

## 👑 Owner

<p align="center">
  <a href="https://github.com/djexo-tech">
    <img src="https://github.com/djexo-tech.png" width="200" height="200" alt="Hisoka"/>
  </a>
</p>

📬 [`Contact on WhatsApp`](https://wa.me/50935420142)

---


