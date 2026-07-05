/**
 * Tests des commandes
 */

const assert = require('assert');
const CommandHandler = require('../commands/handler');

describe('Commandes', () => {
  let handler;

  before(() => {
    handler = new CommandHandler();
  });

  it('devrait charger les commandes', () => {
    assert(handler.commands.size > 0);
  });

  it('devrait exécuter la commande ping', async () => {
    const result = await handler.execute('ping', [], {});
    assert.strictEqual(result.success, true);
    assert(result.message.includes('Pong'));
  });

  it('devrait exécuter la commande help', async () => {
    const result = await handler.execute('help', [], {});
    assert.strictEqual(result.success, true);
  });

  it('devrait retourner une erreur pour une commande inconnue', async () => {
    const result = await handler.execute('inconnue', [], {});
    assert.strictEqual(result.success, false);
  });

  it('devrait supporter les alias', async () => {
    const result = await handler.execute('p', [], {});
    assert.strictEqual(result.success, true);
  });
});

console.log('✅ Tests de commandes complétés');
