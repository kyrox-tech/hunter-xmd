/**
 * Tests de sécurité
 */

const assert = require('assert');
const { sanitizeInput, hashString, validateApiKey } = require('../utils/security');
const config = require('../config');

describe('Sécurité', () => {
  describe('sanitizeInput', () => {
    it('devrait supprimer les caractères XSS', () => {
      const input = '<script>alert("XSS")</script>';
      const result = sanitizeInput(input);
      assert(!result.includes('<'));
      assert(!result.includes('>');
    });

    it('devrait limiter la taille', () => {
      const input = 'a'.repeat(1000);
      const result = sanitizeInput(input);
      assert(result.length <= 500);
    });

    it('devrait trimmer les espaces', () => {
      const input = '  test  ';
      const result = sanitizeInput(input);
      assert.strictEqual(result, 'test');
    });
  });

  describe('hashString', () => {
    it('devrait générer un hash', () => {
      const input = 'test';
      const result = hashString(input);
      assert(result.length > 0);
    });

    it('devrait générer le même hash pour la même entrée', () => {
      const input = 'test';
      const hash1 = hashString(input);
      const hash2 = hashString(input);
      assert.strictEqual(hash1, hash2);
    });

    it('devrait générer des hashes différents pour des entrées différentes', () => {
      const hash1 = hashString('test1');
      const hash2 = hashString('test2');
      assert.notStrictEqual(hash1, hash2);
    });
  });

  describe('validateApiKey', () => {
    it('devrait valider la clé API correcte', () => {
      const result = validateApiKey(config.API_KEY);
      assert.strictEqual(result, true);
    });

    it('devrait rejeter la clé API incorrecte', () => {
      const result = validateApiKey('invalid-key');
      assert.strictEqual(result, false);
    });
  });
});

console.log('✅ Tests de sécurité complétés');
